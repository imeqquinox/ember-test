import { createSlice } from '@reduxjs/toolkit';

export const StartLocation = createSlice({
  name: 'startLocation', 
  initialState: {
    value: 0,
  },
  reducers: {
    startLocationChange: (state, action) => {
      state.value = action.payload; 
    }
  }
});

export const { startLocationChange } = StartLocation.actions; 

export default StartLocation.reducer;