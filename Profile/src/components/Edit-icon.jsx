import React from 'react'
import { FaPencil } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function Edit() {
  return (
    <div className='Edit-section'>
       <div className='Edit'>
        <Link className='text-black' to="./ProfileEdits">
        <button id='Edit-btn'><FaPencil id='Edit-icon'/></button>
        </Link>
      

    </div>
    </div>
   
  )
}

export default Edit