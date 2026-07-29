const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateTaskSteps = async (taskTitle) => {

    const response = await ai.models.generateContent({

        // IMPORTANT
        model: "gemini-3.6-flash",

        contents: `
You are a project management assistant.

Generate exactly five implementation steps.

Return ONLY valid JSON.

{
  "steps":[
    "",
    "",
    "",
    "",
    ""
  ]
}

Task:
${taskTitle}
`

    });

    return response.text;

};

module.exports = {
    generateTaskSteps
};