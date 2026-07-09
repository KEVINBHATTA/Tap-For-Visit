import React from 'react'
import { FaLocationDot } from "react-icons/fa6";

function Location({formData}) {
if (!formData?.showLocation) return null

  return (
    <div className='Location'>
       <FaLocationDot className='Location-icon'/><p id='location-text'>{formData?.location || "Location Not Specified"}</p>
    </div>
  )
}

export default Location