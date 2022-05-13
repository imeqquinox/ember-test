import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useSelector, useDispatch } from 'react-redux';
import { setStartDate, setEndDate, setReturnTrip } from './slices/InputSlice';

import 'react-calendar/dist/Calendar.css';

function TravelDate({ isValid, setValid }) {
  const startDate = useSelector((state) => state.inputData.startDate);
  const endDate = useSelector((state) => state.inputData.endDate); 
  const [addReturn, setAddReturn] = useState(false);
  const [errText, setErrText] = useState(""); 
  const dispatch = useDispatch();

  useEffect(() => {
    checkDates(); 
  }, [startDate, endDate]); 

  useEffect(() => {
    checkReturn(); 
  }, [endDate]); 

  const checkDates = () => {
    let outDate = startDate; 
    let returnDate = endDate; 
    let temp = new Date(); 
    // Set out date and time to now
    outDate.setHours(temp.getHours()); 
    outDate.setMinutes(temp.getMinutes()); 
    outDate.setMinutes(outDate.getMinutes() - outDate.getTimezoneOffset()); 

    // Set return 
    if (returnDate != null && returnDate.toDateString() === outDate.toDateString()) {
      returnDate.setHours(temp.getHours()); 
      returnDate.setMinutes(temp.getMinutes() + 1); 
      returnDate.setMinutes(returnDate.getMinutes() - returnDate.getTimezoneOffset()); 
    } else {
      returnDate = endDate; 
    }

    // Figure out current day and set to midnight
    let today = new Date(); 
    today.setHours(0, 0, 0, 0); 
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());

    // Check if attemping to book before today 
    // Check if return date is before today as well 
    // Check that the return date is not before the out date
    if (outDate < today) {
      setValid(false); 
      setErrText("Please enter a valid out date."); 
    } else if (returnDate != null && (returnDate < today)) {
      setValid(false); 
      setErrText("Please enter a valid return date.");
    } else if (returnDate != null && (returnDate < outDate)) {
      setValid(false); 
      setErrText("Your return date is before your out date.");
    } else {
      setValid(true);
    }
  }

  // Check if there is a return trip
  const checkReturn = () => {
    if (endDate != null) {
      dispatch(setReturnTrip(true)); 
      setAddReturn(true);
    }
  }

  // Reset if they remove a return trip
  const removeReturn = () => {
    setAddReturn(false); 
    dispatch(setEndDate(null)); 
    dispatch(setReturnTrip(false));
  }

  return (
    <div className='traveldate_container'>
      <label>Out</label>
      <Calendar onChange={(value) => dispatch(setStartDate(value))} value={startDate}/>

      <br />
      <label>Return</label>
      {
        addReturn ?
          <>
            <Calendar onChange={(value) => dispatch(setEndDate(value))} value={endDate}/>
            <label onClick={removeReturn}>Remove Return</label>
          </>
        :
          <>
            <br />
            <label onClick={() => setAddReturn(true)}>Add Return</label>
          </>
      }
      <br />
      {
        isValid
        ?
          null
        :
          <span className='booking_error'>{errText}</span>
      }

    </div>
  )
}

export default TravelDate