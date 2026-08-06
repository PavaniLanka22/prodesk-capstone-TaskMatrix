const validate = (schema) => {
    return (req, res, next) => {

        console.log("REQUEST BODY:");
        console.log(req.body);

        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {

            console.log("VALIDATION ERROR:");
            console.log(error.details);

            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map(item => item.message)
            });
        }

        console.log("VALIDATED BODY:");
        console.log(value);

        req.body = value;

        next();
    };
};

module.exports = validate;