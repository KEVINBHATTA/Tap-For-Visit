import React from 'react'
import Avatar from "../components/Avatar";
import Post from "../components/Post";
import Location from "../components/Location";
import Feature from "../components/Feature";
import About from "../components/About";
import Contact from "../components/Contact";
import SaveContact from "../components/SaveContact";
import Edit from "../components/Edit-icon";
import './Profile.css';
import ProfileFooter from '../components/ProfileFooter';

function Profile() {
  return (
    <div>
    {/* //  for background image  */}
    <div className="body">
{/* edit section  */}
   <Edit/>
       
      {/* for Avatar */}
      <Avatar />
      {/* // for post section */}
      <center>
        <Post />

        {/* // for Profile Name */}
        <div className="Profile-Name">KEVIN BHATTA</div>
        {/* // for Working Company */}
        <div className="Company-Name"> Tap For Visit · NFC Solutions </div>

        {/* for location */}
        <Location />

        {/* for feature part */}
        <Feature />
        <hr className="horizonal-line" />

        {/* for about section */}
        <p className="Hint-text"> About</p>
        <About />

        {/* for contact section  */}
        <hr className="horizonal-line" />
        <p className="Hint-text"> Contact</p>
        <Contact/>

          {/* for Save Contact  */}
          <SaveContact/>


       <ProfileFooter/>
        
      </center>
    </div>
    </div>
  );
}





export default Profile