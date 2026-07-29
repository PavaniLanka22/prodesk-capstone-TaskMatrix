const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");

const validate = require("../middleware/validate");

const taskSchema = require("../validation/taskValidation");

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

    validate(taskSchema),

    createTask

);

router.put(

    "/:id",

    authMiddleware,

    validate(taskSchema),

    updateTask

);

router.delete(

    "/:id",

    authMiddleware,

    deleteTask

);

module.exports = router;