import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import ProfilesSlice from "./slices/ProfilesSlice";
import sidebarSlice from "./slices/sidebarSlice";
import ChangeProfileSlice from "./slices/ChangeProfileSlice";

const reducers = combineReducers({
   profile: ProfilesSlice,
   sidebar: sidebarSlice,
   changeProfile: ChangeProfileSlice,
});

export const store = configureStore({
   reducer: reducers,
});
