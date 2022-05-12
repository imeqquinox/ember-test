import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 

import './css/Dropdown.css';

function Dropdown({ label, setStop, defaultStop }) {
  const stops = useSelector((state) => state.inputData.stops);
  const [stopName, setStopName] = useState(defaultStop); 
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true); 
  const dispatch = useDispatch(); 

  // Select stop from dropdown
  const selectStop = (stop) => {
    setStopName(stop.stop_name + " (" + stop.detailed_name + ")");
    dispatch(setStop(stop.id));
  }

  // 
  const handleInput = (value) => {
    setStopName(value);
    const result = stops.filter((stop) => {
      if (value.toLowerCase() === (stop.stop_name.toLowerCase() + " (" + stop.detailed_name.toLowerCase() + ")")) {
        return stop.id;
      } 
    });

    if (result.length > 0) {
      if (result[0].id != null) {
        dispatch(setStop(result[0].id));
      }
    } else {
      dispatch(setStop(0));
    }
  }

  // Need to set timer so user input can be registered before hiding options
  const onBlur = () => {
    setTimeout(() => {
      setFocused(false);
    }, 100);
  }

  return (
  <div className='dropdown_container'>
    <label>
      {label}
      <br />
    </label>
    <input type='text' value={stopName} onFocus={onFocus} onBlur={onBlur} placeholder='Street or town' onChange={(event) => handleInput(event.target.value)} />
    <br />
    { 
    focused 
    ?
      stops.filter((value) => {
        if (stopName === "") {
          return value;
        } else if ((value.stop_name.toLowerCase() === stopName.toLowerCase()) || (value.detailed_name.toLowerCase() === stopName.toLowerCase())) {
          return value;
        } else if ((value.stop_name.toLowerCase().includes(stopName.toLowerCase())) || (value.detailed_name.toLowerCase().includes(stopName.toLowerCase()))) {
          return value;
        }
      }).map((stop) => (
        <>
          <div className='dropdown_optioncontainer' onClick={() => selectStop(stop)}>
            <span className='dropdown_option'>{stop.stop_name}</span>
            <br />
            <span className='dropdown_optionsub'>{stop.detailed_name}</span>
          </div>
        </>
      ))
    :
      null
    }
  </div>
  )
}

export default Dropdown