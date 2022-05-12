import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setStartLocation, setEndLocation } from './slices/InputSlice';

import Dropdown from './Dropdown';
import StopsMap from './StopsMap';

function Route({ isValid, setValid }) {
  const startLocation = useSelector((state) => state.inputData.startLocation); 
  const endLocation = useSelector((state) => state.inputData.endLocation); 
  const [errText, setErrText] = useState("");

  useEffect(() => {
    checkLocation(); 
  }, [startLocation, endLocation]);

  const checkLocation = () => {
    // Check that both are a valid location
    // Check that the start and end locations are different
    if (startLocation === 0 || endLocation === 0) {
      setValid(false); 
      setErrText("Please enter a valid location.");
    } else if (startLocation === endLocation) {
      setValid(false); 
      setErrText("Your start and end location are the same.");
    } else {
      setValid(true);
      setErrText("");
    }
  }

  return (
    <div className='route_container'>
      <Dropdown 
        label='From'
        setStop={setStartLocation}
        defaultStop='Dundee (Greenmarket)'
      />
      <br />
      <Dropdown 
        label='To'
        setStop={setEndLocation}
        defaultStop='Edinburgh (St Andrew Square)'
      />
      <br /> 
      {
        isValid 
        ? 
          null 
        : 
          <span className='booking_error'>{errText}</span>
      }
    </div>
  )
}

export default Route