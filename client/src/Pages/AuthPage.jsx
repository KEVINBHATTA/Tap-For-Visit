import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // 👈 Added useLocation
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import "./AuthPage.css";

const RESERVED_USERNAMES = ["admin", "api", "dashboard", "support", "login", "signup", "signin"];

export default function AuthPage({ initialMode = "signin" }) {
  const [mode, setMode] = useState(initialMode); // "signin" | "signup"
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(null); // null | "checking" | "available" | "taken" | "reserved" | "invalid" | "error"
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // 👈 Added location hook

  const isSignup = mode === "signup";
  const authError = new URLSearchParams(location.search).get("error");
  const displayedError =
    error ||
    (authError?.startsWith("google")
      ? "Google sign-in failed. Please try again or use email and password."
      : "");

  // Reset errors when mode changes
  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    setError("");
    setUsernameStatus(null);
  };

  // Sanitize username (alphanumeric & underscores only)
  const handleUsernameChange = (e) => {
    const sanitized = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "");
    setUsername(sanitized);
  };

  // Debounced live username availability check
  useEffect(() => {
    if (!isSignup || !username) {
      setUsernameStatus(null);
      return;
    }

    if (username.length < 3) {
      setUsernameStatus("invalid");
      return;
    }

    if (RESERVED_USERNAMES.includes(username.toLowerCase())) {
      setUsernameStatus("reserved");
      return;
    }

    setUsernameStatus("checking");
    const timeout = setTimeout(async () => {
      try {
        const res = await api.get(`/auth/check-username/${username.toLowerCase()}`);
        setUsernameStatus(res.data.available ? "available" : "taken");
      } catch {
        setUsernameStatus("error");
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [username, isSignup]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isSignup) {
      if (usernameStatus === "reserved") {
        setError("This username is reserved");
        return;
      }
      if (usernameStatus === "error") {
        setError("Could not check username availability. Please try again.");
        return;
      }
      if (usernameStatus !== "available") {
        setError("Please choose a valid & available username");
        return;
      }
      if (!agreed) {
        setError("You must agree to the Terms of Service & Privacy Policy");
        return;
      }
    }

    setLoading(true);
    try {
      if (isSignup) {
        await register(username, username, email, password);
      } else {
        await login(email, password);
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google OAuth Redirect with port fallback
  const handleGoogleAuth = () => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    window.location.href = `${apiUrl}/api/auth/google`;
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="auth-logo-pic">
            <img src="/Logo.png" alt="Tap For Visit Logo" />
          </span>
          <span className="auth-logo-text">
            TAP<span className="auth-logo-accent">FOR VISIT</span>
          </span>
        </div>

        {isSignup && (
          <div className="auth-alert">
            <i className="ti ti-info-circle" aria-hidden="true" />
            Once set, your username cannot be changed. Profile URL:{" "}
            <span className="auth-alert-strong">
              tapforvisit.com/{username || "username"}
            </span>
          </div>
        )}

        {/* Dynamic Error Rendering */}
        {displayedError && (
          <div className="auth-error-box">
            <i className="ti ti-alert-circle" aria-hidden="true" /> {displayedError}
          </div>
        )}

        <div className="auth-toggle" role="tablist" aria-label="Sign in or sign up">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "signin"}
            className={`auth-toggle-btn ${mode === "signin" ? "active" : ""}`}
            onClick={() => handleModeSwitch("signin")}
          >
            sign in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "signup"}
            className={`auth-toggle-btn ${mode === "signup" ? "active" : ""}`}
            onClick={() => handleModeSwitch("signup")}
          >
            sign up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="auth-field">
              <label htmlFor="username">username</label>
              <div className="auth-input-wrap">
                <input
                  id="username"
                  type="text"
                  placeholder="kevinbhatta"
                  value={username}
                  onChange={handleUsernameChange}
                  autoComplete="off"
                  required
                />
                {usernameStatus === "checking" && (
                  <i className="ti ti-loader-2 auth-icon-checking spin" aria-hidden="true" />
                )}
                {usernameStatus === "available" && (
                  <i className="ti ti-check auth-icon-ok" aria-hidden="true" />
                )}
                {(usernameStatus === "taken" || usernameStatus === "reserved") && (
                  <i className="ti ti-x auth-icon-bad" aria-hidden="true" />
                )}
              </div>
              
              {usernameStatus === "invalid" && (
                <span className="auth-hint auth-hint-bad">Must be at least 3 characters</span>
              )}
              {usernameStatus === "reserved" && (
                <span className="auth-hint auth-hint-bad">Username is reserved</span>
              )}
              {usernameStatus === "available" && (
                <span className="auth-hint auth-hint-ok">available</span>
              )}
              {usernameStatus === "taken" && (
                <span className="auth-hint auth-hint-bad">already taken, try another</span>
              )}
              {usernameStatus === "error" && (
                <span className="auth-hint auth-hint-bad">
                  Could not check username availability. Check your connection and try again.
                </span>
              )}
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="email">email</label>
            <input
              id="email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">password</label>
            <div className="auth-input-wrap">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isSignup ? "new-password" : "current-password"}
                required
              />
              <i
                className={`ti ${showPassword ? "ti-eye-off" : "ti-eye"} auth-icon-toggle`}
                aria-hidden="true"
                onClick={() => setShowPassword((s) => !s)}
              />
            </div>
          </div>

          {!isSignup && (
            <div className="auth-forgot-row">
              <span className="auth-link">forgot password?</span>
            </div>
          )}

          {isSignup && (
            <label className="auth-policy-row">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
              />
              <span>
                i agree to the <span className="auth-link">terms of service</span> and{" "}
                <span className="auth-link">privacy policy</span>
              </span>
            </label>
          )}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Please wait..." : isSignup ? "create account" : "sign in"}
          </button>
        </form>

        <div className="auth-divider">
          <span />
          <span className="auth-divider-text">or</span>
          <span />
        </div>

        <button type="button" className="auth-google-btn" onClick={handleGoogleAuth}>
          <GoogleIcon />
          sign in with google
        </button>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.9 32.9 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.4 0 10.3-2.1 14-5.5l-6.5-5.4C29.4 34.7 26.8 36 24 36c-5.4 0-9.9-3.1-11.3-7.5l-6.6 5.1C9.6 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.7 2-2 3.7-3.8 5.1l6.5 5.4C41.5 35.9 44 30.5 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}