import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    someData:[],
    moreData:[]
    };

const templateSlice = createSlice({
	name: "template",
	initialState,
	reducers: {
		setSomeData(state, action) {
			return {...state, someData:action.payload}
		},
		setMoreData(state, action) {
			return {...state, moreData:action.payload}
		},
		clearAllTemplateData() {
			return initialState;
		},
	},
});

export const { setSomeData, setMoreData } = templateSlice.actions;

export default templateSlice.reducer;
