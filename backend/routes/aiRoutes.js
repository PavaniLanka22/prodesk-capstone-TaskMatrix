const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");

const {

    aiLimiter

} = require("../middleware/rateLimiter");

const {

    suggestSteps

} = require("../controllers/aiController");

router.post(

    "/suggest",

    authMiddleware,

    aiLimiter,

    suggestSteps

);

module.exports = router;