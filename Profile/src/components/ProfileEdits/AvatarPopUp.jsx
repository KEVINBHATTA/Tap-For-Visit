import React from "react";
import Avatar from "../Avatar";
import { CiCamera } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { GrMultiple } from "react-icons/gr";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaEarthAsia } from "react-icons/fa6";

function AvatarPopUp({ isOpen, setIsOpen, file, setFile,formData , setFormData }) {
  if (!isOpen) return null;

  // const [file, setFile] = React.useState(null);

  const fileInputRef = React.useRef(null);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // 🌟 Save the file object here!
    }
  };


  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const submitImage = () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);
    data.append("cloud_name", cloudName);
    data.append("public_id", username);
    data.append("tags", `avatar, ${username}`);
   
   console.log("Checking Cloud Name Key:",uploadPreset);

    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Cloudinary Response:", data);

        if (data.secure_url) {
          setFormData((prevData) => {
            const updatedData = {
              ...prevData,
              profileImage: data.secure_url
            };

            localStorage.setItem("profileFormData", JSON.stringify(updatedData));
            return updatedData; // 🌟 Crucial return statement!
          });
 

           
           console.log("Profile picture uploaded sucessfully")
        }
      })
        
      
      .catch((err) => {
        console.log(err);
      });
  };
const username = formData?.fullName 
      ? formData.fullName.trim().toLowerCase().replace(/\s+/g, "_") 
      : "anonymous";
 console.log("my name",formData?.fullName)
  return (
    <div className="AvatarPopUp">
      <div className="Cross">
        <RxCrossCircled
          size="3rem"
          color="white"
          onClick={() => setIsOpen(false)}
        />
        <p className="text-white CrossBar">Change profile picture</p>
        <div onClick={()=>{
          submitImage();
          setIsOpen(false);
        }} >
          <FaRegCircleCheck size="2.5rem" color="white" className="CrossDot" />
        </div>
      </div>

      <center>
        <div className="AvatarSection Align">
          <Avatar file={file} />
          <div className="camerasection">
            <FaEarthAsia id="cameraicon" />
          </div>
        </div>

        <div className="CrossTextSection" onClick={handleDivClick}>
          <GrMultiple size="1.5rem" />
          <p className="CrossText"> Upload from device </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept="image/*"
          />
        </div>

        <div className="CrossTextSection">
          <CiCamera id="cameraicon" size="2rem" />
          <p className="CrossText"> Take a picture </p>
        </div>
      </center>
    </div>
  );
}

export default AvatarPopUp;
