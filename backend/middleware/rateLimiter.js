const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 10,

    standardHeaders: true,

    legacyHeaders: false,

    message: {

        success: false,

        message: "Too many login attempts. Please try again after 15 minutes."

    }

});

const aiLimiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 20,

    standardHeaders: true,

    legacyHeaders: false,

    message: {

        success: false,

        message: "AI request limit exceeded. Please try again later."

    }

});

module.exports = {

    loginLimiter,

    aiLimiter

};