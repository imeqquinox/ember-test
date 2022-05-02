import React from 'react';
import { useDispatch } from 'react-redux'; 
import { addTicket, removeTicket } from './slices/InputSlice';  

function Counter({ ticketCounter, ticketType }) {
  const dispatch = useDispatch(); 
  
  return (
    <div className='counter_container'>
      <button className='counter_decrease' onClick={() => dispatch(removeTicket(ticketType))}>-</button>
      <span className='counter_count'>{ticketCounter}</span>
      <button className='counter_increase' onClick={() => dispatch(addTicket(ticketType))}>+</button>
    </div>
  )
}

export default Counter