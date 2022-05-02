import { configureStore } from "@reduxjs/toolkit";
import InputReducer from './components/slices/InputSlice'; 

export default configureStore({
  reducer: {
    inputData: InputReducer
  },
})