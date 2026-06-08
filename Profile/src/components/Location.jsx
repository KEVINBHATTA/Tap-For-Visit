import React from 'react'
import { FaLocationDot } from "react-icons/fa6";

function Location() {
  return (
    <div className='Location'>
       <FaLocationDot className='Location-icon'/><p id='location-text'>Chitwan,Nepal</p>
    </div>
  )
}

export default Location