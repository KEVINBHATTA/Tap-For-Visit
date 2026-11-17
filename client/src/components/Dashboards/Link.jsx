import { useMemo, useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { FiPlus, FiX } from "react-icons/fi";
import api from "../../utils/api";
import {
  clearDraft,
  DEFAULT_VISIBLE_LINKS,
  loadProfile,
  normalizeProfile,
  PLATFORMS,
  saveDraft,
  saveProfile,
  validateField,
} from "../ProfileEdits/ProfileConfig";
import "../../Pages/ProfileEdits2.css";

function LinksEditor() {
  const initial = useMemo(() => loadProfile(), []);
  const [savedData, setSavedData] = useState(initial.saved);
  const [formData, setFormData] = useState(initial.draft ?? initial.saved);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  // Links the user explicitly added (or the defaults). Any link that already
  // has a value is shown as well, so a "Discard" never hides saved data.
  const [added, setAdded] = useState(() => {
    const data = initial.draft ?? initial.saved;
    return [...new Set([...DEFAULT_VISIBLE_LINKS, ...Object.keys(PLATFORMS).filter((key) => data[key])])];
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const isDirty = Object.keys(PLATFORMS).some((key) => formData[key] !== savedData[key]);

  const visible = useMemo(() => {
    const withValue = Object.keys(PLATFORMS).filter(
      (key) => formData[key] && !added.includes(key),
    );
    return [...added, ...withValue];
  }, [added, formData]);

  const hidden = Object.keys(PLATFORMS).filter((key) => !visible.includes(key));

  const handleOnChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      return Object.fromEntries(Object.entries(prev).filter(([field]) => field !== key));
    });
    setMessage(null);
  };

  const removeLink = (key) => {
    setAdded((prev) => prev.filter((k) => k !== key));
    handleOnChange(key, "");
  };

  const addLink = (key) => {
    setAdded((prev) => (prev.includes(key) ? prev : [...prev, key]));
    setMenuOpen(false);
  };

  const handleDiscard = () => {
    setFormData((current) => ({
      ...current,
      ...Object.fromEntries(Object.keys(PLATFORMS).map((key) => [key, savedData[key] ?? ""])),
    }));
    setErrors({});
    setMessage(null);
  };

  const handleSave = async () => {
    if (saving || !isDirty) return;

    const found = Object.fromEntries(
      Object.keys(PLATFORMS)
        .map((key) => [key, validateField(key, formData[key])])
        .filter(([, error]) => error),
    );
    if (Object.keys(found).length) {
      setErrors(found);
      setMessage({ type: "error", text: "Please fix the highlighted links." });
      return;
    }

    const userName = savedData.userName || formData.userName;
    if (!userName) {
      setMessage({ type: "error", text: "Missing username. Please sign in again." });
      return;
    }

    const linkValues = Object.fromEntries(
      Object.keys(PLATFORMS).map((key) => [key, formData[key] ?? ""]),
    );
    const payload = normalizeProfile({ ...savedData, ...linkValues, userName });
    setSaving(true);
    setMessage(null);
    try {
      await api.put(`/profile/${encodeURIComponent(userName)}`, payload);
      saveProfile(payload);
      const draft = loadProfile().draft;
      if (draft) {
        saveDraft({ ...draft, ...linkValues, userName });
      } else {
        clearDraft();
      }
      setSavedData(payload);
      setFormData((current) => ({ ...current, ...linkValues, userName }));
      setMessage({ type: "success", text: "Links saved." });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || `Failed to save links: ${error.message}`,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pe-page">
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

      <div className="pe-savebar">
        <div className="pe-savebar-inner">
          <span className="pe-savebar-msg" role="status">
            {message?.text || (isDirty ? "You have unsaved link changes" : "No link changes to save")}
          </span>
          <div className="pe-savebar-actions">
            {isDirty && !saving && (
              <button type="button" className="pe-btn pe-btn-ghost" onClick={handleDiscard}>
                Discard
              </button>
            )}
            <button type="button" className="pe-btn pe-btn-primary" onClick={handleSave} disabled={!isDirty || saving}>
              {saving ? "Saving…" : "Save links"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinksEditor;