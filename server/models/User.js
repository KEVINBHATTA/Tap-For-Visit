import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-z0-9_.-]{3,30}$/, // Updated to allow dots and hyphens up to 30 chars
        "Username can only contain lowercase letters, numbers, underscores, dots, and hyphens (3-30 chars)",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: [
        function () {
          return !this.googleId;
        },
        "Password is required",
      ],
      validate: {
        validator: function (value) {
          // Skip minlength validation completely if user is registering via Google OAuth
          if (this.googleId && (!value || value.length === 0)) {
            return true;
          }
          return value && value.length >= 6;
        },
        message: "Password must be at least 6 characters",
      },
      select: false,
    },
    googleId: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Fallback: Default 'name' to 'username' before validation if empty
userSchema.pre("validate", function () {
  if (!this.name && this.username) {
    this.name = this.username;
  }
});

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  if (!this.password) {
    return false;
  }
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.User || mongoose.model("User", userSchema);