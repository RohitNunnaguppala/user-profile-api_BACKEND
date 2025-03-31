const express = require("express")
const { registerUser, loginUser } = require("../controllers/authController")
const { registerValidation, loginValidation } = require("../middleware/validationMiddleware")

const router = express.Router()

// Register user
router.post("/register", registerValidation, registerUser)

// Login user
router.post("/login", loginValidation, loginUser)

module.exports = router

