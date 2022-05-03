import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addOutJourney, addReturnJourney, setBookingFound } from './slices/OutputSlice';

function Search() {
  const startLocation = useSelector((state) => state.inputData.startLocation); 
  const endLocation = useSelector((state) => state.inputData.endLocation);
  const startDate = useSelector((state) => state.inputData.startDate); 
  const endDate = useSelector((state) => state.inputData.endDate); 
  const tickets = useSelector((state) => state.inputData.tickets);
  const [isValid, setIsValid] = useState(true); 
  const [errMsg, setErrMsg] = useState(""); 
  const dispatch = useDispatch(); 

  let outDateStart = startDate;
  let outDateEnd = null; 
  let returnDateStart = endDate; 
  let returnDateEnd = null;

  const checkQuery = () => {
    formatDates(); 
    setIsValid(true);
    let locationErr = ""; 
    let dateErr = ""; 
    let ticketErr = ""; 
     
    let totalTickets = 0; 

    // Lets check the start and end locations aren't the same. 
    if (startLocation === 0 || endLocation === 0) { 
      locationErr = "Please enter a valid location."; 
    } else if (startLocation === endLocation) {
      locationErr = "Your start location and end location are the same.";
    }

    // Check the start and end dates 
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    today = today.toISOString();
    if (outDateStart < today) {
      dateErr = "Please enter a valid out date.";
    } else if (endDate != null && (endDate < today)) { 
      dateErr = "Please enter a valid return date.";
    } else if (endDate != null && (endDate < startDate)) {
      dateErr = "Your return date if before your out date."; 
    }

    // Check number of tickets 
    for (const key in tickets) {
      totalTickets += tickets[key];
    }
    if (totalTickets === 0) {
      ticketErr = "You must add at least 1 ticket."; 
    }

    if (locationErr === "" && dateErr === "" && ticketErr === "") {
      bookingQuery(); 
    } else {
      setIsValid(false); 
      setErrMsg(locationErr + dateErr + ticketErr);
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
  }

  const bookingQuery = async () => {
    console.log(outDateStart);
    // 1 way trip API call
    if (returnDateStart === null) {
      const result = await fetch(`https://api.ember.to/v1/quotes/?origin=${startLocation}&destination=${endLocation}&departure_date_from=${outDateStart}&arrival_date_to=${outDateEnd}`); 
      const data = await result.json(); 
      formatData(data, addOutJourney); 
      dispatch(setBookingFound(true));
    } else {
      // return trip API call
      const outTrip = await fetch(`https://api.ember.to/v1/quotes/?origin=${startLocation}&destination=${endLocation}&departure_date_from=${outDateStart}&arrival_date_to=${outDateEnd}`);
      const returnTrip = await fetch(`https://api.ember.to/v1/quotes/?origin=${endLocation}&destination=${startLocation}&departure_date_from=${returnDateStart}&arrival_date_to=${returnDateEnd}`);
      const outTripdata = await outTrip.json(); 
      const returnTripData = await returnTrip.json();
      formatData(outTripdata, addOutJourney);
      formatData(returnTripData, addReturnJourney);
      dispatch(setBookingFound(true));
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
    <>
    <button onClick={checkQuery}>Search</button>
    {
      isValid ? 
      null
    : 
      <div>{errMsg}</div> 
    }
    </>
  )
}

export default Search