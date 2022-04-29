import React, { useState, useEffect } from 'react';

import Route from './Route';
import TravelDate from './TravelDate';
import Passengers from './Passengers';
import Search from './Search';

function JourneyPlanner() {
  const [stops, setStops] = useState([]);
  
  // On mount
  useEffect(() => {
    processRequest();
  }, [])
  
  // API call for stop areas
  const processRequest = async () => {    
    try {
      const result = await fetch('https://api.ember.to/v1/locations/?type=STOP_AREA'); 
      const data = await result.json(); 

      // Format data
      let temp = [];
      for (let i = 0; i < data.length; i++) {
        temp.push({ stop_name: data[i].name, detailed_name: data[i].detailed_name, id: data[i].id });
      }
      setStops(temp);
      
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className='planner_container'>
      <Route stops={stops} />
      <br />
      <TravelDate />
      <br />
      <Passengers />
      <br />
      <Search />
    </div>
  )
}

export default JourneyPlanner