import { createSlice } from '@reduxjs/toolkit'; 

export const InputSlice = createSlice({
  name: 'inputData', 
  initialState: { 
    stops: [], 
    startLocation: 13, 
    endLocation: 42, 
    startDate: new Date(), 
    endDate: null, 
    returnTrip: false, 
    tickets: {
      adult: 1, 
      concession: 0, 
      child: 0, 
      baby: 0,
      wheelchair: 0, 
      bike: 0
    },
  },
  reducers: {
    addStop: (state, action) => {
      state.stops.push(action.payload); 
    },
    sortStops: (state) => {
      state.stops.sort((a, b) => a.stop_name.localeCompare(b.stop_name));
    },
    setStartLocation: (state, action) => {
      state.startLocation = action.payload; 
    },
    setEndLocation: (state, action) => {
      state.endLocation = action.payload; 
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload; 
    },
    setEndDate: (state, action) => { 
      state.endDate = action.payload; 
    }, 
    setReturnTrip: (state, action) => {
      state.returnTrip = action.payload;
    },
    addTicket: (state, action) => {
      switch (action.payload) {
        case "Adult": 
          state.tickets.adult += 1;
          break; 

        case "Concessions": 
          state.tickets.concession += 1;
          break; 

        case "Children": 
          state.tickets.child += 1;
          break; 

        case "Young Children": 
          state.tickets.baby += 1;
          break; 

        case "Wheelchairs": 
          if (state.tickets.wheelchair < 1)
            state.tickets.wheelchair += 1;
          break;

        case "Bicycles": 
          if (state.tickets.bike < 2)
            state.tickets.bike += 1;
          break;

        default:
          break; 
      }
    },
    removeTicket: (state, action) => {
      switch (action.payload) {
        case "Adult": 
          if (state.tickets.adult > 0)
            state.tickets.adult -= 1;
          break; 

        case "Concessions": 
          if (state.tickets.concession > 0)
            state.tickets.concession -= 1;
          break; 

        case "Children": 
          if (state.tickets.child > 0) 
            state.tickets.child -= 1;
          break; 

        case "Young Children": 
          if (state.tickets.baby > 0)
            state.tickets.baby -= 1;
          break; 

        case "Wheelchairs": 
          if (state.tickets.wheelchair > 0)
            state.tickets.wheelchair -= 1;
          break;

        case "Bicycles": 
          if (state.tickets.bike > 0) 
            state.tickets.bike -= 1;
          break;

        default:
          break; 
      }
    },
  }
});

export const { 
  addStop, 
  sortStops,
  setStartLocation, 
  setEndLocation,
  setStartDate, 
  setEndDate,
  setReturnTrip,
  addTicket,
  removeTicket
} = InputSlice.actions; 

export default InputSlice.reducer;