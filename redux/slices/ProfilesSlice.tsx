import { createSlice } from "@reduxjs/toolkit";

export const ProfileSlice = createSlice({
   name: "profile",
   initialState: {
      ProfileData: null,
      avatar: "/images/Avatar.png",
   },
   reducers: {
      setProfileData(state, action) {
         state.ProfileData = action.payload;
      },
      setAvatar(state, action) {
         state.avatar = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { setProfileData, setAvatar } = ProfileSlice.actions;

export default ProfileSlice.reducer;
