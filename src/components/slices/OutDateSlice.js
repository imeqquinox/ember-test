import { createSlice } from "@reduxjs/toolkit";

export const OutDateSlice = createSlice({
  name: 'outDate',
  initialState: {
    value: new Date(), 
  },
  reducers: {
    outDateChange: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { outDateChange } = OutDateSlice.actions; 

export default OutDateSlice.reducer; 