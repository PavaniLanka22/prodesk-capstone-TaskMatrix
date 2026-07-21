import { useState } from "react";

import {
    FiCamera,
    FiMail,
    FiSave,
    FiUser
} from "react-icons/fi";

import { toast } from "react-toastify";

function ProfileSettings() {

    const [profile, setProfile] = useState({

        name: "Pavani Lanka",

        email: "pavani@email.com",

        title: "Software Developer",

        bio: "Passionate Full Stack Developer building scalable SaaS applications."

    });

    const handleChange = (e) => {

        setProfile({

            ...profile,

            [e.target.name]: e.target.value

        });

    };

    const saveProfile = () => {

        toast.success("Profile updated successfully.");

    };

    return (

        <div className="settings-card">

            <div className="settings-card-header">

                <div>

                    <h2>

                        Profile Information

                    </h2>

                    <p>

                        Update your personal information.

                    </p>

                </div>

            </div>

            <div className="profile-avatar-section">

                <div className="profile-avatar">

                    PL

                </div>

                <button className="change-avatar-btn">

                    <FiCamera/>

                    Change Photo

                </button>

            </div>

            <div className="settings-form">

                <div className="settings-row">

                    <div className="settings-group">

                        <label>

                            Full Name

                        </label>

                        <div className="settings-input">

                            <FiUser/>

                            <input

                                name="name"

                                value={profile.name}

                                onChange={handleChange}

                            />

                        </div>

                    </div>

                    <div className="settings-group">

                        <label>

                            Email Address

                        </label>

                        <div className="settings-input">

                            <FiMail/>

                            <input

                                type="email"

                                name="email"

                                value={profile.email}

                                onChange={handleChange}

                            />

                        </div>

                    </div>

                </div>

      <div className="settings-group">

    <label>

        Job Title

    </label>

    <div className="settings-input">

        <input

            type="text"

            name="title"

            value={profile.title}

            onChange={handleChange}

            placeholder="Software Developer"

        />

    </div>

</div>

                <div className="settings-group">

                    <label>

                        Bio

                    </label>

                    <textarea

                        rows="5"

                        name="bio"

                        value={profile.bio}

                        onChange={handleChange}

                    />

                </div>

                <div className="settings-actions">

                    <button

                        className="save-settings-btn"

                        onClick={saveProfile}

                    >

                        <FiSave/>

                        Save Changes

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ProfileSettings;