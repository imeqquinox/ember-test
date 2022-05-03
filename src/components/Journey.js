import React, { useEffect, useState } from 'react';

import './css/Journey.css';

function Journey({ departureTime, arrivalTime, availability, ticketPrice, tickets }) {  
  const [totalPrice, setTotalPrice] = useState(0);   
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    calculateTotalPrice();
    checkAvailability();
  }, [])
  
  const calculateTotalPrice = () => {
    let price = 0;
    price += tickets.adult * ticketPrice.adult; 
    price += tickets.concession * ticketPrice.concession; 
    price += tickets.child * ticketPrice.child; 
    price += tickets.bike * ticketPrice.bicycle; 
    price += tickets.baby * ticketPrice.young_child;
    price += tickets.wheelchair * ticketPrice.wheelchair;

    setTotalPrice(price);
  }

  const checkAvailability = () => {
    let totalTickets = 0; 
    
    for (const key in tickets) {
      totalTickets += tickets[key];
    }

    if (totalTickets > availability) {
      setAvailable(false);
    } else {
      setAvailable(true);
    }
  }

  return (
    <div className='journey_container'>
      <div className='journey_leftside'>
        <span>
          {departureTime}
        </span>
        <span> - </span>
        <span>
          {arrivalTime}
        </span>
        <br />
        { available ? 
          <span className='journey_seats'>
            {availability} seats available
          </span>
        :
          <span className='journey_seats'>
            Only {availability} seats available
          </span>
        }
      </div>
      
      <div className='journey_rightside'>
        <span>
          £{(totalPrice / 100).toFixed(2)}
        </span>
      </div>      
    </div>
  )
}

export default Journey