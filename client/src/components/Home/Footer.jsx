import React from 'react';
import { 
  FaPhoneAlt, 
  FaWhatsapp, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebookF, 
  FaInstagram, 
  FaTiktok 
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="FooterSection">
      <div className="FooterContainer">
        
        {/* Top Grid Area */}
        <div className="FooterGrid">
          
          {/* Column 1: Brand Info */}
          <div className="FooterCol BrandCol">
            <h3 className="BrandLogo">
              TAP FOR<span className="HighlightText"> VISIT</span>
            </h3>
            <p className="BrandDescription">
              Elevate your networking with smart NFC digital business cards. 
              One tap connects you with prospective clients instantly.
            </p>
            {/* Social Media Links */}
            <div className="SocialIcons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation Links */}
          <div className="FooterCol">
            <h4 className="ColTitle">Quick Links</h4>
            <ul className="FooterLinks">
              <li><a href="#home">Home</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#login" className="DashboardLink">Login / Dashboard</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="FooterCol ContactCol">
            <h4 className="ColTitle">Get in Touch</h4>
            <ul className="ContactList">
              <li>
                <FaEnvelope className="ContactIcon" />
                <a href="mailto:mail@tapforvisit.com">mail@tapforvisit.com</a>
              </li>
              <li>
                <FaPhoneAlt className="ContactIcon" />
                <a href="tel:9765637618">+977 9765637618</a>
              </li>
              <li>
                <FaWhatsapp className="ContactIcon WhatsappIcon" />
                <a href="https://wa.me/9779765637618" target="_blank" rel="noreferrer">
                  WhatsApp Support
                </a>
              </li>
              <li>
                <FaMapMarkerAlt className="ContactIcon" />
                <span>Khairahani-6, Chitwan, Nepal</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider Line */}
        <div className="FooterDivider" />

        {/* Bottom Copyright & Legal Links */}
        <div className="FooterBottom">
          <p className="CopyrightText">
            © {new Date().getFullYear()} Tap For Visit. All rights reserved.
          </p>
          <div className="LegalLinks">
            <a href="#privacy">Privacy Policy</a>
            <span className="DotSeparator">•</span>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}