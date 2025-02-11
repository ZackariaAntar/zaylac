import { supabase } from "../../utils/supabase/supabaseClient.jsx";

import { setUserData, clearUserData } from "../slices/userSlice.jsx";
import { setAuthData, clearAuthData } from "../slices/authSlice.jsx";

export const registerUser = (payload) => async (dispatch) => {
	console.log("IN AUTH THUNK ----> registerUser(payload): ", payload);

	const { email, password } = payload;

	try {
		const register = await supabase.auth.signUp(payload);

		if (register.error) {
			console.error("SUPABASE REGISTER USER ERROR:", register.error);
		} else {
			console.log(
				"SUPABASE REGISTER USER SUCCESS: ",
				register.status,
				register.data
			);

			dispatch(setAuthData(register.data.user));
		}
	} catch (error) {
		console.error("AUTH THUNK ERROR ----> registerUser(payload):", error);
	}
};

export const signIn = (payload) => async (dispatch) => {
	console.log("IN AUTH THUNK ----> signIn(payload): ", payload);

	try {
		const login = await supabase.auth.signInWithPassword(payload);
		if (login.error) {
			console.error("SUPABASE SIGN IN ERROR:", login.error);
		} else {
			console.log(
				"SUPABASE SIGN IN USER SUCCESS: ",
				login.status,
				login.data
			);
		}
	} catch (error) {
		console.error("AUTH THUNK ERROR ----> signIn(payload):", error);
	}
};
export const logout = () => async (dispatch) => {
	console.log("IN AUTH THUNK ----> logout(): ");

	try {
		const logout = await supabase.auth.signOut();
		if (logout.error) {
			console.error("SUPABASE SIGN OUT ERROR:", logout.error);
		} else {
			dispatch(clearAuthData());
			console.log(
				"SUPABASE SIGN OUT USER SUCCESS: ",
				logout.status,
				logout.data
			);
		}
	} catch (error) {
		console.error("AUTH THUNK ERROR ----> logout():", error);
	}
};

export const createUserProfile = (payload) => async (dispatch) => {
	console.log("IN AUTH THUNK ----> createUserProfile(payload): ", payload);

	const {
		user_id,
		username,
		first_name,
		last_name,
		email,
		phone_number,
		gender_identity,
		city,
		country,
	} = payload;

	try {
		const createUser = await supabase
			.from("user")
			.insert(payload)
			.select()
			.single();

		if (createUser.error) {
			console.error("SUPABASE CREATE USER ERROR:", createUser.error);
		} else {
			console.log(
				"SUPABASE CREATE USER SUCCESS: ",
				createUser.status,
				createUser.data
			);
			// check the pending invited table for a matching phone number and add them to the group if it matches.
		}
	} catch (error) {
		console.error("AUTH THUNK ERROR ----> createUserProfile():", error);
	}
};

export const inviteUser = (phoneNumbers, groupId) => async (dispatch) => {
	console.log(
		"IN AUTH THUNK ----> inviteUser(phoneNumbers, groupId): ",
		phoneNumbers,
		groupId
	);

	try {
		for (let number of phoneNumbers) {
			console.log("IN AUTH THUNK ----> inviteUser: NUMBER ", number);
			const addToPending = await supabase
				.from("pending_invites")
				.insert({ phone_number: number, group_id: groupId }).select().single()

				if(addToPending.error){
					console.error('SUPABASE ADD TO PENDING ERROR!:', addToPending.error);

				}else{
					console.log('SUPABASE ADD TO PENDING SUCCESS!:', addToPending.data);

				}

			// const invite = await supabase.auth.inviteUser(number);
			// if (invite.error) {
			// 	console.error("SUPABASE INVITE USER ERROR:", invite.error);
			// } else {
			// 	console.log(
			// 		"SUPABASE INVITE USER USER SUCCESS: ",
			// 		invite.status,
			// 		invite.data
			// 	);
			// }
			// insert into the pending invites table
		}
	} catch (error) {
		console.error("AUTH THUNK ERROR ----> inviteUser(members):", error);
	}
};
