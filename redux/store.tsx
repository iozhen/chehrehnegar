import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import ProfilesSlice from "./slices/ProfilesSlice";
import sidebarSlice from "./slices/sidebarSlice";

const reducers = combineReducers({
   profile: ProfilesSlice,
   sidebar: sidebarSlice,
});

export const store = configureStore({
   reducer: reducers,
});
