import React from "react";
import { FaPhoneAlt, FaLinkedinIn } from "react-icons/fa";
import { CiCircleChevRight } from "react-icons/ci";
import { IoIosMail } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io5";
import { FaEarthAsia } from "react-icons/fa6";

function Contact() {
  return (
    <div className="c-section">
      <div className="Contact Box">
        <div className="contact-icon-bg Green ">
          <FaPhoneAlt id="contact-icon" />
        </div>
        <div className="w-40 text-center">+977-9765637618 </div>
        <CiCircleChevRight id="contact-icon" />
      </div>

      <div className="Contact Box">
        <div className="contact-icon-bg Blue ">
          <IoIosMail id="contact-icon" />
        </div>
        <div className="w-40">ceo@tapforvisit.com</div>
        <CiCircleChevRight id="contact-icon" />
      </div>

      <div className="Contact Box">
        <div className="contact-icon-bg Navy  ">
          <FaLinkedinIn id="contact-icon" />
        </div>
        <div className="w-40 text-center ">LinkedIn Profile</div>
        <CiCircleChevRight id="contact-icon" />
      </div>

      <div className="Contact Box">
        <div className="contact-icon-bg Red ">
          <IoLogoInstagram id="contact-icon" />
        </div>
        <div className="w-40 ">
          <a href="https://www.instagram.com/bhatta_kevin/" className="text">
            @bhatta_kevin
          </a>
        </div>
        <CiCircleChevRight id="contact-icon" />
      </div>

      <div className="Contact Box">
        <div className="contact-icon-bg Dirt ">
          <FaEarthAsia id="contact-icon" />
        </div>
        <div className="w-40">
          <a
            href="https://kevinbhatta.com.np"
            className="text no-underline hover:no-underline"
          >
            tapforvisit.com
          </a>
        </div>
        <CiCircleChevRight id="contact-icon" />
      </div>
    </div>
  );
}

export default Contact;
