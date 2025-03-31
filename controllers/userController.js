const User = require("../models/userModel")
const { validationResult } = require("express-validator")

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password")

    if (user) {
      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
          bio: user.bio,
          profilePicture: user.profilePicture,
          createdAt: user.createdAt,
        },
      })
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error) {
    next(error)
  }
}

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const user = await User.findById(req.user._id)

    if (user) {
      // Update only the fields that are sent in the request
      user.name = req.body.name || user.name
      user.address = req.body.address || user.address

      // These fields can be empty strings
      if (req.body.bio !== undefined) {
        user.bio = req.body.bio
      }

      if (req.body.profilePicture !== undefined) {
        user.profilePicture = req.body.profilePicture
      }

      // If email is being updated, check if it's already in use
      if (req.body.email && req.body.email !== user.email) {
        const emailExists = await User.findOne({ email: req.body.email })
        if (emailExists) {
          return res.status(409).json({ message: "Email already in use" })
        }
        user.email = req.body.email
      }

      // If password is being updated
      if (req.body.password) {
        user.password = req.body.password
      }

      const updatedUser = await user.save()

      res.json({
        message: "Profile updated successfully",
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          address: updatedUser.address,
          bio: updatedUser.bio,
          profilePicture: updatedUser.profilePicture,
        },
      })
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error) {
    next(error)
  }
}

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
const getUserById = async (req, res, next) => {
  try {
    // Users can only access their own profiles
    if (req.params.id !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Forbidden: You can only access your own profile",
      })
    }

    const user = await User.findById(req.params.id).select("-password")

    if (user) {
      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
          bio: user.bio,
          profilePicture: user.profilePicture,
        },
      })
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { getUserProfile, updateUserProfile, getUserById }

