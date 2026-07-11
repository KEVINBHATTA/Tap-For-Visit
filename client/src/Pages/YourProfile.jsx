import React, { useState, useEffect } from "react";
import Profile from "./Profile";
import Template from "./Template2";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";

function YourProfile({ profileData }) {
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false); // 

  useEffect(() => {
    //Reset states whenever the URL username parameter changes
    setLoading(true);
    setNotFound(false);

    //If parent passed data explicitly AND it matches the current URL user, use it
    if (profileData && Object.keys(profileData).length > 0 && 
       (profileData.userName?.toLowerCase() === username?.toLowerCase() || profileData.username?.toLowerCase() === username?.toLowerCase())) {
      setData(profileData);
      setLoading(false);
      return;
    }

    //Fetch from the database live
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/userProfile/${username}`);
        const result = await response.json();

        if (result.success && result.data) {
          setData(result.data);
        } else {
          // Server returned success: false -> profile genuinely does not exist in MongoDB!
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

  // 2. Clean 404 Custom Error Screen (Bypasses localStorage entirely!)
  if (notFound) {
    return (
      <PageNotFound username={username}/> 
    );
  }

  // 3. Normal Layout Rendering if user is found!
  const finalData = data || {};
  const chosenTemplate = finalData.selectedTemplate || finalData.template;

  if (chosenTemplate === "template2") {
    return <Template profileData={finalData} urlUsername={username} />;
  }

  return <Profile profileData={finalData} urlUsername={username} />;
}

export default YourProfile;