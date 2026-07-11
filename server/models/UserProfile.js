const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  // Core Account Details
  userName: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    lowercase: true
  },
  url: { 
    type: String, 
    trim: true 
  },
  template: { 
    type: String, 
    required: [true, "Template selection is required"],
    default: "default"
  },

  // Personal/Professional Info
  fullName: { 
    type: String, 
    required: [true, "Full name is required"], 
    trim: true 
  },
  job: { type: String, trim: true, default: "" },
  company: { type: String, trim: true, default: "" },
  location: { type: String, trim: true, default: "" },
  bio: { 
    type: String, 
    required: [true, "Bio is required"],
    maxLength: [500, "Bio cannot exceed 500 characters"]
  },
  quote: { type: String, trim: true, default: "" },
  profileImage: { type: String, default: "" },

  // Contact Info
  phone: { 
    type: String, 
    required: [true, "Phone number is required"],
    trim: true
  },
  email: { 
    type: String, 
    lowercase: true, 
    trim: true,
    match: [/^\s*[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}\s*$/, "Please fill a valid email address"]
  },

  // Social Media Links
  socials: {
    linkedin: { type: String, default: "" },
    instagram: { type: String, default: "" },
    youtube: { type: String, default: "" },
    facebook: { type: String, default: "" },
    tiktok: { type: String, default: "" },
    x: { type: String, default: "" },
    website: { type: String, default: "" }
  },

  // Grouped Stats Cleaner than floating individual fields)
  stats: [
    {
      label: { type: String, default: "" },
      value: { type: String, default: "" }
    }
  ],

  // UI Visibility Toggles
  showLocation: { type: Boolean, default: true },
  showStat: { type: Boolean, default: false }
}, { 
  timestamps: true // 🚀 Automatically adds createdAt and updatedAt fields
});


module.exports = mongoose.model("UserProfile", userProfileSchema);