import React, { useEffect, useState } from 'react';

import Dropdown from './Dropdown';

function Route() {
  const [start, setStart] = useState('Dundee');
  const [end, setEnd] = useState('Edinburgh'); 

  const [stops, setStops] = useState([]); 

  // API call for stop areas
  const processRequest = async () => {    
    try {
      const result = await fetch('https://api.ember.to/v1/locations/?type=STOP_AREA'); 
      const data = await result.json(); 

      // Format data
      let temp = [];
      for (let i = 0; i < data.length; i++) {
        temp.push({stop_name: data[i].name, detailed_name: data[i].detailed_name});
      }
      setStops(temp);

    } catch(err) {
      console.log(err);
    }
  }

  // On mount
  useEffect(() => {
    processRequest();
  }, [])

  return (
    <div className='route_container'>
      <Dropdown 
        label='From'
        options={stops}
        value={start}
      />
      <Dropdown 
        label='To'
        options={stops}
        value={end}
      />
    </div>
  )
}

export default Route