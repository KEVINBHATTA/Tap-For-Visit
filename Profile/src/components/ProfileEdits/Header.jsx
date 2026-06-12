import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header({ onSave }) {
  return (
    <div className="Header-section">
      <Link className="text-black" to="/">
        <div className="backicon">
          <FaArrowLeft /> Profile
        </div>
      </Link>

      <div className="Headline">Edits Profile</div>

      {/* <Link className="text-black" to="/"
        onClick={(e) => {
           onSave(e);
      }}> */}
      <div className="Save-btn">
        <button
          onClick={(e) => {
            onSave(e);
          }}
        >
          {" "}
          Save{" "}
        </button>
      </div>
      {/* </Link> */}
    </div>
  );
}

export default Header;
