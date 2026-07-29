const Joi = require("joi");

const projectSchema = Joi.object({

    name: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required(),

    description: Joi.string()
        .allow("")
        .max(500),

    category: Joi.string()
        .valid(
            "Frontend",
            "Backend",
            "Full Stack",
            "Mobile"
        )
        .required(),

    dueDate: Joi.date()
        .required(),

    progress: Joi.number()
        .min(0)
        .max(100),

    status: Joi.string()
        .valid(
            "Active",
            "Completed"
        )
        .required()

});

module.exports = projectSchema;