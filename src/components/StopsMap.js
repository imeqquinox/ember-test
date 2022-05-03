import React, { useState } from 'react';
import Map from 'react-map-gl'; 

function StopsMap() {
  const [viewport, setViewport] = useState({
    initialViewState: {
      longitude: -3.17316,
      latitude: 56.19514,
      zoom: 8, 
    },
    style: {
      width: 600, 
      height: 400,
    },
    mapStyle: "mapbox://styles/mapbox/streets-v9"
  })
  
  return (
    <Map
      {...viewport}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    />
  )
}

export default StopsMap