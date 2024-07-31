import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
   name: "sidebar",
   initialState: {
      mapType: "Open Street Map",
      isPlans: false,
      isWetlands: false,
      isDams: false,
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
   },
});

export const { setMapType, setIsPlans, setIsDams, setIsWetlands } =
   sidebarSlice.actions;
export default sidebarSlice.reducer;
