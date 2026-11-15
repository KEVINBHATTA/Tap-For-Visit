import React from "react";
import { MdLocationOn } from "react-icons/md";
import { AvatarCircle } from "./AvatarPopUp";
import { PLATFORMS } from "./profileConfig";

/** Compact, approximate preview of the public profile. Updates as you type. */
function ProfilePreview({ formData }) {
  const { fullName, job, company, location, bio, quote, profileImage, showLocation, showStat } = formData;

  const headline = [job, company].filter(Boolean).join(" · ");
  const links = Object.keys(PLATFORMS).filter((key) => formData[key]?.trim());
  const stats = [1, 2, 3]
    .map((n) => ({ value: formData[`statValue${n}`], label: formData[`statLabel${n}`] }))
    .filter((s) => s.value || s.label);

  return (
    <div className="pe-card pe-preview">
      <p className="pe-preview-tag">Live preview</p>
      <div className="pe-preview-cover" />

      <div className="pe-preview-body">
        <div className="pe-preview-avatar">
          <AvatarCircle src={profileImage} name={fullName} size={84} />
        </div>

        <h3 className="pe-preview-name">{fullName || "Your name"}</h3>
        {headline && <p className="pe-preview-headline">{headline}</p>}
        {showLocation && location && (
          <p className="pe-preview-location">
            <MdLocationOn aria-hidden="true" /> {location}
          </p>
        )}

        {bio && <p className="pe-preview-bio">{bio}</p>}
        {quote && <blockquote className="pe-preview-quote">“{quote}”</blockquote>}

        {showStat && stats.length > 0 && (
          <div className="pe-stat-strip">
            {stats.map((s, i) => (
              <div className="pe-stat-box" key={i}>
                <strong>{s.value || "—"}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {links.length > 0 && (
          <div className="pe-preview-links">
            {links.map((key) => {
              const Icon = PLATFORMS[key].icon;
              return (
                <span key={key} className={`pe-tile small tone-${PLATFORMS[key].tone}`} title={PLATFORMS[key].label}>
                  <Icon aria-hidden="true" />
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePreview;