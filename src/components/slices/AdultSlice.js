import { createSlice } from '@reduxjs/toolkit';

export const AdultSlice = createSlice({
  name: 'adultCounter', 
  initialState: {
    value: 1,
  },
  reducers: {
    increment: (state) => {
      state.value += 1; 
    },
    decrement: (state) => {
      if (state.value > 0) {
        state.value -= 1;
      }
    }
  }
});

export const { increment, decrement } = AdultSlice.actions;

export default AdultSlice.reducer;