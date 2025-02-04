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

	const payload = {
		name,
		payment_day_of_week,
		payment_amount,
		cycle_frequency,
	};

	try {
		const newGroup = await supabase
			.from("kaayo_group")
			.insert(payload)
			.select()
			.single();
		if (newGroup.error) {
			console.error("SUPABASE CREATE NEW GROUP ERROR!: ", newGroup.error);
		} else {
			console.log("SUPABASE CREATE NEW GROUP SUCCESS!: ", newGroup.data);

			// const checkForAccount = await supabase.from('users').select('*').eq('phone_number').in(members)
			// ^^^ should look something like this ^^^, not totally sure what the syntax is but similar to this.

			// if a user exists in user table based on matching phone numbers submitted with the invite
			// then include them in the addUserToGroup dispatch and remove them from the inviteUsers dispatch

			// const listOfUsers = [...checkForAccount.data, user_table_id]

			// dispatch(addUserToGroup(listOfUsers, newGroup.data.id));
			dispatch(addUserToGroup(user_table_id, newGroup.data.id));
		}

		// let notYetMembers
		// for(let member of members){
		//   for(let user of checkForAccount.data){
        //     if(member.phone !== user.phone_number ){
		//       notYetMembers.push(member)
		//     }
		//   }
		// }
		// dispatch(inviteUser(notYetMembers));
	} catch (error) {
		console.log("GROUP THUNK ERROR -->createGroup(groupData): ", error);
	}
};

export const addUserToGroup = (userId, groupId) => async (dispatch) => {
	console.log(
		"IN GROUP THUNK ----> addUserToGroup(userId, groupId): ",
		userId,
		groupId
	);
	const payload = { user_table_id: userId, group_id: groupId };
	try {
        // loop over the userIds
		const addUser = await supabase
			.from("user_group_junction")
			.insert(payload)
			.select()
			.single();
		if (addUser.error) {
			console.error("SUPABASE ADD USER TO GROUP ERROR!: ", addUser.error);
		} else {
			console.log("SUPABASE ADD USER TO GROUP SUCCESS!: ", addUser.data);
			dispatch(getGroups(userId));
		}
	} catch (error) {
		console.log(
			"GROUP THUNK ERROR --> addUserToGroup(userId, groupId):",
			error
		);
	}
};
