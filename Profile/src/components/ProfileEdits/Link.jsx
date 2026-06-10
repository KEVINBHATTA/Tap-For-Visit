import React from "react";
import { FaPhoneAlt, FaLinkedinIn } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io5";
import { MdDeleteSweep } from "react-icons/md";
import { FaEarthAsia } from "react-icons/fa6";

function Link() {
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
          class="label2 form-control"
          id="form1"
          placeholder="ENTER YOUR PHONE NUMBER"
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
          class="label2 form-control"
          id="form1"
          placeholder="ENTER YOUR MAIL ID"
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
          class="label2 form-control"
          id="form1"
          placeholder="ENTER YOUR LINKEDIN URL"
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
          class="label2 form-control"
          id="form1"
          placeholder="ENTER YOUR INSTAGRAM URL"
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
          class="label2 form-control"
          id="form1"
          placeholder="ENTER YOUR WEBSITE URL"
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
