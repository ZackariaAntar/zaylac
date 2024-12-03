import { setUserData, clearUserData } from "../slices/userSlice";

import { supabase } from "@/utils/supabase/supabaseClient";

export const getUser = (id) => async (dispatch) => {
	console.log("IN USER THUNK ----> getUser(user_id): ", id);
	try {
		const user = await supabase
			.from("user")
			.select("*")
			.eq("user_id", id)
			.single();

		if (user.error) {
			console.error("SUPABASE GET USER ERROR!: ", user.error);
			dispatch(clearUserData());
		} else {
			console.log("SUPABASE GET USER SUCCESS!: ", user.data);
			dispatch(setUserData(user.data));
		}
	} catch (error) {
		console.log("USER THUNK ERROR --> getUser(user_id): ", error);
	}
};
export const createUserProfile = (payload) => async (dispatch) => {
	console.log("IN USER THUNK ----> createUserProfile(payload): ", payload);
	try {
		const createUser = await supabase.from("user").insert(payload);
		if (createUser.error) {
			console.error("SUPABASE CREATE USER ERROR!: ", createUser.error);
			dispatch(clearUserData());
		} else {
			console.log("SUPABASE CREATE USER SUCCESS!: ", createUser.data);
			dispatch(getUser(payload.user_id));
		}
	} catch (error) {
		console.log("USER THUNK ERROR --> createUserProfile(payload): ", error);
	}
};
