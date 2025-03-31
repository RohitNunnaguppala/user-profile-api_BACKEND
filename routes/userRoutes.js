const express = require("express");
const { getUserProfile, updateUserProfile, getUserById } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { updateProfileValidation } = require("../middleware/validationMiddleware");

const router = express.Router();

router.route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateProfileValidation, updateUserProfile);

router.route("/:id").get(protect, getUserById);

module.exports = router;
