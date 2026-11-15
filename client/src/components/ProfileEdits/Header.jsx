import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FiEye, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";

function Header({ userName, isDirty, previewOnly, onTogglePreview }) {
  const handleBack = (e) => {
    if (isDirty && !window.confirm("You have unsaved changes. Leave without saving?")) {
      e.preventDefault();
    }
  };

  return (
    <header className="pe-header">
      <div className="pe-header-inner">
        <Link to={userName ? `/${userName}` : "/"} className="pe-back" onClick={handleBack}>
          <FaArrowLeft aria-hidden="true" />
          <span>Profile</span>
        </Link>

        <h1 className="pe-title">{previewOnly ? "Preview" : "Edit profile"}</h1>

        <div className="pe-header-right">
          <span className={`pe-status ${isDirty ? "is-dirty" : ""}`} aria-live="polite">
            <i aria-hidden="true" />
            {isDirty ? "Unsaved changes" : "Up to date"}
          </span>

          <button
            type="button"
            className={`pe-preview-btn ${previewOnly ? "is-active" : ""}`}
            onClick={onTogglePreview}
            aria-pressed={previewOnly}
          >
            {previewOnly ? <FiEdit2 aria-hidden="true" /> : <FiEye aria-hidden="true" />}
            <span>{previewOnly ? "Edit" : "Preview"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;