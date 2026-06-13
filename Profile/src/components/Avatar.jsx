import React from "react";

function Avatar({ file }) {
  
  // 💡 Define your default profile picture link here
  const defaultPlaceholder = "https://i.sstatic.net/l60Hf.png";

  // Determine what to show in the <img> tag
  const imagePreview = file
    ? typeof file === "string" 
      ? file                    // 1. If it's a string, use it directly (Cloudinary URL)
      : URL.createObjectURL(file) // 2. If it's a raw file object, create a local preview link
    : defaultPlaceholder;       // 3. Fallback to default if file is null/undefined

  return (
    <div className="Avatar-box">
      <img src={imagePreview} className="Avatar rounded-full" alt="Profile" />
    </div>
  );
}

export default Avatar;