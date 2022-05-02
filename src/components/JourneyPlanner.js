import React, { useState, useEffect } from 'react';

import Route from './Route';
import TravelDate from './TravelDate';
import Passengers from './Passengers';
import Search from './Search';

// NEEDS TO BE DONE BY TOMORROW
// - Sort response with stop_areas AND stop_points (For the list of 14 stops with correct names) & (booking_from and booking_until_) 

// NOTES: 
// Check will be in individual components, potentially dont even need a search component since checks are here. 
// Go back to using useState ATM rework redux at the end potentially.                                                        

function JourneyPlanner({ setQuoteData }) {
  const [stops, setStops] = useState([]);
  const [startLocation, setStartLocation] = useState(0); 
  const [endLocation, setEndLocation] = useState(0); 
  const [startDate, setStartDate] = useState(new Date()); 
  const [endDate, setEndDate] = useState(null); 
  const [tickets, setTickets] = useState(1); 

  // On mount
  useEffect(() => {
    processRequest();
  }, [])

  // API call for stop areas
  const processRequest = async () => {    
    try {
      const result = await fetch('https://api.ember.to/v1/locations/?type=STOP_AREA'); 
      const data = await result.json(); 
      //console.log(data);
      
      // Format data
      let temp = []; 
      let today = new Date(); 
      for (let i = 0; i < data.length; i++) {
        // Make sure the stop is bookable from today and that today is not past the stop's end date.
        if ((data[i].bookable_from == null || today > new Date(data[i].bookable_from))
          && (data[i].bookable_until == null || today < new Date(data[i].bookable_until))) {
            // Potentailly sort all stops alphabetically 
            temp.push({ stop_name: data[i].name, detailed_name: data[i].detailed_name, id: data[i].id });
          }
      }
      setStops(temp);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className='planner_container'>
      <Route 
        stops={stops}
        setStartLocation={setStartLocation}
        setEndLocation={setEndLocation}
      />
      <br />
      <TravelDate 
        startDate={startDate}
        endDate={endDate}
        setStart={setStartDate}
        setEnd={setEndDate}
      />
      <br />
      <Passengers 
        tickets={tickets}
        setTickets={setTickets}
      />
      <br />
      <Search 
        startLocation={startLocation}
        endLocation={endLocation}
        startDate={startDate}
        endDate={endDate}
        setQuoteData={setQuoteData}
      />
    </div>
  )
}

export default JourneyPlanner