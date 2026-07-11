import React from 'react'

function StatDisplay({ formData }) {
  const shouldShow = formData?.showStat === true || formData?.showStat === "true";
  if (!shouldShow) return null;

  
  let normalizedStats = [];

  if (formData?.stats && Array.isArray(formData.stats) && formData.stats.length > 0) {
    normalizedStats = formData.stats.filter(item => item.label || item.value);
  } else {
    const localStats = [
      { label: formData?.statLabel1, value: formData?.statValue1 },
      { label: formData?.statLabel2, value: formData?.statValue2 },
      { label: formData?.statLabel3, value: formData?.statValue3 },
    ];
    normalizedStats = localStats.filter(item => item.label || item.value);
  }

  if (normalizedStats.length === 0) {
    normalizedStats = [
      { value: "48K", label: "YOUTUBE" },
      { value: "12K", label: "INSTAGRAM" },
      { value: "8.2K", label: "TIKTOK" }
    ];
  }

  return (
    <div className="Stat-Section">
      {normalizedStats.slice(0, 3).map((stat, index) => (
        <div key={index} className="Stat-Box" id={`Box${index + 1}`}>
          <p className="Top-Text">{stat.value || "—"}</p>
          <p className="Bottom-Text">{(stat.label || "METRIC").toUpperCase()}</p>
        </div>
      ))}
    </div>
  )
}

export default StatDisplay;