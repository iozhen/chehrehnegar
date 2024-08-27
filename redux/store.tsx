import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import ProfilesSlice from "./slices/ProfilesSlice";
import sidebarSlice from "./slices/sidebarSlice";
import ChangeProfileSlice from "./slices/ChangeProfileSlice";
import TicketSlice from "./slices/TicketSlice";
import LoginSlice from "./slices/LoginSlice";
import dateSlice from "./slices/dateSlice";

const reducers = combineReducers({
  profile: ProfilesSlice,
  sidebar: sidebarSlice,
  changeProfile: ChangeProfileSlice,
  ticket: TicketSlice,
  login: LoginSlice,
  date: dateSlice,
});

export const store = configureStore({
  reducer: reducers,
});
