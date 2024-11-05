import { createSlice } from "@reduxjs/toolkit";

// const initialState = []
const initialState = {
    someData:[],
    moreData:[],
	evenMore:{
		aLotOfOptions:[],
		maybeTooManyOptions:{

		}
	}
    };

const templateSlice = createSlice({
	name: "template",
	initialState,
	reducers: {
		setSomeData(state, action) {
			return {...state, someData:action.payload} // for when initialState is an object
			// return action.payload // for when initialState is an array
			// return [...state, action.payload] // for when initialState is an array
			// return state.push(action.payload) // for when initialState is an array
			// return state=action.payload // for when initialState is an array
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
