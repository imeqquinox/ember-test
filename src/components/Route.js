import React from 'react';
import { setStartLocation, setEndLocation } from './slices/InputSlice';

import Dropdown from './Dropdown';

// Todo: 
// Add error if the start and end locations are the same

function Route() {
  return (
    <div className='route_container'>
      <Dropdown 
        label='From'
        setStop={setStartLocation}
      />
      <Dropdown 
        label='To'
        setStop={setEndLocation}
      />
    </div>
  )
}

export default Route