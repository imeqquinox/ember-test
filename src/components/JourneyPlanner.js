import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addStop, sortStops } from './slices/InputSlice';

import './css/JourneyPlanner.css';
import Route from './Route';
import TravelDate from './TravelDate';
import Passengers from './Passengers';
import Search from './Search';
import LocationData from './LocationData.json';                                

function JourneyPlanner() {
  const stops = useSelector((state) => state.inputData.stops); 
  const dispatch = useDispatch(); 
  const [isRouteValid, setRouteValid] = useState(false);
  const [isDatesValid, setDatesValid] = useState(false); 
  const [isPassengersValid, setPassengersValid] = useState(false);

  // On mount
  useEffect(() => {
    processRequest();
  }, [])

  // API call for stop areas
  const processRequest = async () => {    
    try {
      if (!stops.length) {
        const result = await fetch('https://api.ember.to/v1/locations/?type=STOP_AREA'); 
        const data = await result.json(); 

        // Format data 
        let today = new Date(); 
        for (let i = 0; i < data.length; i++) {
          // Make sure the stop is bookable from today and that today is not past the stop's end date.
          if ((data[i].bookable_from == null || today > new Date(data[i].bookable_from))
            && (data[i].bookable_until == null || today < new Date(data[i].bookable_until))) {
                dispatch(addStop({ stop_name: data[i].region_name, detailed_name: data[i].detailed_name, id: data[i].id, 
                  locationData: {  longitude: LocationData.data[i].longitude, latitude: LocationData.data[i].latitude } }));
          }
        }
  
        dispatch(sortStops());
      }
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className='planner_container'>
      <Route isValid={isRouteValid} setValid={setRouteValid} />
      <br />
      <TravelDate isValid={isDatesValid} setValid={setDatesValid}/>
      <br />
      <Passengers isValid={isPassengersValid} setValid={setPassengersValid} />
      <br />
      <Search 
        routeValid={isRouteValid}
        datesValid={isDatesValid} 
        passengersValid={isPassengersValid}
      />
    </div>
  )
}

export default JourneyPlanner