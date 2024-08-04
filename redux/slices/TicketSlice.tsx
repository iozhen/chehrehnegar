import { createSlice } from "@reduxjs/toolkit";

export const TicketSlice = createSlice({
   name: "ticket",
   initialState: {
      tickets: [],
   },
   reducers: {
      setTickets(state, action) {
         state.tickets = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { setTickets } = TicketSlice.actions;

export default TicketSlice.reducer;
