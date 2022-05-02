import React from 'react';
import Counter from './Counter';

import './css/PassengerItem.css';

function PassengerItem({ logo, title, info, tickets, setTickets}) {
  return (
    <div className='passengeritem_container'>
      {logo}
      <div className='passengeritem_titlecontainer'>
        <span className='passengeritem_title'>{title}</span>
        <span className='passengeritem_info'>{info}</span>
      </div>
      {/* {props.counter} */}
      <Counter 
        counter={tickets}
        setCounter={setTickets}
      />
    </div>
  )
}

export default PassengerItem