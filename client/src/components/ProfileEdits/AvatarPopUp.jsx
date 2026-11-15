import React, { useEffect, useRef, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { GrMultiple } from "react-icons/gr";
import { FaRegCircleCheck } from "react-icons/fa6";

const MAX_MB = 5;

// Lives in client/public/DefaultProfile.png. Vite serves the public folder
// from the site root, so it is referenced by URL, never imported.
const DEFAULT_PROFILE = "/DefaultProfile.png";

/** Round avatar: shows the image, or DefaultProfile.png when there is none. */
export function AvatarCircle({ src, name, size = 96 }) {
  return (
    <span className="pe-avatar" style={{ width: size, height: size }}>
      <img
        src={src || DEFAULT_PROFILE}
        alt={name ? `${name}'s profile photo` : "Profile photo"}
        onError={(e) => {
          // Broken remote URL: fall back to the default picture (only once).
          if (e.currentTarget.dataset.fallback) return;
          e.currentTarget.dataset.fallback = "1";
          e.currentTarget.src = DEFAULT_PROFILE;
        }}
      />
    </span>
  );
}

/**
 * Mounted only while open (the parent renders it conditionally), so its state
 * resets on every open and no hook ever runs after an early return.
 */
function AvatarPopUp({ currentImage, name, publicIdBase, onClose, onUploaded }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const uploadRef = useRef(null);
  const cameraRef = useRef(null);

  // Local preview URL, cleaned up when the file changes or the modal closes.
  useEffect(() => {
    if (!file) {
      setPreview("");
      return undefined;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // Esc to close + lock page scroll while open.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && !uploading) onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, uploading]);

  const pickFile = (picked) => {
    if (!picked) return;
    if (!picked.type.startsWith("image/")) return setError("Please choose an image file.");
    if (picked.size > MAX_MB * 1024 * 1024) return setError(`Image must be smaller than ${MAX_MB} MB.`);
    setError("");
    setFile(picked);
  };

  // The check button: upload the chosen photo, or just close if none was chosen.
  const handleConfirm = async () => {
    if (uploading) return;
    if (!file) {
      onClose();
      return;
    }

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) {
      setError("Image upload isn't configured. Check your Cloudinary env variables.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const body = new FormData();
      body.append("file", file);
      body.append("upload_preset", uploadPreset);
      // Unique id: unsigned uploads can't overwrite an existing public_id,
      // so reusing one would keep serving the old picture.
      body.append("public_id", `${publicIdBase}_${Date.now()}`);
      body.append("tags", `avatar,${publicIdBase}`);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (!res.ok || !data.secure_url) throw new Error(data?.error?.message || "Upload failed");

      onUploaded(data.secure_url);
      onClose();
    } catch (err) {
      setError(err.message || "Upload failed. Please try again.");
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onUploaded("");
    onClose();
  };

  return (
    <div
      className="pe-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !uploading) onClose();
      }}
    >
      <div
        className={`pe-modal ${dragOver ? "is-over" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="avatar-title"
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={(e) => {
          if (e.currentTarget === e.target) setDragOver(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          pickFile(e.dataTransfer.files?.[0]);
        }}
      >
        <div className="pe-up-head">
          <button
            type="button"
            className="pe-up-round"
            onClick={onClose}
            disabled={uploading}
            aria-label="Close"
          >
            <RxCrossCircled />
          </button>

          <h2 id="avatar-title">Change profile picture</h2>

          <button
            type="button"
            className="pe-up-round confirm"
            onClick={handleConfirm}
            disabled={uploading}
            aria-label={file ? "Upload this photo" : "Done"}
          >
            {uploading ? <span className="pe-spinner dark" aria-hidden="true" /> : <FaRegCircleCheck />}
          </button>
        </div>

        <div className="pe-up-avatar">
          <div className="pe-up-ring">
            <AvatarCircle src={preview || currentImage} name={name} size={150} />
            <span className="pe-up-badge">
              <CiCamera aria-hidden="true" />
            </span>
          </div>
        </div>

        {file && <p className="pe-up-file">{file.name}</p>}

        <button
          type="button"
          className="pe-up-option"
          onClick={() => uploadRef.current?.click()}
          disabled={uploading}
        >
          <GrMultiple aria-hidden="true" />
          <span>Upload from device</span>
        </button>

        <button
          type="button"
          className="pe-up-option"
          onClick={() => cameraRef.current?.click()}
          disabled={uploading}
        >
          <CiCamera aria-hidden="true" />
          <span>Take a picture</span>
        </button>

        {currentImage && !file && (
          <button type="button" className="pe-link-btn danger pe-up-remove" onClick={handleRemove}>
            Remove current photo
          </button>
        )}

        {error && (
          <p className="pe-error pe-up-error" role="alert">
            {error}
          </p>
        )}

        <input
          ref={uploadRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            pickFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="user"
          hidden
          onChange={(e) => {
            pickFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}

export default AvatarPopUp;