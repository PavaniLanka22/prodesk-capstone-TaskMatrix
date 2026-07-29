const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");

const validate = require("../middleware/validate");

const projectSchema = require("../validation/projectValidation");

const {

    createProject,

    getProjects,

    updateProject,

    deleteProject

} = require("../controllers/projectController");

router.get(

    "/",

    authMiddleware,

    getProjects

);

router.post(

    "/",

    authMiddleware,

    validate(projectSchema),

    createProject

);

router.put(

    "/:id",

    authMiddleware,

    validate(projectSchema),

    updateProject

);

router.delete(

    "/:id",

    authMiddleware,

    deleteProject

);

module.exports = router;