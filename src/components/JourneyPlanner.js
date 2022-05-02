import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addStop } from './slices/InputSlice';

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
  const dispatch = useDispatch(); 

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
      let today = new Date(); 
      for (let i = 0; i < data.length; i++) {
        // Make sure the stop is bookable from today and that today is not past the stop's end date.
        if ((data[i].bookable_from == null || today > new Date(data[i].bookable_from))
          && (data[i].bookable_until == null || today < new Date(data[i].bookable_until))) {
            dispatch(addStop({ stop_name: data[i].name, detailed_name: data[i].detailed_name, id: data[i].id }));
          }
      }
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className='planner_container'>
      <Route />
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