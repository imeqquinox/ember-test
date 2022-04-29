import { configureStore } from "@reduxjs/toolkit";
import StartLocationReducer from './components/slices/StartLocationSlice';
import EndLocationReducer from './components/slices/EndLocationSlice';
import OutDateReducer from './components/slices/OutDateSlice';
import ReturnDateReducer from './components/slices/ReturnDateSlice';
import AdultReducer from './components/slices/AdultSlice';

export default configureStore({
  reducer: {
    startLocation: StartLocationReducer,
    endLocation: EndLocationReducer,
    outDate: OutDateReducer,
    returnDate: ReturnDateReducer,
    adultCounter: AdultReducer,
  },
})