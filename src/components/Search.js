import React, { useState } from 'react'
import { useSelector } from 'react-redux';

function Search() {
  const startLocation = useSelector((state) => state.inputData.startLocation); 
  const endLocation = useSelector((state) => state.inputData.endLocation);
  const startDate = useSelector((state) => state.inputData.startDate); 
  const endDate = useSelector((state) => state.inputData.endDate); 
  const tickets = useSelector((state) => state.inputData.tickets);
  const [isValid, setIsValid] = useState(true); 
  const [errMsg, setErrMsg] = useState(""); 

  let outDate = startDate;
  let returnDate;

  const checkQuery = () => {
    formatDates(); 
    setIsValid(true);
    let locationErr = ""; 
    let dateErr = ""; 
    let ticketErr = ""; 
    let now = new Date(); 
    let totalTickets = 0; 

    // Lets check the start and end locations aren't the same. 
    if (startLocation === 0 || endLocation === 0) { 
      locationErr = "Please enter a valid location."; 
    } else if (startLocation === endLocation) {
      locationErr = "Your start location and end location are the same.";
    }

    // Check the start and end dates 
    now = now.toISOString();
    if (outDate < now) {
      dateErr = "Please enter a valid out date.";
    } else if (endDate != null && returnDate < now) { 
      dateErr = "Please enter a valid return date.";
    } else if (endDate != null && returnDate < outDate) {
      dateErr = "Your out date if before your return date."; 
    }

    // Check number of tickets 
    for (const key in tickets) {
      totalTickets += tickets[key];
    }
    if (totalTickets === 0) {
      ticketErr = "You must add at least 1 ticket."; 
    }

    console.log(outDate); 
    console.log(returnDate);
    if (locationErr === "" && dateErr === "" && ticketErr === "") {
      bookingQuery(); 
    } else {
      setIsValid(false); 
      setErrMsg(locationErr + dateErr + ticketErr);
    }
  }

  const formatDates = () => {
    // If no return date just set to midnight of the next day to show all day trips
    if (endDate == null) {
      returnDate = new Date();
      returnDate.setDate(startDate.getDate() + 1);
      returnDate.setHours(0, 0, 0, 0);
      returnDate = returnDate.toISOString();
    } else {
      returnDate = endDate.toISOString();
    }

    // Check if the out is today or not 
    let temp = new Date(); 
    if (startDate.getDate() === temp.getDate()) {
      outDate = startDate; 
      outDate.setHours(temp.getHours(), temp.getMinutes()); 
      outDate = outDate.toISOString();
    } else {
      outDate = startDate; 
      outDate.setHours(0, 0, 0, 0);
      outDate = outDate.toISOString(); 
    }
  }

  const bookingQuery = async () => {
    // API call
    const result = await fetch(`https://api.ember.to/v1/quotes/?origin=${startLocation}&destination=${endLocation}&departure_date_from=${outDate}&arrival_date_to=${returnDate}`); 
    const data = await result.json(); 

    formatData(); 
    console.log(data);
  }

  const formatData = () => {

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