const { body } = require("express-validator")

const registerValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please include a valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("address").notEmpty().withMessage("Address is required"),
]

const loginValidation = [
  body("email").isEmail().withMessage("Please include a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
]

const updateProfileValidation = [
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("email").optional().isEmail().withMessage("Please include a valid email"),
  body("password").optional().isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("address").optional().notEmpty().withMessage("Address cannot be empty"),
  body("profilePicture").optional().isURL().withMessage("Profile picture must be a valid URL"),
]

module.exports = {
  registerValidation,
  loginValidation,
  updateProfileValidation,
}

