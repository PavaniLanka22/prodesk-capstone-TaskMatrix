const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        category: {
            type: String,
            enum: ["Frontend", "Backend", "Full Stack", "Mobile"],
            default: "Full Stack",
        },

        dueDate: {
            type: Date,
        },

        progress: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            enum: ["Active", "Completed"],
            default: "Active",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Project", projectSchema);