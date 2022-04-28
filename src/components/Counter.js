import React, { useState } from 'react';

function Counter() {
  const [counter, setCounter] = useState(0);
  //const [isDisabled, setIsDisabled] = useState(true);

  const increase = () => {
    setCounter(count => count + 1);

    // For disabling the button 
    // if (counter > 0) {
    //   setIsDisabled(false);
    // }
  }

  const decrease = () => {
    if (counter > 0) {
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