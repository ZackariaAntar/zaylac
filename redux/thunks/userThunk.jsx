import { setUserData } from "../slices/userSlice";

import { supabase } from "@/utils/supabase/supabaseClient";


export const getUser = (user_id) => async (dispatch) => {
	console.log("IN USER THUNK ----> getUser(user_id): ", user_id);
	try {
		const user = await supabase.from("user").select("*").eq(user_id).limit(1);
		if (user.error) {
			console.error("SUPABASE GET USER ERROR!: ", user.error);
			dispatch(setUserData(user.data));
		} else {
            console.log("SUPABASE GET USER SUCCESS!: ", user.data);
			dispatch(setUserData(user.data));
		}
	} catch (error) {
		console.log("USER THUNK ERROR --> getUser(user_id): ", error);
	}
};

