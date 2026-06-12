import React from "react";
import { FaPhoneAlt, FaLinkedinIn } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io5";
import { MdDeleteSweep } from "react-icons/md";
import { FaEarthAsia } from "react-icons/fa6";

function Link({formData , handleOnChange }) {
  return (
    <div>
      <p className="Text">LINKS</p>

      {/* for phone  */}
      <div className="Contact Box">
        <div className="contacticon-bg Green">
          <FaPhoneAlt id="contacticon" />
        </div>
        <input
          type="tel"
          className="label2 form-control"
          id="form1"
          placeholder="ENTER YOUR PHONE NUMBER"
           value={formData?.phone}
         onChange={(e) => handleOnChange('phone',e.target.value)}
          name="phone"
        />
        <MdDeleteSweep id="delete-icon" />
      </div>

      {/* for mail */}
      <div className="Contact Box">
        <div className="contacticon-bg Blue">
          <IoIosMail id="contacticon" />
        </div>
        <input
          type="Email"
          className="label2 form-control"
          id="form1"
          placeholder="ENTER YOUR MAIL ID"
           value={formData?.email}
         onChange={(e) => handleOnChange('email',e.target.value)}
          name="email"
        />
        <MdDeleteSweep id="delete-icon" />
      </div>

      {/* for linkedin  */}

      <div className="Contact Box">
        <div className="contacticon-bg Navy">
          <FaLinkedinIn id="contacticon" />
        </div>
        <input
          type="url"
          className="label2 form-control"
          id="form1"
          placeholder="ENTER YOUR LINKEDIN URL"
           value={formData?.linkedin}
         onChange={(e) => handleOnChange('linkedin',e.target.value)}
          name="linkedin"
        />
        <MdDeleteSweep id="delete-icon" />
      </div>

      {/* for instagram   */}
      <div className="Contact Box">
        <div className="contacticon-bg Red">
          <IoLogoInstagram id="contacticon" />
        </div>
        <input
          type="url"
          className="label2 form-control"
          id="form1"
          placeholder="ENTER YOUR INSTAGRAM URL"
           value={formData?.instagram}
         onChange={(e) => handleOnChange('instagram',e.target.value)}
          name="instagram"
        />
        <MdDeleteSweep id="delete-icon" />
      </div>

      {/*for website */}

      <div className="Contact Box">
        <div className="contacticon-bg Dirt">
          <FaEarthAsia id="contacticon" />
        </div>
        <input
          type="url"
          className="label2 form-control"
          id="form1"
          placeholder="ENTER YOUR WEBSITE URL"
           value={formData?.website}
         onChange={(e) => handleOnChange('website',e.target.value)}
          name="website"
        />
        <MdDeleteSweep id="delete-icon" />
      </div>

      {/* for add more  */}
      <center>
        <div className="nlink-section">
          <p id="addlink"> + Add new link </p>
        </div>
      </center>
    </div>
  );
}

export default Link;
