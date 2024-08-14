import { createSlice } from "@reduxjs/toolkit";

export const LoginSlice = createSlice({
  name: "login",
  initialState: {
    isLogin: false,
  },
  reducers: {
    setLogin(state, action) {
      state.isLogin = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogin } = LoginSlice.actions;

export default LoginSlice.reducer;
