import React from 'react'
import profilePic from '../assets/Resources/Profile Picture.jpg'

function Avatar() {
  return (
   <div className='Avatar-box'>

    <img src={profilePic} className="Avatar rounded-full " alt='Profile' />
   </div>
  )
}

export default Avatar
