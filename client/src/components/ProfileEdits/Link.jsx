import React, { useMemo, useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { FiPlus, FiX } from "react-icons/fi";
import { PLATFORMS, DEFAULT_VISIBLE_LINKS } from "./ProfileConfig";

function LinksEditor({ formData, handleOnChange, errors = {} }) {
  // Links the user explicitly added (or the defaults). Any link that already
  // has a value is shown as well, so a "Discard" never hides saved data.
  const [added, setAdded] = useState(DEFAULT_VISIBLE_LINKS);
  const [menuOpen, setMenuOpen] = useState(false);

  const visible = useMemo(() => {
    const withValue = Object.keys(PLATFORMS).filter(
      (key) => formData[key] && !added.includes(key),
    );
    return [...added, ...withValue];
  }, [added, formData]);

  const hidden = Object.keys(PLATFORMS).filter((key) => !visible.includes(key));

  const removeLink = (key) => {
    setAdded((prev) => prev.filter((k) => k !== key));
    handleOnChange(key, "");
  };

  const addLink = (key) => {
    setAdded((prev) => (prev.includes(key) ? prev : [...prev, key]));
    setMenuOpen(false);
  };

  return (
    <section className="pe-card">
      <header className="pe-card-head">
        <h2 className="pe-card-title">Links</h2>
        <p className="pe-card-sub">Add the ways people can reach you.</p>
      </header>

      <div className="pe-links">
        {visible.length === 0 && <p className="pe-empty">No links yet. Add your first one below.</p>}

        {visible.map((key) => {
          const platform = PLATFORMS[key];
          const Icon = platform.icon;
          const error = errors[key];

          return (
            <div className="pe-link-row" key={key}>
              <div className={`pe-tile tone-${platform.tone}`}>
                <Icon aria-hidden="true" />
              </div>

              <div className="pe-link-body">
                <label htmlFor={`field-${key}`} className="pe-link-label">
                  {platform.label}
                </label>
                <input
                  id={`field-${key}`}
                  name={key}
                  type={platform.type}
                  autoComplete={platform.autoComplete}
                  className={`pe-input ${error ? "is-invalid" : ""}`}
                  placeholder={platform.placeholder}
                  value={formData[key] ?? ""}
                  onChange={(e) => handleOnChange(key, e.target.value)}
                  aria-invalid={Boolean(error)}
                />
                {error && (
                  <span className="pe-error" role="alert">
                    {error}
                  </span>
                )}
              </div>

              <button
                type="button"
                className="pe-icon-btn danger"
                onClick={() => removeLink(key)}
                aria-label={`Remove ${platform.label}`}
                title={`Remove ${platform.label}`}
              >
                <MdDeleteSweep />
              </button>
            </div>
          );
        })}
      </div>

      {hidden.length > 0 ? (
        <button
          type="button"
          className="pe-add-btn"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX aria-hidden="true" /> : <FiPlus aria-hidden="true" />}
          {menuOpen ? "Close" : "Add a link"}
        </button>
      ) : (
        <p className="pe-empty">You've added every link type.</p>
      )}

      {menuOpen && hidden.length > 0 && (
        <div className="pe-bank" role="menu">
          {hidden.map((key) => {
            const platform = PLATFORMS[key];
            const Icon = platform.icon;
            return (
              <button
                key={key}
                type="button"
                role="menuitem"
                className="pe-bank-item"
                onClick={() => addLink(key)}
              >
                <span className={`pe-tile small tone-${platform.tone}`}>
                  <Icon aria-hidden="true" />
                </span>
                <span>{platform.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default LinksEditor;