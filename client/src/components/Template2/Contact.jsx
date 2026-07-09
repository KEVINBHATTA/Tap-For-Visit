import React from "react";
import { FaPhoneAlt, FaLinkedinIn } from "react-icons/fa";
import { CiCircleChevRight } from "react-icons/ci";
import { IoIosMail } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io5";
import { FaEarthAsia } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { FaBriefcase } from "react-icons/fa";
function Contact() {
  return (
    <div className="Contact-Temp">
      <center>
        <div className="Contact Glass-Morphism">
          <div className="contact-icon-bg Green ">
            <FaPhoneAlt id="contact-icon" size={24} />
          </div>
          <div className="w-55 ">
            <p id="Left-Temp2"> +977-XXXXXXXXXX </p>
          </div>
          <CiCircleChevRight id="contact-icon-temp2" size={25} color="black" />
        </div>

        <div className="Contact Glass-Morphism">
          <div className="contact-icon-bg Blue ">
            <IoIosMail id="contact-icon" size={28} />
          </div>
          <div className="w-55 ">
            <p id="Left-Temp2"> kevinbhatta2024@gmail.com </p>
          </div>
          <CiCircleChevRight id="contact-icon-temp2" size={25} color="black" />
        </div>

        <div className="Contact Glass-Morphism">
          <div className="contact-icon-bg Red ">
            <FaBriefcase id="contact-icon" size={24} />
          </div>
          <div className="w-55 ">
            <p id="Left-Temp2"> My PortFolio </p>
          </div>
          <CiCircleChevRight id="contact-icon-temp2" size={25} color="black" />
        </div>
      </center>
    </div>
  );
}

export default Contact;
