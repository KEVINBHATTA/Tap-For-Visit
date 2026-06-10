import React from "react";

function ToggleSwitch() {
  return (
    <div className="toggleSwitch">
      <p className="Text"> VISIBILITY </p>

      <div className="Contact Box FlexBOX">
        <div className="GuideText">
          <p className="text-white fs-5 Padding">Show Location</p>
          <p className="text-white-50 padding">Display city on your profile</p>
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      </div>

      <div className="Contact Box FlexBOX">
        <div className="GuideText">
          <p className="text-white fs-5 Padding">Show Your Stat</p>
          <p className="text-white-50 padding">Display Your Work</p>
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      </div>
    </div>
  );
}

export default ToggleSwitch;
