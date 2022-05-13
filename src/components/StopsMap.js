import React, { useState } from 'react';
import Map, { Marker } from 'react-map-gl'; 
import { useSelector } from 'react-redux'

import Pin from '../assets/map-pin.svg';

function StopsMap() {
  const stops = useSelector((state) => state.inputData.stops);
  const [viewport, setViewport] = useState({
    initialViewState: {
      longitude: -3.17316,
      latitude: 56.20514,
      zoom: 8, 
    },
    style: {
      width: 600, 
      height: 400,
    },
    mapStyle: "mapbox://styles/mapbox/streets-v9"
  })
  
  return (
    <div className='map_container'>
      <Map
        {...viewport}
        
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >  
        {stops.map(stop => (
          <Marker 
            key={stop.id} 
            latitude={stop.locationData.latitude} 
            longitude={stop.locationData.longitude} 
            anchor="bottom"
          >
            <img className='map_icon' src={Pin} alt='stop icon' /> 
          </Marker>
        ))}
      </Map>
    </div>
  )
}

export default StopsMap