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

function Template() {
  const location = useLocation();
  const formData =
    location.state || JSON.parse(localStorage.getItem("profileFormData"));
  console.log("Received User Data:", formData);

  if (location.state) {
    localStorage.setItem("profileFormData", JSON.stringify(location.state));
  }

  // if (!formData) {
  //   return (
  //     <div
  //       className="d-flex justify-content-center align-items-center"
  //       style={{ height: "100vh", color: "#000" }}
  //     >
  //       <h5>No profile data found. Please navigate from the form.</h5>
  //       <Edit />
  //     </div>
  //   );
  // }

  return (
    <div className=" relative min-h-screen overflow-hidden">
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

      <div className="absolute inset-0 z-10 bg-[#050510]/10" />

      <div className="relative z-20 ProfileTempContentCreator">
        <Edit />
        <Avatar />
        <div className="Badge-Section">
          <div className="Badge ">CONTENT CREATOR</div>
        </div>
        <div className="Name">KEVIN BHATTA</div>
        <center>
          <Location formData={formData} />
          <div className="Company-Name">{formData?.company}</div>
        </center>

        <StatDisplay/>
    <p className='Hint-Text'>ABOUT</p>
<center>
   <About/>
</center>
{/* <SocialBank/> */}


<p className="Hint-Text">CONTACT</p>
<Contact/>


<p className="Hint-Text">SOCIALS</p>

<Socials formData={formData}/>


{/* for book me and contact me  */}
<BookContact/>

<ProfileFooter/>



      </div>
    </div>
  );
}

export default Template;
