import UserProfile from "../models/UserProfile.js";

/**
 * @desc    Update or create a user profile
 * @route   PUT /api/profile/:username
 * @access  Private (Requires protect middleware)
 */
export const updateUserProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    const cleanUsername = username.trim().toLowerCase();

    // 1. Authorization Guard: Ensure the authenticated user owns this profile
    if (req.user.username.toLowerCase() !== cleanUsername) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only update your own profile",
      });
    }

    const {
      url,
      template,
      fullName,
      job,
      company,
      location,
      bio,
      quote,
      phone,
      email,
      profileImage,
      showLocation,
      showStat,
      linkedin,
      instagram,
      youtube,
      facebook,
      tiktok,
      x,
      website,
      statLabel1,
      statValue1,
      statLabel2,
      statValue2,
      statLabel3,
      statValue3,
    } = req.body;

    // 2. Build structured payload without destructive overwrites
    const updateFields = {
      userName: cleanUsername,
      user: req.user._id, // Link to User model _id reference
      url: url ?? "",
      template: template || "default",
      fullName: fullName || req.user.name || "New User",
      job: job ?? "",
      company: company ?? "",
      location: location ?? "",
      bio: bio ?? "",
      quote: quote ?? "",
      profileImage: profileImage ?? "",
      phone: phone ?? "",
      email: email || req.user.email,
      showLocation: typeof showLocation === "boolean" ? showLocation : true,
      showStat: typeof showStat === "boolean" ? showStat : false,
      socials: {
        linkedin: linkedin ?? "",
        instagram: instagram ?? "",
        youtube: youtube ?? "",
        facebook: facebook ?? "",
        tiktok: tiktok ?? "",
        x: x ?? "",
        website: website ?? "",
      },
      stats: [
        { label: statLabel1 ?? "", value: statValue1 ?? "" },
        { label: statLabel2 ?? "", value: statValue2 ?? "" },
        { label: statLabel3 ?? "", value: statValue3 ?? "" },
      ],
    };

    // 3. Upsert into MongoDB
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userName: cleanUsername },
      { $set: updateFields },
      {
        new: true,
        runValidators: true,
        upsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Profile saved successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Mongoose Profile Write Error:", error.message);
    return res.status(400).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

/**
 * @desc    Get user profile by username
 * @route   GET /api/profile/:username
 * @access  Public
 */
export const getUserProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    const cleanUsername = username.trim().toLowerCase();

    const profile = await UserProfile.findOne({ userName: cleanUsername });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};