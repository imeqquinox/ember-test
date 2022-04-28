import React, { useState } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

function TravelDate() {
  const [outDate, setOutDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());

  return (
    <div className='traveldate_container'>
      <label>Out</label>
      <Calendar onChange={setOutDate} value={outDate}/>

      <label>Return</label>
      <Calendar onChange={setReturnDate} value={returnDate}/>
    </div>
  )
}

export default TravelDate