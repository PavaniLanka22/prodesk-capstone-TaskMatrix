const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");

const {

    createTask,

    getTasks,

    getTask,

    updateTask,

    deleteTask

} = require("../controllers/taskController");

router.get(

    "/",

    authMiddleware,

    getTasks

);

router.get(

    "/:id",

    authMiddleware,

    getTask

);

router.post(

    "/",

    authMiddleware,

    createTask

);

router.put(

    "/:id",

    authMiddleware,

    updateTask

);

router.delete(

    "/:id",

    authMiddleware,

    deleteTask

);

module.exports = router;