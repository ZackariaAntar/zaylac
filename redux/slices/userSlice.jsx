import { createSlice } from "@reduxjs/toolkit";
const initialState = {username:'', user_id:'', first_name:'', last_name:'', phone_number:'', email:'', city:'', country:'', gender_identity:''};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserData(state, action) {
			return action.payload;
		},
		clearUserData() {
			return initialState;
		},
	},
});

export const { setUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;
