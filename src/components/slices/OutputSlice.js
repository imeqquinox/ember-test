import { createSlice } from '@reduxjs/toolkit'; 

export const OutputSlice = createSlice({
  name: 'outputData', 
  initialState: {
    journey: [],
    bookingFound: false, 
  },
  reducers: {
    addJourney: (state, action) => {
      state.journey.push(action.payload);
    }, 
    setBookingFound: (state, action) => {
      state.bookingFound = action.payload; 
    },
  }
});

export const { addJourney, setBookingFound } = OutputSlice.actions; 

export default OutputSlice.reducer;