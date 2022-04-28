import React, { useState } from 'react'

function Passengers() {
  const [isOpen, setIsOpen] = useState(false);
  const [adult, setAdult] = useState(1); 
  const [concession, setConcession] = useState(0);
  const [child, setChild] = useState(0); 
  const [youngChild, setYoungChild] = useState(0);

  return (
    <div className='passengers_container'>
      <span>
        People, Bikes &amp; Wheelchairs
      </span>
      <br />
      <button>1 Adult (no concessions)</button>

      <div className='passengers_menu'>
        <span>Passengers</span>
        <div>

        </div>
      </div>
    </div>
  )
}

export default Passengers