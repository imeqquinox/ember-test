import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 

function Dropdown({ label, setStop }) {
  const stops = useSelector((state) => state.inputData.stops);
  const [stopName, setStopName] = useState(''); 
  const dispatch = useDispatch(); 

  const selectStop = (stop) => {
    setStopName(stop.stop_name);
    dispatch(setStop(stop.id));
  }

  return (
  <div className='dropdown_container'>
    <label>
      {label}
      <br />
      <input type='text' value={stopName} placeholder='Street or town' onChange={(event) => setStopName(event.target.value)} />
      <br />
      {stops.filter((value) => {
        if (stopName === "") {
          return value;
        } else if (value.stop_name.toLowerCase() === stopName.toLocaleLowerCase()) {
          return null;
        } else if (value.stop_name.toLowerCase().includes(stopName.toLowerCase())) {
          return value;
        }
      }).map((stop) => (
        <>
          <span className='dropdown_option' onClick={() => selectStop(stop)}>{stop.stop_name}</span>
          <br />
        </>
      ))}
    </label>
  </div>
  )
}

export default Dropdown