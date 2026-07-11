const express = require("express");
const router = express.Router();
const userProfileController = require("../controllers/userProfileController");


router.put("/update/:username", userProfileController.updateUserProfile);
router.get("/:username", userProfileController.getUserProfile );


module.exports = router;