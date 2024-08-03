import { createSlice } from "@reduxjs/toolkit";

export const ChangeProfileSlice = createSlice({
   name: "ChangeProfile",
   initialState: {
      securityType: "account",
   },
   reducers: {
      setIsSecurity(state, action) {
         state.securityType = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { setIsSecurity } = ChangeProfileSlice.actions;

export default ChangeProfileSlice.reducer;
