import React from 'react'
import { useSelector } from 'react-redux';

// Date I need for bookingquery
// - Start location ID (Stop Area ID) []
// - End location ID (Stop Area ID) [] 
// - Out date (Example: 2022-04-28) [] (Formatting)
// - Return date (For single trips put the next day, for returns put whenever the return is) []
// - Adult tickets (At the moment) [X]

function Search() {
  const startLocation = useSelector((state) => state.startLocation.value); 
  const endLocation = useSelector((state) => state.endLocation.value);
  const outDate = useSelector((state) => state.outDate.value); 
  const returnDate = useSelector((state) => state.returnDate.value); 
  const ticketCount = useSelector((state) => state.adultCounter.value);

  const bookingQuery = async () => {
    

    //const result = await fetch('https://api.ember.to/v1/quotes/?origin=13&destination=42&departure_date_from=2022-04-29&arrival_date_to=2022-04-30'); 
    //const data = await result.json(); 

    console.log(startLocation);
    console.log(endLocation);    
    console.log(outDate);
    console.log(returnDate);
    console.log(ticketCount);
    //console.log(data);
  }
  
  const CheckLocation = () => {
    // Need search term for both start and end 
    // List of stops 
  }

  const formatDate = () => {
    // const today = new Date();
    // const yyyy = today.getFullYear();
    // let mm = today.getMonth() + 1; // Months start at 0!
    // let dd = today.getDate();

    // if (dd < 10) dd = '0' + dd;
    // if (mm < 10) mm = '0' + mm;

    // const today = dd + '/' + mm + '/' + yyyy;

    // document.getElementById('DATE').value = today;
  }

  return (
    <button onClick={bookingQuery}>Search</button>
  )
}

export default Search