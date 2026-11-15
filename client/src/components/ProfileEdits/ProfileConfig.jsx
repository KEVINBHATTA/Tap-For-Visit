import { FaPhoneAlt, FaLinkedinIn } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io5";
import {
  FaEarthAsia,
  FaYoutube,
  FaFacebookF,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

/** localStorage keys: SAVED mirrors the server, DRAFT holds unsaved edits. */
export const SAVED_KEY = "profileFormData";
export const DRAFT_KEY = "profileFormDraft";

export const LIMITS = { bio: 160, quote: 100, statLabel: 14, statValue: 8 };

export const DEFAULT_PROFILE = {
  userName: "",
  url: "",
  template: "",
  fullName: "",
  job: "",
  company: "",
  location: "",
  bio: "",
  quote: "",
  phone: "",
  email: "",
  linkedin: "",
  instagram: "",
  youtube: "",
  facebook: "",
  tiktok: "",
  x: "",
  website: "",
  profileImage: "",
  statLabel1: "",
  statValue1: "",
  statLabel2: "",
  statValue2: "",
  statLabel3: "",
  statValue3: "",
  showLocation: true,
  showStat: false,
};

/** Links shown by default when the profile has none yet. */
export const DEFAULT_VISIBLE_LINKS = ["phone", "email"];

export const PLATFORMS = {
  phone: {
    label: "Phone number",
    placeholder: "+977 98XXXXXXXX",
    icon: FaPhoneAlt,
    tone: "green",
    type: "tel",
    autoComplete: "tel",
  },
  email: {
    label: "Email",
    placeholder: "you@example.com",
    icon: IoIosMail,
    tone: "amber",
    type: "email",
    autoComplete: "email",
  },
  linkedin: {
    label: "LinkedIn",
    placeholder: "linkedin.com/in/username",
    icon: FaLinkedinIn,
    tone: "sky",
    type: "url",
  },
  instagram: {
    label: "Instagram",
    placeholder: "instagram.com/username",
    icon: IoLogoInstagram,
    tone: "rose",
    type: "url",
  },
  youtube: {
    label: "YouTube",
    placeholder: "youtube.com/@channel",
    icon: FaYoutube,
    tone: "red",
    type: "url",
  },
  facebook: {
    label: "Facebook",
    placeholder: "facebook.com/username",
    icon: FaFacebookF,
    tone: "blue",
    type: "url",
  },
  tiktok: {
    label: "TikTok",
    placeholder: "tiktok.com/@username",
    icon: FaTiktok,
    tone: "dark",
    type: "url",
  },
  x: {
    label: "X (Twitter)",
    placeholder: "x.com/username",
    icon: FaXTwitter,
    tone: "slate",
    type: "url",
  },
  website: {
    label: "Website",
    placeholder: "yourwebsite.com",
    icon: FaEarthAsia,
    tone: "olive",
    type: "url",
  },
};

/* ---------- storage helpers (never throw) ---------- */

const read = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : null;
  } catch {
    return null;
  }
};

export const loadProfile = () => ({
  saved: read(SAVED_KEY) ?? { ...DEFAULT_PROFILE },
  draft: read(DRAFT_KEY),
});

export const saveProfile = (data) => {
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(data));
  } catch {
    /* storage full or blocked: ignore */
  }
};

export const saveDraft = (data) => {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
};

export const clearDraft = () => {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
};

/* ---------- validation ---------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s\-()]{7,18}$/;

const isUrl = (value) => {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
};

export function validateField(key, raw) {
  const value = (raw ?? "").trim();
  if (!value) return "";
  if (key === "email") return EMAIL_RE.test(value) ? "" : "Enter a valid email address";
  if (key === "phone") return PHONE_RE.test(value) ? "" : "Enter a valid phone number";
  if (PLATFORMS[key]?.type === "url") return isUrl(value) ? "" : "Enter a valid link";
  return "";
}

export function validateProfile(data) {
  const errors = {};
  if (!data.fullName?.trim()) errors.fullName = "Full name is required";
  if ((data.bio || "").length > LIMITS.bio) errors.bio = `Keep your bio under ${LIMITS.bio} characters`;
  if ((data.quote || "").length > LIMITS.quote) errors.quote = `Keep your quote under ${LIMITS.quote} characters`;
  Object.keys(PLATFORMS).forEach((key) => {
    const message = validateField(key, data[key]);
    if (message) errors[key] = message;
  });
  return errors;
}

/** Trim strings and make sure URLs have a protocol before sending to the API. */
export function normalizeProfile(data) {
  const out = { ...data };
  Object.keys(out).forEach((key) => {
    if (typeof out[key] === "string") out[key] = out[key].trim();
  });
  Object.keys(PLATFORMS).forEach((key) => {
    if (PLATFORMS[key].type === "url" && out[key] && !/^https?:\/\//i.test(out[key])) {
      out[key] = `https://${out[key]}`;
    }
  });
  return out;
}