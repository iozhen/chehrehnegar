import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    mapType: "Open Street Map",
    isPlans: false,
    isWetlands: false,
    isDams: false,
    isFloods: false,
  },
  reducers: {
    setMapType(state, action) {
      state.mapType = action.payload;
    },
    setIsPlans(state, action) {
      state.isPlans = action.payload;
    },
    setIsWetlands(state, action) {
      state.isWetlands = action.payload;
    },
    setIsDams(state, action) {
      state.isDams = action.payload;
    },
    setIsFloods(state, action) {
      state.isFloods = action.payload;
    },
  },
});

export const { setMapType, setIsPlans, setIsDams, setIsWetlands, setIsFloods } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
