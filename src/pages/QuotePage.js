import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './css/QuotePage.css';
import Journey from '../components/Journey';
import { ReactComponent as Logo } from '../assets/logo.svg';

function QuotePage() {
  const stops = useSelector((state) => state.inputData.stops);
  const startLocation = useSelector((state) => state.inputData.startLocation); 
  const endLocation = useSelector((state) => state.inputData.endLocation);
  const outQuoteData = useSelector((state) => state.outputData.outJourney); 
  const returnQuoteData = useSelector((state) => state.outputData.returnJourney);
  const startDate = useSelector((state) => state.inputData.startDate); 
  const endDate = useSelector((state) => state.inputData.endDate); 
  const tickets = useSelector((state) => state.inputData.tickets); 

  const [isReturn, setIsReturn] = useState(false); 
  const [outStart, setOutStart] = useState(''); 
  const [outEnd, setOutEnd] = useState('');

  useEffect(() => {
    handleLocations(); 
    handleReturnTrip();
  }, [])

  const handleLocations = () => {
    const start = stops.find((stop) => stop.id === startLocation);
    const end = stops.find((stop) => stop.id === endLocation); 
    setOutStart(start.stop_name);
    setOutEnd(end.stop_name);
  }

  // Check for return trip
  const handleReturnTrip = () => {
    if (!returnQuoteData.length) {
      setIsReturn(true); 
    } else {
      setIsReturn(false);
    }
  }

  return (
    <div className='quotepage_container'>
      <header className='quotepage_header'>
        <Logo className='quotepage_logo' />
      </header>
      {
        isReturn ?
        <div className='quotepage_quote'>
          <span className='quotepage_trip'><strong>Out</strong> {outStart} to {outEnd}</span>
          <span className='quotepage_dateheading'> 
            {startDate.toDateString()}
          </span>
          {outQuoteData.map((journey) => (
            <Journey 
              departureTime={journey.departure.toLocaleTimeString()}
              arrivalTime={journey.arrival.toLocaleTimeString()}
              availability={journey.availability.seat}
              ticketPrice={journey.prices}
              tickets={tickets}
            />
          ))}
        </div>
        : 
        <div className='quotepage_quote'>
          <span className='quotepage_trip'><strong>Out</strong> {outStart} to {outEnd}</span>
          <span className='quotepage_dateheading'> 
            {startDate.toDateString()}
          </span>
          {outQuoteData.map((journey) => (
            <Journey 
              departureTime={journey.departure.toLocaleTimeString()}
              arrivalTime={journey.arrival.toLocaleTimeString()}
              availability={journey.availability.seat}
              ticketPrice={journey.prices}
              tickets={tickets}
            />
          ))}
          <br />
          <span className='quotepage_trip'><strong>Return</strong> {outEnd} to {outStart}</span>
          <span className='quotepage_dateheading'> 
            {endDate ? endDate.toDateString() : null}
          </span>
          {returnQuoteData.map((journey) => (
            <Journey 
              departureTime={journey.departure.toLocaleTimeString()}
              arrivalTime={journey.arrival.toLocaleTimeString()}
              availability={journey.availability.seat}
              ticketPrice={journey.prices}
              tickets={tickets}
            />
          ))}
        </div>
      }
    </div>
  )
}

export default QuotePage