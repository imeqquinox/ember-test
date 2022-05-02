import React from 'react';
import Calendar from 'react-calendar';
import { useSelector, useDispatch } from 'react-redux';
import { outDateChange } from './slices/OutDateSlice';
import { returnDateChange } from './slices/ReturnDateSlice';

import 'react-calendar/dist/Calendar.css';

function TravelDate({ startDate, endDate, setStart, setEnd }) {
  const outDate = useSelector((state) => state.outDate.value);
  const returnDate = useSelector((state) => state.returnDate.value);
  const dispatch = useDispatch();

  return (
    <div className='traveldate_container'>
      <label>Out</label>
      {/* <Calendar onChange={(value) => dispatch(outDateChange(value))} value={outDate}/> */}
      <Calendar onChange={setStart} value={startDate} />

      <label>Return</label>
      {/* <Calendar onChange={(value) => dispatch(returnDateChange(value))} value={returnDate}/> */}
      <Calendar onChange={setEnd} value={endDate} />
    </div>
  )
}

export default TravelDate