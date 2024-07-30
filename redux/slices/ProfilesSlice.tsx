import { createSlice } from "@reduxjs/toolkit";

export const ProfileSlice = createSlice({
   name: "profile",
   initialState: {
      ProfileData: null,
   },
   reducers: {
      setProfileData(state, action) {
         state.ProfileData = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { setProfileData } = ProfileSlice.actions;

export default ProfileSlice.reducer;
