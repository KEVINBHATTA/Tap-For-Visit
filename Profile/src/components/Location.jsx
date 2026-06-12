import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";

function Location({formData}) {

  return (
    <div className='Location'>
       <FaLocationDot className='Location-icon'/><p id='location-text'>{formData?.location || "Location Not Specified"}</p>
    </div>
  )
}

export default Location