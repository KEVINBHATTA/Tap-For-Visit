import React from 'react';
import { FaLinkedinIn, FaYoutube, FaFacebookF, FaTiktok, FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { FaEarthAsia } from "react-icons/fa6";

function Socials({ formData }) {
  const ALL_PLATFORMS = {
    linkedin: {
      label: "LINKEDIN URL",
      icon: <FaLinkedinIn className="IconSize" />,
      color: "Navy",
      type: "url",
    },
    instagram: {
      label: "INSTAGRAM URL",
      icon: <IoLogoInstagram className="IconSize" size={34} />,
      color: "Gradient-Red",
      type: "url",
    },
    youtube: {
      label: "YOUTUBE URL",
      icon: <FaYoutube className="IconSize" size={32} />,
      color: "DarkRed",
      type: "url",
    },
    facebook: {
      label: "FACEBOOK URL",
      icon: <FaFacebookF className="IconSize" size={28} />,
      color: "RoyalBlue",
      type: "url",
    },
    tiktok: {
      label: "TIKTOK URL",
      icon: <FaTiktok className="IconSize" size={27} />,
      color: "Black",
      type: "url",
    },
    x: {
      label: "X TWITTER URL",
      icon: <FaXTwitter className="IconSize" size={26} />,
      color: "MatteBlack",
      type: "url",
    },
    website: {
      label: "WEBSITE URL",
      icon: <FaEarthAsia className="IconSize" />,
      color: "Dirt",
      type: "url",
    },
  };

  const keys = Object.keys(ALL_PLATFORMS);
        

  const activePlatforms = keys.filter(
    (key) => formData?.[key] && formData[key].trim() !== ""
  );

  // If the user hasn't filled out any links, render nothing or a subtle message
  if (activePlatforms.length === 0) return null;

  return (
    <div className='Social-Section Glass-Morphism p-4 '>
      <div className="icon-bank-grid">
    
        {activePlatforms.map((key) => {
          const item = ALL_PLATFORMS[key];
          const userLink = formData[key];

          return (
            <a
              key={key}
              href={userLink}
              target="_blank"
              rel="noopener noreferrer"
              className="Icon-bank hidden-url-link"
              title={item.label}
            >
              <div className={`contacticon-bg ${item.color} small-node`}>
                {item.icon}
              </div>
              <span className="text-white">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
} 

export default Socials;