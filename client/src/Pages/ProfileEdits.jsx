import React from "react";
import "./ProfileEdits.css";
import Header from "../components/ProfileEdits/Header";
import Avatar from "../components/Avatar";
import { CiCamera } from "react-icons/ci";
import FeatureEdits from "../components/ProfileEdits/FeatureEdits";
import Link from "../components/ProfileEdits/Link";
import ToggleSwitch from "../components/ProfileEdits/ToggleSwitch";
import ProfileFooter from "../components/ProfileFooter";
import SaveChange from "../components/ProfileEdits/SaveChange";
import { useNavigate } from "react-router-dom";
import AvatarPopUp from "../components/ProfileEdits/AvatarPopUp";

function ProfileEdits() {
  const defaultProfileData = {
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

  const navigate = useNavigate();

  const [formData, setFormData] = React.useState(() => {
    const savedData = localStorage.getItem("profileFormData");

    if (savedData) {
      return { ...defaultProfileData, ...JSON.parse(savedData) };
    }

    return defaultProfileData;
  });

  const handleInputChange = (name, value) => {
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };
      localStorage.setItem("profileFormData", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  // const handleSave = (e) => {
  //   if (e && e.preventDefault) e.preventDefault();
  //   console.log("Submitted Form Data:", formData);
  //   localStorage.setItem("profileFormData", JSON.stringify(formData));
  //   navigate(`/${formData?.userName}`, { state: formData });
  // };

  const handleSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    // localStorage.setItem("profileFormData", JSON.stringify(formData));
    console.log("Submitting Form Data to Server:", formData);

    try {
      //live network PUT request to your server
      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/userProfile/update/${formData.userName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Sends your flat formData object
        },
      );

      const result = await response.json();

      if (response.ok && result.success) {
        console.log("Database update successful:", result.message);

        // 2. Keep localStorage updated as a backup fallback
        localStorage.setItem("profileFormData", JSON.stringify(formData));

        // 3. Navigate away to the user's profile view
        navigate(`/${formData?.userName}`, { state: formData });
      } else {
        // If server returns a 404 or validation error
        alert(`Failed to save profile: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      // Catches total network dropouts if the server is offline
      console.error("Network error connecting to API:", error);
      alert(
        "Could not connect to the backend server. Make sure it is running!",
      );
    }
  };

  //  for uploading picture open popup
  const [isOpen, setIsOpen] = React.useState(false);
  //  for uploading picture in Profile
  const [file, setFile] = React.useState(null);

  return (
    <div className="background">
      <div className="ProfileEdits">
        <Header onSave={handleSave} formData={formData} />

        <div className="AvatarSection" onClick={() => setIsOpen(true)}>
          <Avatar id="PicEdits" file={file} />
          <div className="camerasection">
            <CiCamera id="cameraicon" />
            <p className="InfoText"> ChangePhoto </p>
          </div>
        </div>

        <AvatarPopUp
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          file={file}
          setFile={setFile}
          formData={formData}
          setFormData={setFormData}
        />

        <FeatureEdits formData={formData} handleOnChange={handleInputChange} />
        <hr className="horizontalline" />
        <Link formData={formData} handleOnChange={handleInputChange} />
        <hr className="horizontalline" />
        <ToggleSwitch formData={formData} handleOnChange={handleInputChange} />
        <SaveChange onSave={handleSave} />
        <ProfileFooter />
      </div>
    </div>
  );
}

export default ProfileEdits;
