import React, { useState } from 'react';

function Dropdown({ label, stops, setStop }) {
  const [stopName, setStopName] = useState(''); 

  const selectStop = (stop) => {
    setStop(stop.id);
    setStopName(stop.stop_name);
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
          <span onClick={() => selectStop(stop)}>{stop.stop_name}</span>
          <br />
        </>
      ))}
    </label>
  </div>
  )
}

export default Dropdown