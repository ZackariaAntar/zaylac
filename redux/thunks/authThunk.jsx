import { supabase } from "../utils/supabase/supabaseClient.jsx";

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

			dispatch(signIn(payload));
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
	} catch (error) {}
};
