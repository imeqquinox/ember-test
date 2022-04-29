import React, { useState } from 'react'

import { ReactComponent as Adult } from '../assets/adult.svg';
import { ReactComponent as Baby } from '../assets/baby.svg';
import { ReactComponent as Bike } from '../assets/bike.svg';
import { ReactComponent as Child } from '../assets/child.svg';
import { ReactComponent as Concession } from '../assets/concessions.svg';
import { ReactComponent as Wheelchair } from '../assets/wheelchair.svg';
import PassengerItem from './PassengerItem';
import AdultCounter from './ticket counters/AdultCounter';
import Counter from './Counter';

function Passengers() {
  const [isOpen, setIsOpen] = useState(false);

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
          type='Adult'
          counter={<AdultCounter />}
        />
        <PassengerItem 
          logo={<Concession className='passengeritem_logo'/>}
          title='Concessions'
          info='Scottish bus pass holders'
          type='Other'
          counter={<Counter />}
        />
        <PassengerItem 
          logo={<Child className='passengeritem_logo'/>}
          title='Children'
          info='5 - 18 without a bus pass'
          type='Other'
          counter={<Counter />}
        />
        <PassengerItem 
          logo={<Baby className='passengeritem_logo'/>}
          title='Young Children'
          info='Under 5'
          type='Other'
          counter={<Counter />}
        />
        <h3>Extras</h3>
        <PassengerItem 
          logo={<Wheelchair className='passengeritem_logo'/>}
          title='Wheelchairs'
          info='One space per bus'
          type='Other'
          counter={<Counter />}
        />
        <PassengerItem 
          logo={<Bike className='passengeritem_logo'/>}
          title='Bicycles'
          info='Two spaces per bus'
          type='Other'
          counter={<Counter />}
        />
      </div>
    </div>
  )
}

export default Passengers