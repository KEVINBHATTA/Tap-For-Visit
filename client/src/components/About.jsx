import React from 'react'
import { IoLocationSharp } from "react-icons/io5";

function About({formData}) {
  return (
    <div className='About-section Box'>
      <p className='Bio'>
        {formData?.bio ||  "Founder of Nepal's first NFC digital business card platform — helping professionals connect smarter, one tap at a time." }
      </p>
       
       <p className='Quotes'>
       {formData?.quote || "The future of networking is a single tap."}
       </p>
    </div>
  )
}

export default About