import { useState } from "react";

import {
    FiBell,
    FiMail,
    FiSmartphone,
    FiCalendar,
    FiSave
} from "react-icons/fi";

import { toast } from "react-toastify";

function NotificationSettings() {

    const [settings, setSettings] = useState({

        emailNotifications: true,

        desktopNotifications: true,

        taskReminders: true,

        weeklyReports: false,

        mentions: true,

        pushNotifications: true

    });

    const handleChange = (e) => {

        const { name, checked } = e.target;

        setSettings({

            ...settings,

            [name]: checked

        });

    };

    const saveNotifications = () => {

        toast.success("Notification preferences updated.");

    };

    return (

        <div className="settings-card">

            <div className="settings-card-header">

                <div>

                    <h2>

                        Notification Preferences

                    </h2>

                    <p>

                        Choose how you'd like to receive notifications.

                    </p>

                </div>

            </div>

            <div className="settings-form">

                <div className="settings-toggle-card">

                    <div>

                        <h4>

                            <FiMail className="toggle-icon"/>

                            Email Notifications

                        </h4>

                        <p>

                            Receive updates via email.

                        </p>

                    </div>

                    <label className="switch">

                        <input

                            type="checkbox"

                            name="emailNotifications"

                            checked={settings.emailNotifications}

                            onChange={handleChange}

                        />

                        <span className="slider"></span>

                    </label>

                </div>

                <div className="settings-toggle-card">

                    <div>

                        <h4>

                            <FiBell className="toggle-icon"/>

                            Desktop Notifications

                        </h4>

                        <p>

                            Show notifications while using TaskMatrix.

                        </p>

                    </div>

                    <label className="switch">

                        <input

                            type="checkbox"

                            name="desktopNotifications"

                            checked={settings.desktopNotifications}

                            onChange={handleChange}

                        />

                        <span className="slider"></span>

                    </label>

                </div>

                <div className="settings-toggle-card">

                    <div>

                        <h4>

                            <FiCalendar className="toggle-icon"/>

                            Due Date Reminders

                        </h4>

                        <p>

                            Get reminded before task deadlines.

                        </p>

                    </div>

                    <label className="switch">

                        <input

                            type="checkbox"

                            name="taskReminders"

                            checked={settings.taskReminders}

                            onChange={handleChange}

                        />

                        <span className="slider"></span>

                    </label>

                </div>

                <div className="settings-toggle-card">

                    <div>

                        <h4>

                            <FiMail className="toggle-icon"/>

                            Weekly Reports

                        </h4>

                        <p>

                            Receive a weekly productivity summary.

                        </p>

                    </div>

                    <label className="switch">

                        <input

                            type="checkbox"

                            name="weeklyReports"

                            checked={settings.weeklyReports}

                            onChange={handleChange}

                        />

                        <span className="slider"></span>

                    </label>

                </div>

                <div className="settings-toggle-card">

                    <div>

                        <h4>

                            @ Mentions

                        </h4>

                        <p>

                            Notify when someone mentions you.

                        </p>

                    </div>

                    <label className="switch">

                        <input

                            type="checkbox"

                            name="mentions"

                            checked={settings.mentions}

                            onChange={handleChange}

                        />

                        <span className="slider"></span>

                    </label>

                </div>

                <div className="settings-toggle-card">

                    <div>

                        <h4>

                            <FiSmartphone className="toggle-icon"/>

                            Push Notifications

                        </h4>

                        <p>

                            Receive mobile push notifications.

                        </p>

                    </div>

                    <label className="switch">

                        <input

                            type="checkbox"

                            name="pushNotifications"

                            checked={settings.pushNotifications}

                            onChange={handleChange}

                        />

                        <span className="slider"></span>

                    </label>

                </div>

                <div className="settings-actions">

                    <button

                        className="save-settings-btn"

                        onClick={saveNotifications}

                    >

                        <FiSave/>

                        Save Preferences

                    </button>

                </div>

            </div>

        </div>

    );

}

export default NotificationSettings;