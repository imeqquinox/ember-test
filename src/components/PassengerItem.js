import React from 'react';

import './css/PassengerItem.css';
import Counter from './Counter';

function PassengerItem(props) {
  return (
    <div className='passengeritem_container'>
      {props.logo}
      <div className='passengeritem_titlecontainer'>
        <span className='passengeritem_title'>{props.title}</span>
        <span className='passengeritem_info'>{props.info}</span>
      </div>
      <Counter />
    </div>
  )
}

export default PassengerItem