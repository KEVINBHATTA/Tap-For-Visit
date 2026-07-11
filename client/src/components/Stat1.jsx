import React from 'react'

function Feature({formData}) {
 if (!formData?.showStat) return null;

  return (
    <div className='container'>
    <div className='Box col-4' id='box-1'>
      <p className='Top-text'>{formData?.statValue1 || "500+"}</p>
      <p className='Bottom-text'>{formData?.statLabel1 || "CLIENTS"}</p>
    </div>

      <div className='Box col-4' id='box-2'>
      <p className='Top-text'>{formData?.statValue2 || "2026"}</p>
      <p className='Bottom-text'>{formData?.statLabel2 || "FOUNDED"}</p>
      </div>

      <div className='Box col-4' id='box-3'>
         <p className='Top-text'>{formData?.statValue3 || "NP"}</p>
      <p className='Bottom-text'>{formData?.statLabel3 || "BASED"}</p>
      </div>

   </div>
  )
}

export default Feature