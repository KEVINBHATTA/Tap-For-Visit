import React from 'react';

export default function ProfilePreview() {
  return (
    <section className="ProfileSection">
      <div className="ProfileContainer">
        
        {/* LEFT COLUMN: Smartphone Mockup Frame */}
        <div className="PhoneShowcase">
          {/* Ambient Glow Aura behind the phone */}
          <div className="PhoneGlow" />
          
          {/* Hardware Glass Phone Frame */}
          <div className="PhoneFrame">
            <div className="DynamicIsland" />
            <div className="ScreenContainer">
              <img 
                src="/profile.jpg" 
                alt="Live NFC Profile Preview" 
                className="ProfileImage"
              />
            </div>
            <div className="HomeIndicator" />
          </div>
        </div>

        {/* RIGHT COLUMN: Content & Description */}
        <div className="ProfileContent">
        

          <h2 className="ProfileHeading">
            A real profile template, <br />
            <span className="HighlightText">built from your dashboard.</span>
          </h2>

          <p className="ProfileDescription">
            Dr. Sharma hands the card to a patient at checkout. They tap it 
             on their mobile, where a profile shown, and then click on save her clinic's number, and book 
            their next visit on WhatsApp before they've left the building. 
            She can update the page herself, anytime, after signing in.
          </p>

          <div className="ActionGroup">
            <button className="Btn PrimaryOutlineBtn">
              Build a profile like this
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}