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
    },
    instagram: {
      label: "INSTAGRAM URL",
      icon: <IoLogoInstagram className="IconSize" size={34} />,
      color: "Gradient-Red",
    },
    youtube: {
      label: "YOUTUBE URL",
      icon: <FaYoutube className="IconSize" size={32} />,
      color: "DarkRed",
    },
    facebook: {
      label: "FACEBOOK URL",
      icon: <FaFacebookF className="IconSize" size={28} />,
      color: "RoyalBlue",
    },
    tiktok: {
      label: "TIKTOK URL",
      icon: <FaTiktok className="IconSize" size={27} />,
      color: "Black",
    },
    x: {
      label: "X TWITTER URL",
      icon: <FaXTwitter className="IconSize" size={26} />,
      color: "MatteBlack",
    },
    website: {
      label: "WEBSITE URL",
      icon: <FaEarthAsia className="IconSize" />,
      color: "Dirt",
    },
  };

  const keys = Object.keys(ALL_PLATFORMS);


  const getPlatformLink = (key) => {
    return formData?.[key] || formData?.socials?.[key];
  };

  const activePlatforms = keys.filter((key) => {
    const link = getPlatformLink(key);
    return link && link.trim() !== "";
  });

  // If the user hasn't filled out any links, return null cleanly
  if (activePlatforms.length === 0) return null;

  return (
    <div className='Social-Section Glass-Morphism p-4 '>
      <div className="icon-bank-grid">
        {activePlatforms.map((key) => {
          const item = ALL_PLATFORMS[key];
          const rawLink = getPlatformLink(key);
          
          // Force standard URL routing links to include proper transfer protocol strings if omitted
          const userLink = rawLink.startsWith("http") ? rawLink : `https://${rawLink}`;

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
                {key === 'x' ? 'X' : key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
} 

export default Socials;