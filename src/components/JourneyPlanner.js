import React from 'react';

import Route from './Route';
import TravelDate from './TravelDate';
import Passengers from './Passengers';

function JourneyPlanner() {
  return (
    <div className='planner_container'>
      <Route />
      <br />
      <TravelDate />
      <br />
      {/* <Passengers /> */}
    </div>
  )
}

export default JourneyPlanner