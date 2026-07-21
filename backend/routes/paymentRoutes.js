const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");

const {

    createCheckoutSession

} = require("../controllers/paymentController");

router.post(

    "/create-checkout-session",

    authMiddleware,

    createCheckoutSession

);

module.exports = router;