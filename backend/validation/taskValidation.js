const Joi = require("joi");

const taskSchema = Joi.object({

    title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({

            "string.empty": "Task title is required",
            "string.min": "Task title must be at least 3 characters"

        }),

    description: Joi.string()
        .allow("")
        .max(1000),

    project: Joi.string()
        .required()
        .messages({

            "string.empty": "Project is required"

        }),

    priority: Joi.string()
        .valid(

            "Low",
            "Medium",
            "High"

        )
        .required()
        .messages({

            "any.only": "Priority must be Low, Medium or High"

        }),

    status: Joi.string()
        .valid(

            "Todo",
            "In Progress",
            "Review",
            "Completed"

        )
        .required()
        .messages({

            "any.only":
                "Status must be Todo, In Progress, Review or Completed"

        }),

    dueDate: Joi.date()
        .optional()

});

module.exports = taskSchema;