import React from "react";
import StatEdits from "./StatEdits";

function SwitchRow({ id, title, description, checked, onChange }) {
  return (
    <div className="pe-switch-row">
      <div>
        <p className="pe-switch-title" id={`${id}-label`}>
          {title}
        </p>
        <p className="pe-switch-desc">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        id={id}
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        className={`pe-switch ${checked ? "is-on" : ""}`}
        onClick={() => onChange(!checked)}
      >
        <span />
      </button>
    </div>
  );
}

function ToggleSwitch({ formData, handleOnChange }) {
  return (
    <section className="pe-card">
      <header className="pe-card-head">
        <h2 className="pe-card-title">Visibility</h2>
        <p className="pe-card-sub">Choose what shows up on your public profile.</p>
      </header>

      <SwitchRow
        id="switchLocation"
        title="Show location"
        description="Display your city on your profile"
        checked={Boolean(formData.showLocation)}
        onChange={(value) => handleOnChange("showLocation", value)}
      />

      <SwitchRow
        id="switchStat"
        title="Show stats"
        description="Highlight three numbers about your work"
        checked={Boolean(formData.showStat)}
        onChange={(value) => handleOnChange("showStat", value)}
      />

      <StatEdits formData={formData} handleOnChange={handleOnChange} />
    </section>
  );
}

export default ToggleSwitch;