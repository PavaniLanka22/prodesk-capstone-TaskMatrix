const errorHandler = (err, req, res, next) => {

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {

        return res.status(400).json({

            success: false,

            message: "Invalid resource ID"

        });

    }

    // Joi Validation Error
    if (err.isJoi) {

        return res.status(400).json({

            success: false,

            message: "Validation failed",

            errors: err.details.map(error => error.message)

        });

    }

    // Mongoose Validation Error
    if (err.name === "ValidationError") {

        return res.status(400).json({

            success: false,

            message: err.message

        });

    }

    // Duplicate Key Error
    if (err.code === 11000) {

        return res.status(400).json({

            success: false,

            message: "Duplicate data already exists"

        });

    }

    // Default Server Error
    return res.status(500).json({

        success: false,

        message: err.message || "Internal Server Error"

    });

};

module.exports = errorHandler;