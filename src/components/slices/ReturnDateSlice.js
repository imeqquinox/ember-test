import { createSlice } from '@reduxjs/toolkit';

export const ReturnDateSlice = createSlice({
  name: 'returnDate', 
  initialState: {
    value: null, 
  }, 
  reducers: {
    returnDateChange: (state, action) => {
      state.value = action.payload;
    }
  }
}); 

export const { returnDateChange } = ReturnDateSlice.actions; 

export default ReturnDateSlice.reducer;