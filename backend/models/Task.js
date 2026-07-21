const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(

    {

        title: {

            type: String,

            required: true,

            trim: true

        },

        description: {

            type: String,

            default: ""

        },

        project: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Project",

            required: true

        },

        priority: {

            type: String,

            enum: [

                "Low",

                "Medium",

                "High"

            ],

            default: "Medium"

        },

        status: {

            type: String,

            enum: [

                "Todo",

                "In Progress",

                "Review",

                "Completed"

            ],

            default: "Todo"

        },

        dueDate: {

            type: Date

        },

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model(

    "Task",

    taskSchema

);