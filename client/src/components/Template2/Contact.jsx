import React from "react";
import { FaPhoneAlt, FaBriefcase } from "react-icons/fa";
import { CiCircleChevRight } from "react-icons/ci";
import { IoIosMail } from "react-icons/io";

function Contact({ formData }) {
  
  const rawUrl = formData?.url || "";
  const portfolioUrl = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;

  return (
    <div className="Contact-Temp">
      <center>
      
        {formData?.phone && (
          <a href={`tel:${formData.phone}`} className="contact-link-wrapper" style={{ textDecoration: "none" }}>
            <div className="Contact Glass-Morphism">
              <div className="contact-icon-bg Green">
                <FaPhoneAlt id="contact-icon" size={24} />
              </div>
              <div className="w-55">
                <p id="Left-Temp2">{formData.phone}</p>
              </div>
              <CiCircleChevRight id="contact-icon-temp2" size={25} color="black" />
            </div>
          </a>
        )}

      
        {formData?.email && (
          <a href={`mailto:${formData.email}`} className="contact-link-wrapper" style={{ textDecoration: "none" }}>
            <div className="Contact Glass-Morphism">
              <div className="contact-icon-bg Blue">
                <IoIosMail id="contact-icon" size={28} />
              </div>
              <div className="w-55">
                <p id="Left-Temp2">{formData.email}</p>
              </div>
              <CiCircleChevRight id="contact-icon-temp2" size={25} color="black" />
            </div>
          </a>
        )}

        
        {rawUrl && (
          <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" className="contact-link-wrapper" style={{ textDecoration: "none" }}>
            <div className="Contact Glass-Morphism">
              <div className="contact-icon-bg Red">
                <FaBriefcase id="contact-icon" size={24} />
              </div>
              <div className="w-55">
                <p id="Left-Temp2">My Portfolio</p>
              </div>
              <CiCircleChevRight id="contact-icon-temp2" size={25} color="black" />
            </div>
          </a>
        )}
      </center>
    </div>
  );
}

export default Contact;