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
  userName:"",
  url:"",
  template:"",
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

  const handleSave = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    console.log("Submitted Form Data:", formData);
    localStorage.setItem("profileFormData", JSON.stringify(formData));
    navigate("/", { state: formData });
  };

  //  for uploading picture open popup
  const [isOpen, setIsOpen] = React.useState(false);
  //  for uploading picture in Profile
  const [file, setFile] = React.useState(null);

  return (
    <div className="background">
      <div className="ProfileEdits">
        <Header onSave={handleSave} />

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
