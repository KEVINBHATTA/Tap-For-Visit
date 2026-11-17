import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CiCamera } from "react-icons/ci";
import "./ProfileEdits2.css";

import FeatureEdits from "../components/ProfileEdits/FeatureEdits";
import ToggleSwitch from "../components/ProfileEdits/ToggleSwitch";
import SaveChange from "../components/ProfileEdits/SaveChange";
import Template1 from "./Profile_Template_Lists/Template1";
import Template2 from "./Profile_Template_Lists/Template2";
import AvatarPopUp, { AvatarCircle } from "../components/ProfileEdits/AvatarPopUp";
import ProfileFooter from "../components/ProfileFooter";
import api from "../utils/api";
import {
  getSelectedProfileTemplate,
  getTemplateForProfileId,
} from "../utils/profileTemplate";
import {
  loadProfile,
  saveProfile,
  saveDraft,
  clearDraft,
  normalizeProfile,
  validateProfile,
} from "../components/ProfileEdits/ProfileConfig";

// Real phone proportions: a 390 x 844 screen (iPhone 14) plus a 14px bezel.
const PHONE_W = 418;
const PHONE_H = 872;

/** Scale factor that keeps the whole phone visible in the current window height. */
function usePhoneScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const available = window.innerHeight - 112; // save bar + spacing
      setScale(Math.min(1, Math.max(0.55, available / PHONE_H)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return scale;
}

const slug = (text) =>
  (text || "").trim().toLowerCase().replace(/\s+/g, "_").replace(/[^\w-]/g, "") || "anonymous";

function ProfileEdits() {
  const navigate = useNavigate();
  const location = useLocation();

  // Read storage once. `saved` mirrors the server; `draft` is unsaved work.
  const [initial] = useState(() => {
    const profile = loadProfile();
    const selectedTemplate =
      getTemplateForProfileId(location.state?.templateId) || getSelectedProfileTemplate();
    if (!selectedTemplate) return profile;

    return {
      ...profile,
      draft: {
        ...(profile.draft ?? profile.saved),
        template: selectedTemplate,
        selectedTemplate,
      },
    };
  });

  const [savedData, setSavedData] = useState(initial.saved);
  const [formData, setFormData] = useState(initial.draft ?? initial.saved);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [previewOnly, setPreviewOnly] = useState(false);
  const phoneScale = usePhoneScale();

  const isDirty = useMemo(
    () => JSON.stringify(formData) !== JSON.stringify(savedData),
    [formData, savedData],
  );

  // Keep an unsaved draft so a refresh or accidental close doesn't lose work.
  useEffect(() => {
    const id = setTimeout(() => (isDirty ? saveDraft(formData) : clearDraft()), 400);
    return () => clearTimeout(id);
  }, [formData, isDirty]);

  // Warn before closing the tab with unsaved changes.
  useEffect(() => {
    if (!isDirty) return undefined;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [isDirty]);

  // Auto-dismiss toasts.
  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(id);
  }, [toast]);

  const handleChange = useCallback((name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      return Object.fromEntries(Object.entries(prev).filter(([field]) => field !== name));
    });
  }, []);

  const handleSave = async (e) => {
    e?.preventDefault?.();
    if (saving) return;

    const payload = normalizeProfile(formData);
    const found = validateProfile(payload);

    if (Object.keys(found).length > 0) {
      setErrors(found);
      setToast({ type: "error", message: "Please fix the highlighted fields." });
      const el = document.getElementById(`field-${Object.keys(found)[0]}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus({ preventScroll: true });
      return;
    }

    if (!payload.userName) {
      setToast({ type: "error", message: "Missing username. Please sign in again." });
      return;
    }

    setSaving(true);
    try {
      const { data: result } = await api.put(
        `/profile/${encodeURIComponent(payload.userName)}`,
        payload,
      );
      if (!result.success) throw new Error(result.message || "Unknown error");

      setFormData(payload);
      setSavedData(payload);
      setErrors({});
      saveProfile(payload); // local backup fallback
      clearDraft();
      navigate(`/${payload.userName}`, { state: payload });
    } catch (err) {
      setToast({
        type: "error",
        message:
          err instanceof TypeError
            ? "Couldn't reach the server. Check your connection and try again."
            : `Failed to save profile: ${err.message}`,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    if (!window.confirm("Discard all unsaved changes?")) return;
    setFormData(savedData);
    setErrors({});
    clearDraft();
  };

  const closeAvatar = useCallback(() => setAvatarOpen(false), []);
  const PreviewTemplate = formData.template === "template2" ? Template2 : Template1;

  return (
    <div className="pe-page">
      <div className={`pe-shell ${previewOnly ? "is-preview" : ""}`}>
        <main className="pe-main">
          <section className="pe-card pe-avatar-card">
            <button
              type="button"
              className="pe-avatar-btn"
              onClick={() => setAvatarOpen(true)}
              aria-label="Change profile photo"
            >
              <AvatarCircle src={formData.profileImage} name={formData.fullName} size={92} />
              <span className="pe-avatar-badge">
                <CiCamera aria-hidden="true" />
              </span>
            </button>

            <div>
              <h2 className="pe-card-title">{formData.fullName || "Your name"}</h2>
              {formData.userName && <p className="pe-card-sub">@{formData.userName}</p>}
              <button type="button" className="pe-link-btn" onClick={() => setAvatarOpen(true)}>
                Change photo
              </button>
            </div>
          </section>

          <FeatureEdits formData={formData} handleOnChange={handleChange} errors={errors} />
          <ToggleSwitch formData={formData} handleOnChange={handleChange} />
        </main>

        <aside className="pe-aside" aria-label="Live phone preview">
          <div
            className="pe-phone-wrap"
            style={{ width: PHONE_W * phoneScale, height: PHONE_H * phoneScale }}
          >
            <div className="pe-phone" style={{ transform: `scale(${phoneScale})` }}>
              <span className="pe-phone-notch" aria-hidden="true" />
              <div className="pe-phone-screen">
                <PreviewTemplate profileData={formData} />
              </div>
              <span className="pe-phone-bar" aria-hidden="true" />
            </div>
          </div>
        </aside>
      </div>

      <ProfileFooter />

      <SaveChange
        onSave={handleSave}
        onDiscard={handleDiscard}
        isDirty={isDirty}
        saving={saving}
        previewOnly={previewOnly}
        onTogglePreview={() => setPreviewOnly((on) => !on)}
      />

      {avatarOpen && (
        <AvatarPopUp
          currentImage={formData.profileImage}
          name={formData.fullName}
          publicIdBase={slug(formData.userName || formData.fullName)}
          onClose={closeAvatar}
          onUploaded={(url) => handleChange("profileImage", url)}
        />
      )}

      {toast && (
        <div className={`pe-toast pe-toast-${toast.type}`} role="status">
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default ProfileEdits;