const aiService = require("../services/aiService");

const suggestSteps = async (req, res) => {

    try {

        const { task } = req.body;

        if (!task) {

            return res.status(400).json({

                success: false,

                message: "Task is required"

            });

        }

        const suggestion = await aiService.generateTaskSteps(task);

res.status(200).json({
    success: true,
    suggestion: JSON.parse(suggestion)
});

    }

    catch (error) {

    console.error(error);

    res.status(500).json({

        success: false,

        message: "AI service temporarily unavailable. Please try again later."

    });

}

};

module.exports = {

    suggestSteps

};