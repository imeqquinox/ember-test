import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startLocationChange } from './slices/StartLocationSlice';
import { endLocationChange } from './slices/EndLocationSlice';

import Dropdown from './Dropdown';

// Todo: 
// Add error if the start and end locations are the same

function Route({ stops, setStartLocation, setEndLocation }) {
  return (
    <div className='route_container'>
      <Dropdown 
        label='From'
        stops={stops}
        setStop={setStartLocation}
      />
      <Dropdown 
        label='To'
        stops={stops}
        setStop={setEndLocation}
      />
    </div>
  )
}

export default Route