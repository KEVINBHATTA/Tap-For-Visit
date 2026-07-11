import React from 'react'
import { FaQuoteLeft } from 'react-icons/fa'

function About({ formData }) {
  return (
    <div className="About-Section">

      <div className="Bio-Section-2">
        {formData?.bio || "Founder of Nepal's first NFC digital business card platform — helping professionals connect smarter, one tap at a time."}
      </div>
      
      <hr/>
      
      
      <div className="Signature-Section-2">
        <FaQuoteLeft color="purple" /> 
        <p id="Sign-text">
          {formData?.quote || "The future of networking is a single tap."}
        </p>
      </div>
    </div>
  )
}

export default About