import { createSlice } from '@reduxjs/toolkit'; 

export const OutputSlice = createSlice({
  name: 'outputData', 
  initialState: {
    outJourney: [],
    returnJourney: []
  },
  reducers: {
    addOutJourney: (state, action) => {
      state.outJourney.push(action.payload);
    }, 
    addReturnJourney: (state, action) => {
      state.returnJourney.push(action.payload);
    },
    clearJourneys: (state) => {
      state.outJourney = []; 
      state.returnJourney = [];
    }
  }
});

export const { 
  addOutJourney, 
  addReturnJourney,  
  clearJourneys 
} = OutputSlice.actions; 

export default OutputSlice.reducer;