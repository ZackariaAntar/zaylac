import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuthData(state, action) {
			return action.payload;
		},
		clearAuthData() {
			return initialState;
		},
	},
});

export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
