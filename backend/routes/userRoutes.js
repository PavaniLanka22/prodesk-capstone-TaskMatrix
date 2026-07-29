const express = require("express");

const router = express.Router();

const {

    createUser,

    getUsers,

    updateUser,

    deleteUser,

} = require("../controllers/userController");

const protect = require("../middleware/authmiddleware");


// ======================================================
// CREATE USER
// ======================================================

router.post(

    "/",

    protect,

    createUser

);


// ======================================================
// GET ALL USERS
// ======================================================

router.get(

    "/",

    protect,

    getUsers

);


// ======================================================
// UPDATE USER
// ======================================================

router.put(

    "/:id",

    protect,

    updateUser

);


// ======================================================
// DELETE USER
// ======================================================

router.delete(

    "/:id",

    protect,

    deleteUser

);


module.exports = router;