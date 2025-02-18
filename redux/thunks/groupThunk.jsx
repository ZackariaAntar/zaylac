import { supabase } from "../../utils/supabase/supabaseClient.jsx";
import {
	setGroupData,
	setPendingData,
	clearGroupData,
} from "../slices/groupSlice.jsx";
import { inviteUser } from "./authThunk.jsx";

export const getGroups = (userId) => async (dispatch) => {
	console.log("IN GROUP THUNK ----> getGroups(userId): ", userId);
	try {
		const groups = await supabase.rpc("get_groups", { user_id: userId });
		if (groups.error) {
			console.error("SUPABASE GET GROUPS ERROR:", groups.error);
		} else {
			console.log(
				"SUPABASE GET GROUPS SUCCESS:",
				groups.status,
				groups.data
			);
			dispatch(setGroupData(groups.data));
		}
		// const {
		//     name,
		//     payment_day_of_week,
		//     start_date,
		//     payment_amount,
		//     cycle_frequency,
		//     is_active,
		//     users:[{id, username, email, phone_number,}, ]

		// } = groups.data
	} catch (error) {
		console.log("GROUP THUNK ERROR ----> getGroups(userId): ", error);
	}
};

export const createGroup = (groupData) => async (dispatch) => {
	console.log("IN GROUP THUNK ----> createGroup(groupData): ", groupData);
	const {
		user_table_id,
		name,
		payment_day_of_week,
		payment_amount,
		cycle_frequency,
		members,
	} = groupData;

	let phoneInvite = [];
	members.forEach((item) => phoneInvite.push(item.phone));
	console.log("PHONE INVITE:", phoneInvite);

	const payload = {
		name,
		payment_day_of_week,
		payment_amount,
		cycle_frequency,
	};

	try {
		let listOfUsers = [];
		let notYetMembers = [];
		let alreadyMembers = [];
		let groupId;

		// check for existing groups created by user, to make sure no duplicate named groups for user.
		const proceed = await dispatch(findExistingGroup(user_table_id, name));

		if (proceed.status === true) {
			const newGroup = await supabase
				.from("kaayo_group")
				.insert(payload)
				.select()
				.single();
			if (newGroup.error) {
				console.error(
					"SUPABASE CREATE NEW GROUP ERROR!: ",
					newGroup.error
				);
			} else {
				console.log(
					"SUPABASE CREATE NEW GROUP SUCCESS!: ",
					newGroup.data
				);
				groupId = newGroup.data.id;

				const checkForAccount = await supabase
					.from("user")
					.select("*")
					.in("phone_number", phoneInvite);
				if (checkForAccount.error) {
					console.error(
						"SUPABASE CHECK FOR ACCOUNTS BY PHONE NUMBER ERROR!:",
						checkForAccount.error
					);
				} else {
					console.log("PHONE USERS:", checkForAccount.data);
					const list = checkForAccount.data;
					alreadyMembers = checkForAccount.data;
					if (list.length) {
						list.forEach((item) => listOfUsers.push(item.id));
						listOfUsers = [user_table_id, ...listOfUsers];
					} else {
						listOfUsers = [user_table_id];
					}
				}
			}
			dispatch(
				addUserToGroup(user_table_id, listOfUsers, newGroup.data.id)
			);
		} else {
			// TODO set feedback UI to show group name already exists for user account
			throw new Error("GROUP NAME ALREADY EXISTS");
		}

		// if a user exists in user table based on matching phone numbers submitted with the invite
		// then include them in the addUserToGroup dispatch and remove them from the inviteUsers dispatch
		const userPhoneNumbers = alreadyMembers.map(
			(user) => user.phone_number
		);
		notYetMembers = [
			...userPhoneNumbers.filter((value) => !phoneInvite.includes(value)),
			...phoneInvite.filter((value) => !userPhoneNumbers.includes(value)),
		];
		console.log("NOT MEMBERS", notYetMembers);
		if (notYetMembers.length) {
			dispatch(inviteUser(notYetMembers, groupId));
		}
	} catch (error) {
		console.log("GROUP THUNK ERROR -->createGroup(groupData): ", error);
	}
};

export const addUserToGroup =
	(userId, idArray, groupId) => async (dispatch) => {
		console.log(
			"IN GROUP THUNK ----> addUserToGroup(userId,idArray, groupId): ",
			userId,
			idArray,
			groupId
		);

		try {
			for (let user of idArray) {
				let payload = { user_table_id: user, group_id: groupId};
				console.log("&& PAYLOAD:", payload);

				const addUser = await supabase
					.from("user_group_junction")
					.upsert(payload, { ignoreDuplicates: true })
					.select()
					.single();
				if (addUser.error) {
					console.error(
						"SUPABASE ADD USER TO GROUP ERROR!: ",
						addUser.error
					);
				} else {
					console.log(
						"SUPABASE ADD USER TO GROUP SUCCESS!: ",
						addUser.data
					);
				}
			}
			dispatch(getGroups(userId));
		} catch (error) {
			console.log(
				"GROUP THUNK ERROR --> addUserToGroup(userId, groupId):",
				error
			);
		}
	};

const findExistingGroup = (userId, chosen) => async (dispatch) => {
	console.log("FIND EXISTING GROUP", userId, chosen);
	let message = { status: true };

	try {
		const existingGroups = await supabase
			.from("user_group_junction")
			.select(`group:group_id(id,name)`)
			.eq("user_table_id", userId);
		if (existingGroups.error) {
			console.log(
				"SUPABASE FIND EXISTING GROUPS ERROR:",
				existingGroups.error
			);
		} else {
			console.log(
				"SUPABASE FIND EXISTING GROUPS SUCCESS!:",
				existingGroups.data
			);
			const exists = existingGroups.data;

			if (exists.length) {
				for (let entry of exists) {
					console.log(
						"EXISTING NAME:",
						entry.group.name,
						"NEW NAME:",
						chosen
					);
					if (entry.group.name === chosen) {
						message.status = false;

						// set feedback UI to show name already exists
					}
				}
			}
		}
		return message;
	} catch (error) {
		console.error("EXISTING GROUP ERROR", error);
	}
};

export const checkPendingInvites = (userId, phone) => async (dispatch) => {
	console.log("IN GROUP THUNK --> checkPendingInvites(userId)", userId);
	try {
		const checkPending = await supabase
			.from("pending_invites")
			.select("*")
			.eq("phone_number", phone)
			.eq("is_profile_created", false);
		if (checkPending.error) {
			console.error(
				"SUPABASE CHECK PENDING INVITES ERROR!:",
				checkPending.error
			);
		} else {
			console.log(
				"SUPABASE CHECK PENDING INVITES SUCCESS!:",
				checkPending.data
			);
			dispatch(setPendingData(checkPending.data));

			for (let entry of checkPending.data) {
				const addToGroups = await supabase
					.from("user_group_junction")
					.insert({
						group_id: entry.group_id,
						user_table_id: userId,
					})
					.select()
					.single();
				if (addToGroups.error) {
					console.error(
						"SUPABASE ADD TO GROUP FROM PENDING ERROR",
						addToGroups.error
					);
				} else {
					console.log(
						"SUPABASE ADD TO GROUP FROM PENDING SUCCESS",
						addToGroups.data
					);
					dispatch(cleanUpPending(phone, entry.group_id));
				}
			}
		}
	} catch (error) {
		console.error(
			"GROUP THUNK ERROR --> checkPendingInvites(userId)",
			error
		);
	}
};

const cleanUpPending = (phone, groupId) => async (dispatch) => {
	console.log("CLEAN UP PENDING TABLE (phone, groupId)", phone, groupId);

	try {
		const cleanUp = await supabase
			.from("pending_invites")
			.update({ is_profile_created: true })
			.eq("phone_number", phone)
			.eq("group_id", groupId)
			.select()
			.single();
		if (cleanUp.error) {
			console.error(
				"SUPABASE CLEAN UP PENDING INVITES ERROR",
				cleanUp.error
			);
		} else {
			console.log(
				"SUPABASE CLEAN UP PENDING INVITES SUCCESS",
				cleanUp.data
			);
		}
	} catch (error) {
		console.error("CLEAN UP PENDING TABLE ERROR", error);
	}
};
export const chooseFirst = (memberId, groupId) => async (dispatch) => {
	console.log(
		"In GROUP THUNK --> chooseFirst(memberId, groupId)",
		memberId,
		groupId
	);
	try {
		const makeIsCurrent = await supabase
			.from("user_group_junction")
			.update({ is_current: true })
			.eq("user_table_id", memberId)
			.eq("group_id", groupId)
			.select()
			.single();

		if (makeIsCurrent.error) {
			console.error(
				"SUPABASE MAKE IS CURRENT ERROR!!",
				makeIsCurrent.error
			);
		} else {
			console.log(
				"SUPABASE MAKE IS CURRENT SUCCESS!!",
				makeIsCurrent.status,
				makeIsCurrent.data
			);

			dispatch(getGroups(memberId));
		}
	} catch (error) {
		console.error(
			"GROUP THUNK ERROR --> chooseFirst(memberId, groupId)",
			error
		);
	}
};
export const chooseNext = (memberId, groupId) => async (dispatch) => {
	console.log(
		"In GROUP THUNK --> chooseNext(memberId, groupId)",
		memberId,
		groupId
	);
	try {
		const makeIsCurrent = await supabase
			.from("user_group_junction")
			.update({ is_next: true })
			.eq("user_table_id", memberId)
			.eq("group_id", groupId)
			.select()
			.single();

		if (makeIsCurrent.error) {
			console.error(
				"SUPABASE MAKE IS CURRENT ERROR!!",
				makeIsCurrent.error
			);
		} else {
			console.log(
				"SUPABASE MAKE IS CURRENT SUCCESS!!",
				makeIsCurrent.status,
				makeIsCurrent.data
			);

			dispatch(getGroups(memberId));
		}
	} catch (error) {
		console.error(
			"GROUP THUNK ERROR --> chooseNext(memberId, groupId)",
			error
		);
	}
};
