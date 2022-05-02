import React, { useState } from 'react';

function Counter({ counter, setCounter }) {
  //const [counter, setCounter] = useState(0);

  const increase = () => {
    //setCounter(count => count + 1);
    setCounter(count => count + 1); 
  }

  const decrease = () => {
    if (counter > 0) {
      //setCounter(count => count - 1);
      setCounter(count => count - 1);
    }
  }

  return (
    <div className='counter_container'>
      <button className='counter_decrease' onClick={decrease}>-</button>
      <span className='counter_count'>{counter}</span>
      <button className='counter_increase' onClick={increase}>+</button>
    </div>
  )
}

export default Counter