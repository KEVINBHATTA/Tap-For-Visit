import React, { useState, useEffect } from "react";
import Profile from "./Profile";
import Template from "./Template2";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";

function YourProfile({ profileData }) {
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    // 1. MATCH PASSING PROPS FIRST (Active Session Creator)
    if (profileData && Object.keys(profileData).length > 0 && 
       (profileData.userName?.toLowerCase() === username?.toLowerCase() || profileData.username?.toLowerCase() === username?.toLowerCase())) {
      setData(profileData);
      setLoading(false);
      return;
    }

    // 2. MATCH LOCAL STORAGE SECOND (Fresh Signup/Refresh Fallback)
    const localFormData = JSON.parse(localStorage.getItem("profileFormData"));
    if (localFormData && 
       (localFormData.userName?.toLowerCase() === username?.toLowerCase() || localFormData.username?.toLowerCase() === username?.toLowerCase())) {
      setData(localFormData);
      setLoading(false);
      return;
    }

    // 3. NO LOCAL MATCH? THEN GO QUERY THE PUBLIC INTERNET/DATABASE
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/userProfile/${username}`);
        const result = await response.json();

        if (result.success && result.data) {
          setData(result.data);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching live profile from backend:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, profileData]);

  // Loading State Screen
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <h3>Loading beautiful profile...</h3>
      </div>
    );
  }

  // 404 Trigger State
  if (notFound) {
    return <PageNotFound username={username} />;
  }

  // Normal Layout Rendering
  const finalData = data || {};
  const chosenTemplate = finalData.selectedTemplate || finalData.template;

  if (chosenTemplate === "template2") {
    return <Template profileData={finalData} urlUsername={username} />;
  }

  return <Profile profileData={finalData} urlUsername={username} />;
}

export default YourProfile;