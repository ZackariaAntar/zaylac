import { combineReducers } from "@reduxjs/toolkit";
import auth from './slices/authSlice'
import user from './slices/userSlice'
import group from './slices/groupSlice'
const rootReducer = combineReducers({
    auth,
    user,
    group,


})

export default rootReducer