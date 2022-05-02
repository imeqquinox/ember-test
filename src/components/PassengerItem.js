import React from 'react';
import Counter from './Counter';

import './css/PassengerItem.css';

function PassengerItem({ logo, title, info, ticketCounter }) {
  return (
    <div className='passengeritem_container'>
      {logo}
      <div className='passengeritem_titlecontainer'>
        <span className='passengeritem_title'>{title}</span>
        <span className='passengeritem_info'>{info}</span>
      </div>
      <Counter 
        ticketCounter={ticketCounter}
        ticketType={title}
      />
    </div>
  )
}

export default PassengerItem