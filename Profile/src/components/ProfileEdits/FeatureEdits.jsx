import React from "react";

function FeatureEdits() {
  return (
    <div className="FeatureEdits">
      <p className="Text">INFO BASIC </p>

      <label className="HintText">Full Name</label>
      <center>
        <input
          type="text"
          class="label form-control"
          id="form1"
          placeholder="ENTER YOUR NAME"
        />
      </center>

      <label className="HintText">Job Title</label>
      <center>
        <input
          type="text"
          class="label form-control"
          id="form1"
          placeholder="ENTER YOUR JOB POST"
        />
      </center>

      <label className="HintText">Company</label>
      <center>
        <input
          type="text"
          class="label form-control"
          id="form1"
          placeholder="ENTER YOUR COMPANY"
        />
      </center>

      <label className="HintText">Location</label>
      <center>
        <input
          type="text"
          class="label form-control"
          id="form1"
          placeholder="ENTER YOUR LOCATION"
        />
      </center>

      <hr className="horizontalline" />
      <p className="Text">ABOUT </p>

      <label className="HintText">Bio</label>
      <center>
        <input
          type="text"
          className="label BioSection form-control"
          id="form1"
          placeholder="WHAT's YOUR MIND SAY..."
        />
      </center>

      <label className="HintText">Signature Quote</label>
      <center>
        <input
          type="text"
          class="label form-control"
          id="form1"
          placeholder="WHAT YOU THOUGHT..."
        />
      </center>
    </div>
  );
}

export default FeatureEdits;
