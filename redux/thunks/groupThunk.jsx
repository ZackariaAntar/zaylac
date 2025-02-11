import { supabase } from "../../utils/supabase/supabaseClient.jsx";
import { setGroupData, clearGroupData } from "../slices/groupSlice.jsx";
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
		console.log("NAME", name);

		// check for existing groups created by user, to make sure no duplicate named groups for user.
		const proceed = await dispatch(findExistingGroup(user_table_id, name))
		console.log("PROCEED", proceed);

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

		// dispatch(addUserToGroup(user_table_id, newGroup.data.id));

		// let notYetMembers
		// for(let member of members){
		//   for(let user of checkForAccount.data){
		// 	if(member.phone !== user.phone_number ){
		// 	  notYetMembers.push(member)
		// 	}
		//   }
		// }
		// dispatch(inviteUser(notYetMembers));
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
				let payload = { user_table_id: user, group_id: groupId };
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
