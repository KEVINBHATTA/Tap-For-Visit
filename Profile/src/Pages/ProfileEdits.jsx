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

function ProfileEdits() {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
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
    website: "",
  });

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Submitted Form Data:", formData);
    navigate("/", { state: formData });
  };

  return (
    <div className="background">
      <div className="ProfileEdits">
        <Header onSave={handleSave} />

        <div className="AvatarSection">
          <Avatar id="PicEdits" />
          <div className="camerasection">
            <CiCamera id="cameraicon" />
            <p className="InfoText"> ChangePhoto </p>
          </div>
        </div>

        <FeatureEdits formData={formData} handleOnChange={handleInputChange} />

        <hr className="horizontalline" />

        <Link formData={formData} handleOnChange={handleInputChange} />
        <hr className="horizontalline" />
        <ToggleSwitch />
        <SaveChange onSave={handleSave} />
        <ProfileFooter />
      </div>
    </div>
  );
}

export default ProfileEdits;
