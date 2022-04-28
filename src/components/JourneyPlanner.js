import React from 'react';

import Route from './Route';
import TravelDate from './TravelDate';
import Passengers from './Passengers';
import Search from './Search';

function JourneyPlanner() {
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