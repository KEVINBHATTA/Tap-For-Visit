import React from "react";
import { useLocation } from "react-router-dom";
import Edit from "../components/Edit-icon";
import Avatar from "../components/Template2/Avatar";
import "./Template2.css";
import Location from "../components/Location";
import StatDisplay from "../components/Template2/StatDisplay";
import About from "../components/Template2/About";
import Contact from "../components/Template2/Contact";
import BookContact from "../components/Template2/BookContact";
import ProfileFooter from "../components/ProfileFooter";
import Socials from "../components/Template2/Socials";

function Template({ profileData }) {
  const location = useLocation();
  const formData =
    profileData ||
    location.state ||
    JSON.parse(localStorage.getItem("profileFormData")) ||
    {};

  if (location.state) {
    localStorage.setItem("profileFormData", JSON.stringify(location.state));
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video Layer */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.7 }}
        autoPlay
        loop
        muted
        playsInline // critical for iOS Safari
        preload="auto"
        poster="https://i.pinimg.com/736x/d2/d3/c2/d2d3c274ce6c8e397359cd7633efd736.jpg"
      >
        <source
          src="https://res.cloudinary.com/profilepicture/video/upload/v1781749170/ContentCreatorBG_ck19ye.mp4"
          type="video/mp4"
        />
      </video>

      {/* Backdrop overlay glass skin filter */}
      <div className="absolute inset-0 z-10 bg-[#050510]/10" />

      {/* Content Container Layer */}
      <div className="relative z-20 ProfileTempContentCreator">
        <Edit />
        
        {/* 🟢 Added data bindings to sub-components */}
        <Avatar file={formData?.profileImage} />
        
        <div className="Badge-Section">
          <div className="Badge">CONTENT CREATOR</div>
        </div>
        
        {/* Fallbacks ensure it prints clean mock words instead of an empty layout box */}
        <div className="Name">{formData?.fullName || "KEVIN BHATTA"}</div>
        
        <center>
          <Location formData={formData} />
          <div className="Company-Name">{formData?.company || "Independent Creator"}</div>
        </center>

        <StatDisplay formData={formData} />
        
        <p className='Hint-Text'>ABOUT</p>
        <center>
          <About formData={formData} />
        </center>

        <p className="Hint-Text">CONTACT</p>
        <Contact formData={formData} />

        <p className="Hint-Text">SOCIALS</p>
        <Socials formData={formData} />

        {/* Action Button layout components */}
        <BookContact formData={formData} />

        <ProfileFooter />
      </div>
    </div>
  );
}

export default Template;