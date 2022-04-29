import { createSlice } from "@reduxjs/toolkit";

export const EndLocation = createSlice({
  name: 'endLocation',
  initialState: {
    value: 0, 
  },
  reducers: {
    endLocationChange: (state, action) => {
      state.value = action.payload; 
    }
  }
});

export const { endLocationChange } = EndLocation.actions;

export default EndLocation.reducer;