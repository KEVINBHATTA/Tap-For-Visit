import { useState } from "react";
import "./AuthPage.css";

const RESERVED_USERNAMES = ["admin", "api", "dashboard", "support", "login", "signup", "signin"];

export default function AuthPage({ initialMode = "signin" }) {
  const [mode, setMode] = useState(initialMode);// "signin" | "signup"
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isSignup = mode === "signup";

  // Placeholder availability state — replace with a debounced API call to
  // GET /api/users/check-username?username=... in a later pass.
  const usernameStatus =
    username.length === 0
      ? null
      : RESERVED_USERNAMES.includes(username.toLowerCase())
      ? "taken"
      : "available";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      // TODO: wire to POST /api/auth/signup { username, email, password }
      console.log("signup", { username, email, password, agreed });
    } else {
      // TODO: wire to POST /api/auth/signin { email, password }
      console.log("signin", { email, password });
    }
  };

  const handleGoogleAuth = () => {
    // TODO: redirect to /api/auth/google
    console.log("google auth clicked");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="auth-logo-pic">
             <img src="Logo.png"></img>
          </span>
          <span className="auth-logo-text">
            TAP<span className="auth-logo-accent">FOR VISIT</span>
          </span>
        </div>

        {isSignup && (
          <div className="auth-alert">
            <i className="ti ti-info-circle" aria-hidden="true" />
            once you set your username it cannot be changed. profile url:{" "}
            <span className="auth-alert-strong">
              tapforvisit.com/{username || "username"}
            </span>
          </div>
        )}

        <div className="auth-toggle" role="tablist" aria-label="Sign in or sign up">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "signin"}
            className={`auth-toggle-btn ${mode === "signin" ? "active" : ""}`}
            onClick={() => setMode("signin")}
          >
            sign in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "signup"}
            className={`auth-toggle-btn ${mode === "signup" ? "active" : ""}`}
            onClick={() => setMode("signup")}
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
                  onChange={(e) => setUsername(e.target.value.trim())}
                  autoComplete="off"
                  required
                />
                {usernameStatus === "available" && (
                  <i className="ti ti-check auth-icon-ok" aria-hidden="true" />
                )}
                {usernameStatus === "taken" && (
                  <i className="ti ti-x auth-icon-bad" aria-hidden="true" />
                )}
              </div>
              {usernameStatus === "available" && (
                <span className="auth-hint auth-hint-ok">available</span>
              )}
              {usernameStatus === "taken" && (
                <span className="auth-hint auth-hint-bad">already taken, try another</span>
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

          <button type="submit" className="auth-submit">
            {isSignup ? "create account" : "sign in"}
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