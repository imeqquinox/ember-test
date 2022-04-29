import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startLocationChange } from './slices/StartLocationSlice';
import { endLocationChange } from './slices/EndLocationSlice';

import Dropdown from './Dropdown';

// Change Redux state to an object which contains the key info? 

function Route() {
  const [startSearchTerm, setStartSearchTerm] = useState("");
  const [endSearchTerm, setEndSearchTerm] = useState(""); 
  const [stops, setStops] = useState([]);
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
      let temp = [];
      for (let i = 0; i < data.length; i++) {
        temp.push({ stop_name: data[i].name, detailed_name: data[i].detailed_name, id: data[i].id });
      }
      setStops(temp);
      
    } catch(err) {
      console.log(err);
    }
  }

  // Handle input for starting location
  const handleStartSearch = (event) => {
    setStartSearchTerm(event.target.value);
    let input = event.target.value; 

    // Go through list of stop to check validity of stop spelling/choice
    for (let i = 0; i < stops.length; i++) {
      if (input.toLowerCase() === stops[i].stop_name.toLowerCase()) {
        dispatch(startLocationChange(stops[i].id));
        console.log(stops[i].id);
        break;
      } else {
        dispatch(startLocationChange(0));
      }
    }
  }

  // Handle input for ending location
  const handleEndSearch = (event) => {
    setEndSearchTerm(event.target.value);
    let input = event.target.value; 

    // Go through list of stop to check validity of stop spelling/choice
    for (let i = 0; i < stops.length; i++) {
      if (input.toLowerCase() === stops[i].stop_name.toLowerCase()) {
        dispatch(endLocationChange(stops[i].id));
        console.log(stops[i].id);
        break;
      } else {
        dispatch(endLocationChange(0));
      }
    }
  }

  return (
    <div className='route_container'>
      <div className='dropdown_container'>
        <label>
          From
          <br />
          <input type='text' placeholder='Street or town' onChange={(event) => handleStartSearch(event)}/>
          <br />
          {stops.filter((value) => {
            if (startSearchTerm === "") {
              return value; 
            }  else if (value.stop_name.toLowerCase() === startSearchTerm.toLocaleLowerCase()) {
              return null;
            } else if (value.stop_name.toLowerCase().includes(startSearchTerm.toLowerCase())) {
              return value; 
            }
          }).map((stop) => (
            <>
              <span>{stop.stop_name}</span>
              <br />
            </>
          ))}
        </label>
      </div>
      <div className='dropdown_container'>
        <label>
          To
          <br />
          <input type='text' placeholder='Street or town' onChange={(event) => handleEndSearch(event)}/>
          <br />
          {stops.filter((value) => {
            if (endSearchTerm === "") {
              return value; 
            }  else if (value.stop_name.toLowerCase() === endSearchTerm.toLocaleLowerCase()) {
              return null;
            } else if (value.stop_name.toLowerCase().includes(endSearchTerm.toLowerCase())) {
              return value; 
            }
          }).map((stop) => (
            <>
              <span>{stop.stop_name}</span>
              <br />
            </>
          ))}
        </label>
      </div>
      
      {/* <Dropdown 
        label='From'
        options={stops}
        value={start}
        setStop={setStart}
      />
      <Dropdown 
        label='To'
        options={stops}
        value={end}
        setStop={setEnd}
      /> */}
    </div>
  )
}

export default Route