import React, { useState } from "react";
import { FaPhoneAlt, FaLinkedinIn } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io5";
import { MdDeleteSweep } from "react-icons/md";
import { FaEarthAsia, FaYoutube, FaFacebookF, FaTiktok, FaXTwitter} from "react-icons/fa6";

function Link({ formData, handleOnChange }) {
  const ALL_PLATFORMS = {
    phone: {
      label: "PHONE NUMBER",
      icon: <FaPhoneAlt className="IconSize" size={24}  />,
      color: "Green",
      type: "tel",
    },
    email: {
      label: "MAIL ID",
      icon: <IoIosMail className="IconSize"  size={27} />,
      color: "Blue",
      type: "email",
    },
    linkedin: {
      label: "LINKEDIN URL",
      icon: <FaLinkedinIn className="IconSize" />,
      color: "Navy",
      type: "url",
    },
    instagram: {
      label: "INSTAGRAM URL",
      icon: <IoLogoInstagram className="IconSize" />,
      color: "Red",
      type: "url",
    },
    youtube: {
    label: "YOUTUBE URL",
    icon: <FaYoutube className="IconSize" size={24} />,
    color: "DarkRed",
    type: "url",
  },
  facebook: {
    label: "FACEBOOK URL",
    icon: <FaFacebookF className="IconSize" size={24} />,
    color: "RoyalBlue",
    type: "url",
  },
  tiktok: {
    label: "TIKTOK URL",
    icon: <FaTiktok className="IconSize" size={23} />,
    color: "Black",
    type: "url",
  },
  x: {
    label: "X TWITTER URL",
    icon: <FaXTwitter className="IconSize" size={22} />,
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

  const [visibleFields, setVisibleFields] = useState(() => {
    const keys = Object.keys(ALL_PLATFORMS);
    const initiallyActive = keys.filter(
      (key) => formData?.[key] && formData[key] !== "",
    );
    return initiallyActive.length > 0 ? initiallyActive : ["phone", "email"];
  });

  const [showIconBank, setShowIconBank] = useState(false);

  const handleDeleteField = (fieldKey) => {
    setVisibleFields((prev) => prev.filter((item) => item !== fieldKey));
    handleOnChange(fieldKey, "");
  };

  const handleAddSection = (fieldKey) => {
    if (!visibleFields.includes(fieldKey)) {
      setVisibleFields((prev) => [...prev, fieldKey]);
    }
     setShowIconBank(false);
  };

  const hiddenPlatforms = Object.keys(ALL_PLATFORMS).filter(
    (key) => !visibleFields.includes(key),
  );

  return (
    <div className="links-master-wrapper">
      <p className="Text">LINKS</p>

      {visibleFields.map((fieldKey) => {
        const platform = ALL_PLATFORMS[fieldKey];
        if (!platform) return null;

        return (
          <div className="Contact Box animate-row" key={fieldKey}>
            <div className={`contacticon-bg ${platform.color}`}>
              {platform.icon}
            </div>
            <input
              type={platform.type}
              className="label2 form-control"
              id="form1"
              placeholder={`ENTER YOUR ${platform.label}`}
              value={formData?.[fieldKey]}
              onChange={(e) => handleOnChange(fieldKey, e.target.value)}
              name={fieldKey}
            />

            <MdDeleteSweep
              id="delete-icon"
              className="delete-icon-btn"
              onClick={() => handleDeleteField(fieldKey)}
              title={`Clear ${platform.label}`}
            />
          </div>
        );
      })}

      <div className="d-flex flex-column align-items-center w-100 mt-3">
        {hiddenPlatforms.length > 0 ? (
          <div
            className="nlink-section"
            onClick={() => setShowIconBank(!showIconBank)}
          >
            <p id="addlink" style={{ cursor: "pointer", margin: 0 }}>
              {showIconBank ? "✕ Close Menu" : "+ Add new link"}
            </p>
          </div>
        ) : (
          <p className="text-muted small">All link sections added!</p>
        )}

        {/*  Floating Drawer Icon Bank */}
        {showIconBank && (
          <div className="Icon-bank-drawer">
            <p className="icon-bank-title">Select a link style to display:</p>
            <div className="icon-bank-grid">
              {hiddenPlatforms.map((key) => {
                const item = ALL_PLATFORMS[key];
                return (
                  <button
                    key={key}
                    className="Icon-bank"
                    onClick={() => handleAddSection(key)}
                    title={`Add ${key}`}
                  >
                    <div className={`contacticon-bg  ${item.color} small-node`}>
                      {item.icon}
                    </div>
                    <span className="text-white">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Link;
