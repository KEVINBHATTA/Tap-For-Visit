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
import { useLocation } from "react-router-dom";

function Profile() {
    const location = useLocation();
    // const formData = location.state;
    const formData = location.state || JSON.parse(localStorage.getItem("profileFormData"));

    console.log("Received User Data:", formData);

   if (location.state) {
  localStorage.setItem("profileFormData", JSON.stringify(location.state));
  }


    if (!formData) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", color: "#000" }}>
                <h5>No profile data found. Please navigate from the form.</h5>
                <Edit/>
            </div>
        );
    }

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
        <div className="Profile-Name">{formData?.fullName || "KEVIN BHATTA"}</div>
        {/* // for Working Company */}
        <div className="Company-Name">{formData?.company || "Loading Company ..."} </div>

        {/* for location */}
        <Location  formData={formData}/>

        {/* for feature part */}
        <Feature/>
        <hr className="horizonal-line" />

        {/* for about section */}
        <p className="Hint-text"> About</p>
        <About formData={formData}/>

        {/* for contact section  */}
        <hr className="horizonal-line" />
        <p className="Hint-text"> Contact</p>
        <Contact formData={formData} />

          {/* for Save Contact  */}
          <SaveContact/>


       <ProfileFooter/>
        
      </center>
    </div>
    </div>
  );
}





export default Profile