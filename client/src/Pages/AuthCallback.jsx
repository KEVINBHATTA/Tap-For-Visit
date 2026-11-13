import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUserFromToken } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      navigate("/signin?error=google");
      return;
    }

    // setUserFromToken handles localStorage internally & loads the profile
    setUserFromToken(token)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error("Google Auth Token exchange failed:", err);
        navigate("/signin?error=google_auth_failed");
      });
  }, [searchParams, setUserFromToken, navigate]);

  return <div className="auth-page">Signing you in...</div>;
}