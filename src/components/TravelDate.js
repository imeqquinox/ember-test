import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useSelector, useDispatch } from 'react-redux';
import { setStartDate, setEndDate } from './slices/InputSlice';

import 'react-calendar/dist/Calendar.css';

function TravelDate() {
  const startDate = useSelector((state) => state.inputData.startDate);
  const endDate = useSelector((state) => state.inputData.endDate); 
  const [addReturn, setAddReturn] = useState(false);
  const dispatch = useDispatch();

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
            <label onClick={() => setAddReturn(false)}>Remove Return</label>
          </>
        :
          <>
            <br />
            <label onClick={() => setAddReturn(true)}>Add Return</label>
          </>
      }
      
    </div>
  )
}

export default TravelDate