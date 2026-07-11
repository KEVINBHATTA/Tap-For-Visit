import React from "react";
import { RiContactsBook3Fill } from "react-icons/ri";


function SaveChange({ onSave }) {
  return (
    <div>
      
        <button className="w-100"
          onClick={(e) => {
          window.scrollTo(0, 0);
          onSave(e);
        }}
        >
          <div className="Save-contact-section">
            <RiContactsBook3Fill id="Savecontact-icon" />
            <p id="TxtSave">Save Changes</p>
          </div>
        </button>
   
    </div>
  );
}

export default SaveChange;
