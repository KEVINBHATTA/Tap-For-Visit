import React from "react";
import StatEdits from "./StatEdits";

function ToggleSwitch({formData, handleOnChange}) {

  // const [isOn , setIsOn] = React.useState(false);

  const handleFirstToggleChange = (event) => {
    handleOnChange("showLocation", event.target.checked);
  };

    const handleSecondToggleChange = (event) => {
     handleOnChange("showStat", event.target.checked);
  };


  return (
    <div className="toggleSwitch">
      <p className="Text"> VISIBILITY </p>

      <div className="Contact Box FlexBOX">
        <div className="GuideText">
          <p className="text-white fs-5 Padding">Show Location</p>
          <p className="text-white-50 padding">Display your city on profile</p>
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="switchLocation"
            onChange={handleFirstToggleChange}
            checked={formData?.showLocation || false} 
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
            id="switchStat"
            checked={formData?.showStat || false }
            onChange={handleSecondToggleChange}
          />
        </div>
      </div>
      <StatEdits formData={formData} handleOnChange={handleOnChange}  />
    </div>
  );
}

export default ToggleSwitch;
