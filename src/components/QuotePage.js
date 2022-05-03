import React from 'react';
import { useSelector } from 'react-redux';

import './css/QuotePage.css';
import Journey from './Journey';

function QuotePage() {
  const quoteData = useSelector((state) => state.outputData.journey); 
  const startDate = useSelector((state) => state.inputData.startDate); 
  const tickets = useSelector((state) => state.inputData.tickets); 

  return (
    <div className='quotepage_container'>
      <span className='quotepage_dateheading'> 
        {startDate.toDateString()}
      </span>
      {quoteData.map((journey) => (
        <Journey 
          departureTime={journey.departure.toLocaleTimeString()}
          arrivalTime={journey.arrival.toLocaleTimeString()}
          availability={journey.availability.seat}
          ticketPrice={journey.prices}
          tickets={tickets}
        />
      ))}
    </div>
  )
}

export default QuotePage