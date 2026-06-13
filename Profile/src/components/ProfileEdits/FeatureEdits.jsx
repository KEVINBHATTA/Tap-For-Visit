import React from "react";

function FeatureEdits({ formData, handleOnChange }) {
  return (
    <div className="FeatureEdits">
      <p className="Text">INFO BASIC </p>

      <label className="HintText">Full Name</label>
      <center>
        <input
          type="text"
          className="label form-control"
          id="form0"
          placeholder="ENTER YOUR NAME"
          value={formData.fullName}
          onChange={(e) => handleOnChange("fullName", e.target.value)}
          name="fullName"
        />
      </center>

      <label className="HintText">Job Title</label>
      <center>
        <input
          type="text"
          className="label form-control"
          id="form1"
          placeholder="ENTER YOUR JOB POST"
          value={formData.job}
          onChange={(e) => handleOnChange("job", e.target.value)}
          name="job"
        />
      </center>

      <label className="HintText">Company</label>
      <center>
        <input
          type="text"
          className="label form-control"
          id="form2"
          placeholder="ENTER YOUR COMPANY"
          onChange={(e) => handleOnChange("company", e.target.value)}
          value={formData.company}
          name="company"
        />
      </center>

      <label className="HintText">Location</label>
      <center>
        <input
          type="text"
          className="label form-control"
          id="form3"
          placeholder="ENTER YOUR LOCATION"
          onChange={(e) => handleOnChange("location", e.target.value)}
          value={formData.location}
          name="location"
        />
      </center>

      <hr className="horizontalline" />
      <p className="Text">ABOUT </p>

      <label className="HintText">Bio</label>
      <center>
        <input
          type="text"
          className="label BioSection form-control"
          id="form4"
          placeholder="WHAT's YOUR MIND SAY..."
          onChange={(e) => handleOnChange("bio", e.target.value)}
          value={formData.bio}
          name="bio"
        />
      </center>

      <label className="HintText">Signature Quote</label>
      <center>
        <input
          type="text"
          class="label form-control"
          id="form5"
          placeholder="WHAT YOU THOUGHT..."
          onChange={(e) => handleOnChange("quote", e.target.value)}
          value={formData.quote}
          name="quote"
        />
      </center>
    </div>
  );
}

export default FeatureEdits;
