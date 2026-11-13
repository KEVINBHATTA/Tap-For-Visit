import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    // Link to the main User document
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Core Account Details
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    url: {
      type: String,
      trim: true,
      default: "",
    },
    template: {
      type: String,
      required: [true, "Template selection is required"],
      default: "default",
    },

    // Personal/Professional Info
    fullName: {
      type: String,
      trim: true,
      default: "New User",
    },
    job: { type: String, trim: true, default: "" },
    company: { type: String, trim: true, default: "" },
    location: { type: String, trim: true, default: "" },
    bio: {
      type: String,
      maxLength: [500, "Bio cannot exceed 500 characters"],
      default: "",
    },
    quote: { type: String, trim: true, default: "" },
    profileImage: { type: String, default: "" },

    // Contact Info
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [
        /^\s*[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}\s*$/,
        "Please fill a valid email address",
      ],
      default: "",
    },

    // Social Media Links
    socials: {
      linkedin: { type: String, default: "" },
      instagram: { type: String, default: "" },
      youtube: { type: String, default: "" },
      facebook: { type: String, default: "" },
      tiktok: { type: String, default: "" },
      x: { type: String, default: "" },
      website: { type: String, default: "" },
    },

    // Grouped Stats
    stats: [
      {
        label: { type: String, default: "" },
        value: { type: String, default: "" },
      },
    ],

    // UI Visibility Toggles
    showLocation: { type: Boolean, default: true },
    showStat: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

export default mongoose.model("UserProfile", userProfileSchema);