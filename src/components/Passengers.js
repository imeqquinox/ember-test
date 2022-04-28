import React, { useState } from 'react'

import { ReactComponent as Adult } from '../assets/adult.svg';
import { ReactComponent as Baby } from '../assets/baby.svg';
import { ReactComponent as Bike } from '../assets/bike.svg';
import { ReactComponent as Child } from '../assets/child.svg';
import { ReactComponent as Concession } from '../assets/concessions.svg';
import { ReactComponent as Wheelchair } from '../assets/wheelchair.svg';
import PassengerItem from './PassengerItem';

function Passengers() {
  const [isOpen, setIsOpen] = useState(false);
  const [adult, setAdult] = useState(1); 
  const [concession, setConcession] = useState(0);
  const [child, setChild] = useState(0); 
  const [youngChild, setYoungChild] = useState(0);

  return (
    <div className='passengers_container'>
      <span>
        People, Bikes &amp; Wheelchairs
      </span>
      <br />
      <label>1 Adult (no concessions)</label>

      <div className='passengers_menu'>
        <h3>Passengers</h3>
        <PassengerItem 
          logo={<Adult className='passengeritem_logo'/>}
          title='Adult'
          info='Over 18'
        />
        <PassengerItem 
          logo={<Concession className='passengeritem_logo'/>}
          title='Concessions'
          info='Scottish bus pass holders'
        />
        <PassengerItem 
          logo={<Child className='passengeritem_logo'/>}
          title='Children'
          info='5 - 18 without a bus pass'
        />
        <PassengerItem 
          logo={<Baby className='passengeritem_logo'/>}
          title='Young Children'
          info='Under 5'
        />
        <h3>Extras</h3>
        <PassengerItem 
          logo={<Wheelchair className='passengeritem_logo'/>}
          title='Wheelchairs'
          info='One space per bus'
        />
        <PassengerItem 
          logo={<Bike className='passengeritem_logo'/>}
          title='Bicycles'
          info='Two spaces per bus'
        />
      </div>
    </div>
  )
}

export default Passengers