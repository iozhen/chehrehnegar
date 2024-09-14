import { createSlice } from "@reduxjs/toolkit";

export const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    ProfileData: null,
    avatar: "/images/Avatar.png",
  },
  reducers: {
    setProfileData(state, action) {
      console.log("profile data");
      state.ProfileData = action.payload;
    },
    setAvatar(state, action) {
      state.avatar = action.payload;
    },
    setAllNull(state, action) {
      console.log(action.payload);
      state.ProfileData = action.payload;
      state.avatar = "/images/Avatar.png";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProfileData, setAvatar, setAllNull } = ProfileSlice.actions;

export default ProfileSlice.reducer;
