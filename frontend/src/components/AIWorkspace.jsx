import { useState } from "react";
import {
    FiChevronRight,
    FiClock,
    FiZap
} from "react-icons/fi";

import AIAssistant from "./AIAssistant";

import "../styles/aiWorkspace.css";

function AIWorkspace() {

    const [history] = useState([
        "Build Login Authentication",
        "Create Kanban Board",
        "Deploy Backend to Render",
        "Implement Notifications"
    ]);

    const tips = [
        "Break large tasks into small milestones.",
        "Write acceptance criteria before coding.",
        "Estimate complexity before implementation.",
        "Complete backend APIs before frontend integration."
    ];

    return (

        <div className="ai-workspace">

            <div className="ai-left">

                <AIAssistant />

            </div>

            <div className="ai-right">

                {/* Recent Prompts */}

                <div className="ai-panel">

                    <div className="panel-title">

                        <FiClock />

                        <h3>Recent Prompts</h3>

                    </div>

                    {
                        history.map((item, index) => (

                            <div
                                key={index}
                                className="history-item"
                            >

                                <FiChevronRight />

                                <span>{item}</span>

                            </div>

                        ))
                    }

                </div>

                {/* Productivity Tips */}

                <div className="ai-panel">

                    <div className="panel-title">

                        <FiZap />

                        <h3>AI Productivity Tips</h3>

                    </div>

                    {
                        tips.map((tip, index) => (

                            <div
                                key={index}
                                className="tip-item"
                            >

                                {tip}

                            </div>

                        ))
                    }

                </div>

            </div>

        </div>

    );

}

export default AIWorkspace;