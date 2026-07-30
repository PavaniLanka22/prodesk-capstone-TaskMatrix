import { useState } from "react";
import axios from "axios";
import {
    FiCpu,
    FiCopy,
    FiTrash2,
    FiLoader,
    FiZap
} from "react-icons/fi";
import { toast } from "react-toastify";

import "../styles/aiAssistant.css";

function AIAssistant() {

    const API_URL = import.meta.env.VITE_API_URL;

    const token = localStorage.getItem("token");

    const [task, setTask] = useState("");

    const [loading, setLoading] = useState(false);

    const [steps, setSteps] = useState([]);

    const generateSteps = async () => {

        if (!task.trim()) {

            toast.warning("Please enter a task.");

            return;

        }

        try {

            setLoading(true);

            const response = await axios.post(

                `${API_URL}/api/ai/suggest`,

                {
                    task
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            const aiSteps =
                response.data.suggestion.steps || [];

            setSteps(aiSteps);

            toast.success(
                "AI suggestions generated successfully."
            );

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to generate AI suggestions."

            );

        }

        finally {

            setLoading(false);

        }

    };


    const copySteps = () => {

        if (steps.length === 0) {

            toast.warning("Nothing to copy.");

            return;

        }

        navigator.clipboard.writeText(

            steps

                .map(

                    (step, index) =>

                        `${index + 1}. ${step}`

                )

                .join("\n")

        );

        toast.success(

            "Copied to clipboard."

        );

    };


    const clearAssistant = () => {

        setTask("");

        setSteps([]);

    };


    return (

        <div className="ai-card">

            <div className="ai-header">

                <div className="ai-title">

                    <FiCpu />

                    <div>

                        <h2>

                            AI Task Assistant

                        </h2>

                        <p>

                            Break any task into implementation steps using Gemini AI.

                        </p>

                    </div>

                </div>

                <FiZap className="ai-badge" />

            </div>


            <textarea

                className="ai-textarea"

                placeholder="Example: Build a user authentication system"

                value={task}

                onChange={(e) =>

                    setTask(e.target.value)

                }

            />


            <div className="ai-buttons">

                <button

                    className="generate-btn"

                    onClick={generateSteps}

                    disabled={loading}

                >

                    {

                        loading

                            ?

                            <>

                                <FiLoader className="spin" />

                                Generating...

                            </>

                            :

                            <>

                                <FiZap />

                                Generate AI Steps

                            </>

                    }

                </button>

                <button

                    className="copy-btn"

                    onClick={copySteps}

                >

                    <FiCopy />

                    Copy

                </button>

                <button

                    className="clear-btn"

                    onClick={clearAssistant}

                >

                    <FiTrash2 />

                    Clear

                </button>

            </div>


            {

                steps.length > 0 &&

                (

                    <div className="ai-results">

                        <h3>

                            Suggested Implementation Plan

                        </h3>

                        {

                            steps.map(

                                (step, index) => (

                                    <div

                                        key={index}

                                        className="ai-step"

                                    >

                                        <span>

                                            {index + 1}

                                        </span>

                                        <p>

                                            {step}

                                        </p>

                                    </div>

                                )

                            )

                        }

                    </div>

                )

            }

        </div>

    );

}

export default AIAssistant;