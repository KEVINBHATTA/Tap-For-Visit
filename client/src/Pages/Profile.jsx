import React from "react";
import Avatar from "../components/Avatar";
import Post from "../components/Post";
import Location from "../components/Location";
import Feature from "../components/Stat1";
import About from "../components/About";
import Contact from "../components/Contact";
import SaveContact from "../components/SaveContact";
import Edit from "../components/Edit-icon";
import "./Profile.css";
import ProfileFooter from "../components/ProfileFooter";
import { useLocation } from "react-router-dom";

// 1. Notice we add { profileData } directly into the function arguments here!
function Profile({ profileData }) {
  const location = useLocation();

  // 2. Choose the data source cleanly: 
  // Priority 1: Prop from DB/State, Priority 2: Direct React Navigation State, Priority 3: Local Storage
  const formData =
    profileData ||
    location.state ||
    JSON.parse(localStorage.getItem("profileFormData")) ||
    {}; // Fallback to empty object if all else fails to prevent crashing

  console.log("Received User Data inside Profile component:", formData);

  // If data came from navigation state, save it locally for back-navigation buffers
  if (location.state) {
    localStorage.setItem("profileFormData", JSON.stringify(location.state));
  }

  return (
    <div>
      <div className="body">
        {/* edit section */}
        <Edit />

        {/* 3. Added standard optional chaining (?.) so undefined states never break the render tree */}
        <Avatar file={formData?.profileImage} />
        
        <center>
          <Post formData={formData} />

          {/* Profile Name */}
          <div className="Profile-Name">
            {formData?.fullName || "KEVIN BHATTA"}
          </div>
          
          {/* Working Company */}
          <div className="Company-Name">
            {formData?.company || "Loading Company ..."}
          </div>

          {/* Location */}
          <Location formData={formData} />

          {/* Feature part */}
          <Feature formData={formData} />
          <hr className="horizonal-line" />

          {/* About section */}
          <p className="Hint-text">About</p>
          <About formData={formData} />

          {/* Contact section */}
          <hr className="horizonal-line" />
          <p className="Hint-text">Contact</p>
          <Contact formData={formData} />

          {/* Save Contact */}
          <SaveContact formData={formData} />

          <ProfileFooter />
        </center>
      </div>
    </div>
  );
}

export default Profile;