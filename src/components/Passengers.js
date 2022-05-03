import React from 'react'
import { useSelector } from 'react-redux';

import { ReactComponent as Adult } from '../assets/adult.svg';
import { ReactComponent as Baby } from '../assets/baby.svg';
import { ReactComponent as Bike } from '../assets/bike.svg';
import { ReactComponent as Child } from '../assets/child.svg';
import { ReactComponent as Concession } from '../assets/concessions.svg';
import { ReactComponent as Wheelchair } from '../assets/wheelchair.svg';
import PassengerItem from './PassengerItem';

function Passengers() {
  const adultTicket = useSelector((state) => state.inputData.tickets.adult);
  const concessionTicket = useSelector((state) => state.inputData.tickets.concession);
  const childTicket = useSelector((state) => state.inputData.tickets.child); 
  const babyTicket = useSelector((state) => state.inputData.tickets.baby); 
  const wheelchairTicket = useSelector((state) => state.inputData.tickets.wheelchair); 
  const bikeTicket = useSelector((state) => state.inputData.tickets.bike);

  return (
    <div className='passengers_container'>
      <div className='passengers_menu'>
        <h3>Passengers</h3>
        <PassengerItem 
          logo={<Adult className='passengeritem_logo'/>}
          title='Adult'
          info='Over 18'
          type='Adult'
          ticketCounter={adultTicket}
        />
        <PassengerItem 
          logo={<Concession className='passengeritem_logo'/>}
          title='Concessions'
          info='Scottish bus pass holders'
          type='Other'
          ticketCounter={concessionTicket}
        />
        <PassengerItem 
          logo={<Child className='passengeritem_logo'/>}
          title='Children'
          info='5 - 18 without a bus pass'
          type='Other'
          ticketCounter={childTicket}
        />
        <PassengerItem 
          logo={<Baby className='passengeritem_logo'/>}
          title='Young Children'
          info='Under 5'
          type='Other'
          ticketCounter={babyTicket}
        />
        <h3>Extras</h3>
        <PassengerItem 
          logo={<Wheelchair className='passengeritem_logo'/>}
          title='Wheelchairs'
          info='One space per bus'
          type='Other'
          ticketCounter={wheelchairTicket}
        />
        <PassengerItem 
          logo={<Bike className='passengeritem_logo'/>}
          title='Bicycles'
          info='Two spaces per bus'
          type='Other'
          ticketCounter={bikeTicket}
        />
      </div>
    </div>
  )
}

export default Passengers