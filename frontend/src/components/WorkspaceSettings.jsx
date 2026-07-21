import { useState } from "react";

import {
    FiGlobe,
    FiSave,
    FiBriefcase,
    FiClock,
    FiCalendar
} from "react-icons/fi";

import { toast } from "react-toastify";

function WorkspaceSettings() {

    const [workspace, setWorkspace] = useState({

        workspaceName: "TaskMatrix",

        company: "TaskMatrix Inc.",

        timezone: "Asia/Kolkata",

        language: "English",

        dateFormat: "DD/MM/YYYY",

        autoSave: true

    });

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setWorkspace({

            ...workspace,

            [name]: type === "checkbox" ? checked : value

        });

    };

    const saveWorkspace = () => {

        toast.success("Workspace settings updated.");

    };

    return (

        <div className="settings-card">

            <div className="settings-card-header">

                <div>

                    <h2>

                        Workspace Settings

                    </h2>

                    <p>

                        Configure your workspace preferences.

                    </p>

                </div>

            </div>

            <div className="settings-form">

                <div className="settings-group">

                    <label>

                        Workspace Name

                    </label>

                    <div className="settings-input">

                        <FiBriefcase/>

                        <input

                            name="workspaceName"

                            value={workspace.workspaceName}

                            onChange={handleChange}

                        />

                    </div>

                </div>

                <div className="settings-group">

                    <label>

                        Company Name

                    </label>

                    <div className="settings-input">

                        <FiBriefcase/>

                        <input

                            name="company"

                            value={workspace.company}

                            onChange={handleChange}

                        />

                    </div>

                </div>

                <div className="settings-row">

                    <div className="settings-group">

                        <label>

                            Time Zone

                        </label>

                        <div className="settings-input">

                            <FiClock/>

                            <select

                                name="timezone"

                                value={workspace.timezone}

                                onChange={handleChange}

                            >

                                <option>Asia/Kolkata</option>

                                <option>Europe/London</option>

                                <option>America/New_York</option>

                                <option>Australia/Sydney</option>

                            </select>

                        </div>

                    </div>

                    <div className="settings-group">

                        <label>

                            Language

                        </label>

                        <div className="settings-input">

                            <FiGlobe/>

                            <select

                                name="language"

                                value={workspace.language}

                                onChange={handleChange}

                            >

                                <option>English</option>

                                <option>French</option>

                                <option>German</option>

                                <option>Spanish</option>

                            </select>

                        </div>

                    </div>

                </div>

                <div className="settings-row">

                    <div className="settings-group">

                        <label>

                            Date Format

                        </label>

                        <div className="settings-input">

                            <FiCalendar/>

                            <select

                                name="dateFormat"

                                value={workspace.dateFormat}

                                onChange={handleChange}

                            >

                                <option>DD/MM/YYYY</option>

                                <option>MM/DD/YYYY</option>

                                <option>YYYY-MM-DD</option>

                            </select>

                        </div>

                    </div>

                    <div className="settings-group">

                        <label>

                            Auto Save

                        </label>

                        <div className="settings-switch">

                            <label className="switch">

                                <input

                                    type="checkbox"

                                    name="autoSave"

                                    checked={workspace.autoSave}

                                    onChange={handleChange}

                                />

                                <span className="slider"></span>

                            </label>

                        </div>

                    </div>

                </div>

                <div className="settings-actions">

                    <button

                        className="save-settings-btn"

                        onClick={saveWorkspace}

                    >

                        <FiSave/>

                        Save Workspace

                    </button>

                </div>

            </div>

        </div>

    );

}

export default WorkspaceSettings;