import React from "react";
import { FaPhoneAlt, FaLinkedinIn } from "react-icons/fa";
import { CiCircleChevRight } from "react-icons/ci";
import { IoIosMail } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io5";
import { FaEarthAsia } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";

function Contact({ formData }) {
  return (
    <div className="c-section">
      <div className="Contact Box">
        <div className="contact-icon-bg Green ">
          <FaPhoneAlt id="contact-icon" />
        </div>
        <div className="w-55 ">
          <p id="Left"> {formData?.phone || "+977-XXXXXXXXXX"}</p>
        </div>
        <CiCircleChevRight id="contact-icon" />
      </div>

      <div className="Contact Box">
        <div className="contact-icon-bg Blue ">
          <IoIosMail id="contact-icon" />
        </div>
        <div className="w-55">
          <p id="Left">{formData?.email || "No email provided"}</p>
        </div>
        <CiCircleChevRight id="contact-icon" />
      </div>

      <a href={formData?.linkedin} className="text">
        <div className="Contact Box">
          <div className="contact-icon-bg Navy  ">
            <FaLinkedinIn id="contact-icon" />
          </div>
          <div className="w-55 Text-Section ">
            <p id="Left">LinkedIn Profile</p>
          </div>
          <CiCircleChevRight id="contact-icon" />
        </div>
      </a>

      <a href={formData?.instagram} className="text">
        <div className="Contact Box">
          <div className="contact-icon-bg Red ">
            <IoLogoInstagram id="contact-icon" />
          </div>
          <div className="w-55 ">
            <p id="Left">Instagram ID</p>
          </div>
          <CiCircleChevRight id="contact-icon" />
        </div>
      </a>

      <a href={formData?.website} className="text">
        <div className="Contact Box">
          <div className="contact-icon-bg Dirt ">
            <FaEarthAsia id="contact-icon" />
          </div>
          <div className="w-55">
            <p id="Left"> {formData?.website || "No Website Link"}</p>{" "}
          </div>
          <CiCircleChevRight id="contact-icon" />
        </div>
      </a>
    </div>
  );
}

export default Contact;
