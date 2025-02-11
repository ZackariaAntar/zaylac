import { createSlice } from "@reduxjs/toolkit";
const initialState = { pending: [], data: [] };

const groupSlice = createSlice({
	name: "group",
	initialState,
	reducers: {
		setGroupData(state, action) {
			return { ...state, data: action.payload };
		},
		setPendingData(state, action) {
			return { ...state, pending: action.payload };
		},
		clearGroupData() {
			return initialState;
		},
	},
});

export const { setGroupData, setPendingData, clearGroupData } =
	groupSlice.actions;

export default groupSlice.reducer;
