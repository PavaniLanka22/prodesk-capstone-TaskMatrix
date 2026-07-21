const express = require("express");

const router = express.Router();

const {
    getUsers,
    updateUser,
    deleteUser
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

// Get all users
router.get(
    "/",
    protect,
    getUsers
);

// Update a user
router.put(
    "/:id",
    protect,
    updateUser
);

// Delete a user
router.delete(
    "/:id",
    protect,
    deleteUser
);

module.exports = router;