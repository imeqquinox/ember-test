import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import EndLocationSlice from './slices/EndLocationSlice';

// Date I need for bookingquery
// - Start location ID (Stop Area ID) [x]
// - End location ID (Stop Area ID) [x] 
// - Out date (Example: 2022-04-28) [] (Formatting)
// - Return date (For single trips put the next day, for returns put whenever the return is) []
// - Adult tickets (At the moment) [X]

function Search({ startLocation, endLocation, startDate, endDate, setQuoteData }) {
  // const startLocation = useSelector((state) => state.startLocation.value); 
  // const endLocation = useSelector((state) => state.endLocation.value);
  // const outDate = useSelector((state) => state.outDate.value); 
  // const returnDate = useSelector((state) => state.returnDate.value); 
  // const ticketCount = useSelector((state) => state.adultCounter.value);

  const bookingQuery = async () => {
    if (endDate == null) {
      endDate = new Date();
      endDate.setDate(startDate.getDate() + 1);
      endDate.setHours(0, 0, 0, 0);
      endDate = endDate.toISOString();
    } else {
      endDate = endDate.toISOString(); 
    }

    startDate = startDate.toISOString();

    const result = await fetch(`https://api.ember.to/v1/quotes/?origin=${startLocation}&destination=${endLocation}&departure_date_from=${startDate}&arrival_date_to=${endDate}`); 
    const data = await result.json(); 

    // console.log(startDate); 
    // console.log(endDate);
    //console.log(data);
    setQuoteData(data);
  }

  return (
    <button onClick={bookingQuery}>Search</button>
  )
}

export default Search