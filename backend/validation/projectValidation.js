const Joi = require("joi");

const projectSchema = Joi.object({

    name: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required(),

    description: Joi.string()
        .allow("")
        .max(500)
        .default(""),

    category: Joi.string()
        .valid(
            "Frontend",
            "Backend",
            "Full Stack",
            "Mobile"
        )
        .default("Full Stack"),

    dueDate: Joi.date()
        .allow(null, "")
        .optional(),

    progress: Joi.number()
        .min(0)
        .max(100)
        .default(0),

    status: Joi.string()
        .valid(
            "Active",
            "Completed"
        )
        .default("Active")
        .optional()

});

module.exports = projectSchema;