import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addOutJourney, addReturnJourney, clearJourneys } from './slices/OutputSlice';
import { useNavigate } from 'react-router-dom';

function Search({ routeValid, datesValid, passengersValid }) {
  const startLocation = useSelector((state) => state.inputData.startLocation); 
  const endLocation = useSelector((state) => state.inputData.endLocation);
  const startDate = useSelector((state) => state.inputData.startDate); 
  const endDate = useSelector((state) => state.inputData.endDate); 
  const [isValid, setIsValid] = useState(true); 
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  let outDateStart = startDate;
  let outDateEnd = null; 
  let returnDateStart = endDate; 
  let returnDateEnd = null;

  useEffect(() => {
    checkQuery(); 
  }, [routeValid, datesValid, passengersValid]);

  const checkQuery = () => {
    if (routeValid && datesValid && passengersValid) {
      setIsValid(true); 
    } else {
      setIsValid(false);
    }
  }

  const formatDates = () => {
    let temp = new Date();
    if (outDateStart.toDateString() === temp.toDateString()) {
      // If today set to time right now 
      outDateStart.setHours(temp.getHours()); 
      outDateStart.setMinutes(temp.getMinutes());
      outDateStart.setMinutes(outDateStart.getMinutes() - outDateStart.getTimezoneOffset());
    } else {
      // Set as midnight 
      outDateStart.setHours(0, 0, 0, 0);
      outDateStart.setMinutes(outDateStart.getMinutes() - outDateStart.getTimezoneOffset());
    }
    

    // Check if there is a return or not 
    // If not (1 way), set the endDate to midnight of current day
    // Else set return date, with returnDate[0] to midnight of return day and returnDate[1] to midnight of next day
    if (returnDateStart === null || returnDateStart.toDateString() === outDateStart.toDateString()) {
      // 1 way trip, only show todays trips.
      outDateEnd = new Date(); 
      outDateEnd.setDate(outDateStart.getDate() + 1); 
      outDateEnd.setHours(0, 0, 0, 0); 
      // British summer time 
      outDateEnd.setMinutes(outDateEnd.getMinutes() - outDateEnd.getTimezoneOffset());

      outDateStart = outDateStart.toISOString();
      outDateEnd = outDateEnd.toISOString();
    } else {
      // 2 way trip, 
      // Out trip
      outDateEnd = new Date(); 
      outDateEnd.setDate(outDateStart.getDate() + 1); 
      outDateEnd.setHours(0, 0, 0, 0); 
      // British summer time 
      outDateEnd.setMinutes(outDateEnd.getMinutes() - outDateEnd.getTimezoneOffset());
      
      outDateStart = outDateStart.toISOString();
      outDateEnd = outDateEnd.toISOString();
      
      // The return trip
      returnDateEnd = new Date(); 
      returnDateEnd.setDate(returnDateStart.getDate() + 1); 
      returnDateEnd.setHours(0, 0, 0, 0); 
      // British summer time 
      returnDateEnd.setMinutes(returnDateEnd.getMinutes() - returnDateEnd.getTimezoneOffset()); 
      
      returnDateStart = returnDateStart.toISOString(); 
      returnDateEnd = returnDateEnd.toISOString();
    }

    bookingQuery();
  }

  const bookingQuery = async () => {
    dispatch(clearJourneys());

    // 1 way trip API call
    if (returnDateStart === null) {
      const result = await fetch(`https://api.ember.to/v1/quotes/?origin=${startLocation}&destination=${endLocation}&departure_date_from=${outDateStart}&arrival_date_to=${outDateEnd}`); 
      const data = await result.json(); 
      formatData(data, addOutJourney); 
      navigate('/quote');
    } else {
      // return trip API call
      const outTrip = await fetch(`https://api.ember.to/v1/quotes/?origin=${startLocation}&destination=${endLocation}&departure_date_from=${outDateStart}&arrival_date_to=${outDateEnd}`);
      const returnTrip = await fetch(`https://api.ember.to/v1/quotes/?origin=${endLocation}&destination=${startLocation}&departure_date_from=${returnDateStart}&arrival_date_to=${returnDateEnd}`);
      const outTripdata = await outTrip.json(); 
      const returnTripData = await returnTrip.json();
      formatData(outTripdata, addOutJourney);
      formatData(returnTripData, addReturnJourney);
      navigate('/quote');
    }    
  }

  const formatData = (data, journey) => {
    for (let i = 0; i < data.length; i++) {
      dispatch(journey({ 
        availability: {
          bicycle: data[i].availability.bicycle,
          seat: data[i].availability.seat,
          wheelchair: data[i].availability.wheelchair 
        },
        departure: new Date(data[i].legs[0].departure.scheduled), 
        arrival: new Date(data[i].legs[0].arrival.scheduled), 
        prices: {
          adult: data[i].prices.adult, 
          bicycle: data[i].prices.bicycle, 
          child: data[i].prices.child, 
          concession: data[i].prices.concession, 
          wheelchair: data[i].prices.wheelchair, 
          young_child: data[i].prices.young_child
        }
       }));
    }
  }

  return (
    <button disabled={!isValid} onClick={formatDates}>Search</button>
  )
}

export default Search