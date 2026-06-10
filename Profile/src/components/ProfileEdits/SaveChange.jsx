import React from "react";
import { RiContactsBook3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

function SaveChange() {
  return (
    <div>
      <Link className="text-black" to="/"
      onClick={() => window.scrollTo(0, 0)}
      >
        <button className="w-100">
          <div className="Save-contact-section">
            <RiContactsBook3Fill id="Savecontact-icon" />
            <p id="TxtSave">Save Changes</p>
          </div>
        </button>
      </Link>
    </div>
  );
}

export default SaveChange;
