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

function ProfileEdits() {
  return (
    <div className="background">
      <div className="ProfileEdits">
        <Header />

        <div className="AvatarSection">
          <Avatar id="PicEdits" />
          <div className="camerasection">
            <CiCamera id="cameraicon" />
            <p className="InfoText"> ChangePhoto </p>
          </div>
        </div>

        <FeatureEdits />

        <hr className="horizontalline" />

        <Link />
        <hr className="horizontalline" />
        <ToggleSwitch />
        <SaveChange />
        <ProfileFooter />
      </div>
    </div>
  );
}

export default ProfileEdits;
