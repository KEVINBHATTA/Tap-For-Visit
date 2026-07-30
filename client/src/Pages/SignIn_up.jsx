import React, { useState } from "react";
import "./Home.css";
import { useNavigate, useLocation } from 'react-router-dom'; 

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  // 📥 Catch the raw data array/object from preceding processes (default to empty object)
  const baseFormData = location.state || JSON.parse(localStorage.getItem("profileFormData")) || {};

  // Local state purely for controlling the form inputs on this page
  const [username, setUsername] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("template1");

  // Strict live filter: Blocks spaces, capital letters, and symbols as they type
  const handleUsernameChange = (e) => {
    const rawValue = e.target.value;
    const cleanValue = rawValue.toLowerCase().replace(/[^a-z0-9]/g, "");
    setUsername(cleanValue);
  };

  // 🚀 This function runs ONLY when the user clicks the submit button
 const handleSignUp = (e) => {
    e.preventDefault(); 
    
    if (!username.trim()) {
      alert("Please enter a valid username first!");
      return;
    }

    // 📦 Clear out old empty key variations and map everything tightly
    const updatedFormData = {
      ...baseFormData, 
      
      // 🚀 Clean Username Overwrites
      username: username,
      userName: username, // Overwrites the camelCase version!
      
      // 🚀 Clean Template Overwrites
      selectedTemplate: selectedTemplate,
      template: selectedTemplate, // Overwrites the lowercase version!
      
      // 🚀 Clean URL & Path Configuration
      location: `/profile/${username}`,
      url: `tapforvisit.com/profile/${username}` // Explicitly sets the full url property!
    };

    // 🎯 CONSOLE PRINT: Check your console now, the old empty strings will be completely updated!
    console.log("Received User Data in home page (On Click):", updatedFormData);

    // Save cleaner data object back into localStorage
    localStorage.setItem("profileFormData", JSON.stringify(updatedFormData));

    // Redirect to next section
    navigate("/ProfileEdits", { state: updatedFormData });
  };

  return (
    <div className="home-master-container">
      <div className="home-card-glow">
        <div className="home-content-card">
          
          {/* Header */}
          <div className="home-header">
            <h1 className="home-title">TapForVisit</h1>
            <p className="home-subtitle">Create your permanent web identity in seconds.</p>
          </div>

          <form onSubmit={handleSignUp} className="home-form">
            
            {/* Step 1: Username Input */}
            <div className="form-group">
              <label className="input-label">CHOOSE YOUR USERNAME</label>
              <div className="username-input-wrapper">
                <input
                  type="text"
                  placeholder="yourname"
                  value={username}
                  onChange={handleUsernameChange} 
                  className="username-input"
                  maxLength={20}
                  required
                />
              </div>
              {/* Dynamic Live URL Preview */}
              <div className="url-preview">
                Your profile link: <span className="url-highlight">tapforvisit.com/profile/{username || "username"}</span>
              </div>
            </div>

            {/* Step 2: Template Selector Cards */}
            <div className="form-group">
              <label className="input-label">SELECT PROFILE TEMPLATE</label>
              <div className="template-grid">
                
                <div 
                  className={`template-card ${selectedTemplate === "template1" ? "active" : ""}`}
                  onClick={() => setSelectedTemplate("template1")}
                >
                  <div className="template-mockup-preview template-1-bg">
                    <div className="mockup-avatar" />
                    <div className="mockup-lines" />
                  </div>
                  <span>Template 1 (Creator Grid)</span>
                </div>

                <div 
                  className={`template-card ${selectedTemplate === "template2" ? "active" : ""}`}
                  onClick={() => setSelectedTemplate("template2")}
                >
                  <div className="template-mockup-preview template-2-bg">
                    <div className="mockup-avatar" />
                    <div className="mockup-lines accent" />
                  </div>
                  <span>Template 2 (Minimal Dark)</span>
                </div>

              </div>
            </div>

            {/* Step 3: Hard Locked Warning Box */}
            <div className="permanent-warning-box">
              <div className="warning-icon">⚠️</div>
              <div className="warning-text">
                <strong>CRITICAL WARNING:</strong> Only lowercase letters and numbers are allowed (@, /, ?, or spaces are blocked). Once registered, your username <strong>cannot be modified or changed</strong>.
              </div>
            </div>

            {/* Submit Registration Button */}
            <button type="submit" className="signup-submit-btn">
              Claim Your Profile Page
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;