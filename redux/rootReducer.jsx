import { combineReducers } from "@reduxjs/toolkit";
import auth from './slices/authSlice'

const rootReducer = combineReducers({
    auth,
    

})

export default rootReducer