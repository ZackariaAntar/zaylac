import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

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
