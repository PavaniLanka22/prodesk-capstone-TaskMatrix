const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {

        console.log("❌ Authorization header missing");

        return res.status(401).json({

            success: false,

            message: "Access denied. No token provided."

        });

    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        console.log("\n==============================");
        console.log("✅ JWT VERIFIED");
        console.log("User ID :", decoded.id);
        console.log("Name    :", decoded.name);
        console.log("Email   :", decoded.email);
        console.log("==============================\n");

        req.user = decoded;

        next();

    }

    catch (error) {

        console.log("\n==============================");
        console.log("❌ JWT VERIFICATION FAILED");
        console.log(error.message);
        console.log("==============================\n");

        return res.status(401).json({

            success: false,

            message: "Invalid or expired token."

        });

    }

};

module.exports = authMiddleware;