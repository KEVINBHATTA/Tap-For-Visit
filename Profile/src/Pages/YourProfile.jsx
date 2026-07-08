import React from "react";
import Profile from "./Profile";
import Template from "./Template2";
import { useParams } from "react-router-dom";

function YourProfile({ profileData }) {
  const { username } = useParams();
  const data =
    Object.keys(profileData || {}).length > 0
      ? profileData
      : JSON.parse(localStorage.getItem("profileFormData")) || {};
  const chosenTemplate = data.selectedTemplate || data.template;

  if (chosenTemplate === "template2") {
    return <Template profileData={data} urlUsername={username} />;
  }

  return <Profile profileData={data} urlUsername={username} />;
}

export default YourProfile;
