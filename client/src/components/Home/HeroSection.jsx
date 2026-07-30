import React from 'react';


export default function HeroSection() {
  return (
    <div className="HeroContainer">
      {/* Graph Grid Background */}
      <div className="GridBackground" />

      {/* Hero Content */}
      <div className="HeroContent">
    <div className="Section1 Section">
    <h1 className="HeroHeading">
            One Tap <br />
          <span className="HighlightText">Hands Over Everything</span>
          </h1>

          <p className="HeroDescription">
            Your card carries an NFC chip and a printed QR side by side. One of
            the two always works — full signal, dead zone, or a phone that’s
            never heard of NFC.
          </p>

          <div className="ButtonGroup">
            <button className="Btn PrimaryBtn">Order Your Card</button>
            <button className="Btn SecondaryBtn">See My Profile</button>
          </div>

          <p className="PricingTag">
            Starting at just <strong>Rs 699</strong> with free profile page included
          </p>
        </div>

        {/* Right Section: Card Visual Showcase */}
        <div className="Section2 Section">
          <div className="CardBorder">
            <div className="GlowEffect" />
            <img
              className="Card"
              src="/HeroSectionPhoto.png"
              alt="Tap for Visit Digital Card Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}