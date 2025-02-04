import { createSlice } from "@reduxjs/toolkit";
const initialState =[];

const groupSlice = createSlice({
	name: "group",
	initialState,
	reducers: {
		setGroupData(state, action) {
			return action.payload;
		},
		clearGroupData() {
			return initialState;
		},
	},
});

export const { setGroupData, clearGroupData } = groupSlice.actions;

export default groupSlice.reducer;
