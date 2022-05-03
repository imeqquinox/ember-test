import { configureStore } from "@reduxjs/toolkit";
import InputReducer from './components/slices/InputSlice'; 
import OutputReducer from './components/slices/OutputSlice'; 

export default configureStore({
  reducer: {
    inputData: InputReducer,
    outputData: OutputReducer
  },
})