import { createSlice } from '@reduxjs/toolkit'; 

export const OutputSlice = createSlice({
  name: 'outputData', 
  initialState: {
    outJourney: [],
    returnJourney: [],
    bookingFound: false, 
  },
  reducers: {
    addOutJourney: (state, action) => {
      state.outJourney.push(action.payload);
    }, 
    addReturnJourney: (state, action) => {
      state.returnJourney.push(action.payload);
    },
    setBookingFound: (state, action) => {
      state.bookingFound = action.payload; 
    },
  }
});

export const { addOutJourney, addReturnJourney, setBookingFound } = OutputSlice.actions; 

export default OutputSlice.reducer;