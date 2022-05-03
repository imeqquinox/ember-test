import React from 'react';
import { setStartLocation, setEndLocation } from './slices/InputSlice';

import Dropdown from './Dropdown';
import StopsMap from './StopsMap';

function Route() {
  return (
    <div className='route_container'>
      <Dropdown 
        label='From'
        setStop={setStartLocation}
      />
      {/* <StopsMap /> */}
      <br />
      <Dropdown 
        label='To'
        setStop={setEndLocation}
      />
    </div>
  )
}

export default Route