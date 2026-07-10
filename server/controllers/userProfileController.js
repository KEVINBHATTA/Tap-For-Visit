const UserProfile = require("../models/UserProfile");

exports.updateUserProfile = async (req, res, next) => {
  try {
    const { username } = req.params;

    // Destructure incoming flat properties from the React client payload
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

    // Map structural fields and fall back to clean placeholders if mandatory fields are missing
    const updateFields = {
      userName: username.trim().toLowerCase(), // Matches schema lowercase constraint
      url: url || "",
      template: template || "default",
      fullName: fullName || "New User",
      job: job || "",
      company: company || "",
      location: location || "",
      bio: bio || "No bio added yet.",
      quote: quote || "",
      profileImage: profileImage || "",
      phone: phone || "000-000-0000",
      email: email || "",
      showLocation: typeof showLocation === "boolean" ? showLocation : true,
      showStat: typeof showStat === "boolean" ? showStat : false,
      socials: {
        linkedin: linkedin || "",
        instagram: instagram || "",
        youtube: youtube || "",
        facebook: facebook || "",
        tiktok: tiktok || "",
        x: x || "",
        website: website || "",
      },
      stats: [
        { label: statLabel1 || "", value: statValue1 || "" },
        { label: statLabel2 || "", value: statValue2 || "" },
        { label: statLabel3 || "", value: statValue3 || "" },
      ],
    };

    // Perform database operations safely with explicit fallback configurations
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userName: username.toLowerCase() },
      { $set: updateFields },
      {
        returnDocument: "after",
        runValidators: true,
        upsert: true, // Creates the record with placeholder fields if it doesn't exist
      },
    );

    return res.status(200).json({
      success: true,
      message: "Profile saved and updated successfully!",
      data: updatedProfile,
    });
  } catch (error) {
    console.error(" Mongoose Database Write Error:", error.message);
    return res.status(400).json({
      success: false,
      message: "Database operation failed",
      error: error.message,
    });
  }
};


exports.getUserProfile = async (req, res, next) => {
  try {
    const { username } = req.params;

    // Search the database matching your schema property name (userName)
    const profile = await UserProfile.findOne({ userName: username.toLowerCase() });

    if (!profile) {
      return res.status(404).json({ 
        success: false, 
        message: "Profile not found" 
      });
    }

    return res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};