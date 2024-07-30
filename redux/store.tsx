import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import ProfilesSlice from "./slices/ProfilesSlice";

const reducers = combineReducers({
   profile: ProfilesSlice,
});

export const store = configureStore({
   reducer: reducers,
});
