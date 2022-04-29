import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../slices/AdultSlice';

function AdultCounter() {
  const count = useSelector((state) => state.adultCounter.value);
  const dispatch = useDispatch();

  return (
    <div className='counter_container'>
      <button className='counter_decrease' onClick={() => dispatch(decrement())}>-</button>
      <span className='counter_count'>{count}</span>
      <button className='counter_increase' onClick={() => dispatch(increment())}>+</button>
    </div>
  )
}

export default AdultCounter