import { useState } from "react";

import {
    FiLock,
    FiShield,
    FiMonitor,
    FiTrash2,
    FiLogOut,
    FiSave
} from "react-icons/fi";

import { toast } from "react-toastify";

function SecuritySettings() {

    const [password, setPassword] = useState({

        current: "",

        newPassword: "",

        confirmPassword: ""

    });

    const [twoFactor, setTwoFactor] = useState(false);

    const handleChange = (e) => {

        setPassword({

            ...password,

            [e.target.name]: e.target.value

        });

    };

    const changePassword = () => {

        if(password.newPassword!==password.confirmPassword){

            toast.error("Passwords do not match.");

            return;

        }

        toast.success("Password updated successfully.");

        setPassword({

            current:"",

            newPassword:"",

            confirmPassword:""

        });

    };

    return(

<div className="settings-card">

<div className="settings-card-header">

<div>

<h2>

Security

</h2>

<p>

Manage your account security and login settings.

</p>

</div>

</div>

<div className="settings-form">

<div className="settings-group">

<label>

Current Password

</label>

<div className="settings-input">

<FiLock/>

<input

type="password"

name="current"

value={password.current}

onChange={handleChange}

/>

</div>

</div>

<div className="settings-row">

<div className="settings-group">

<label>

New Password

</label>

<div className="settings-input">

<FiLock/>

<input

type="password"

name="newPassword"

value={password.newPassword}

onChange={handleChange}

/>

</div>

</div>

<div className="settings-group">

<label>

Confirm Password

</label>

<div className="settings-input">

<FiLock/>

<input

type="password"

name="confirmPassword"

value={password.confirmPassword}

onChange={handleChange}

/>

</div>

</div>

</div>

<div className="settings-actions">

<button

className="save-settings-btn"

onClick={changePassword}

>

<FiSave/>

Update Password

</button>

</div>

<hr className="settings-divider"/>

<div className="settings-toggle-card">

<div>

<h4>

<FiShield className="toggle-icon"/>

Two-Factor Authentication

</h4>

<p>

Protect your account with an additional verification step.

</p>

</div>

<label className="switch">

<input

type="checkbox"

checked={twoFactor}

onChange={()=>setTwoFactor(!twoFactor)}

/>

<span className="slider"></span>

</label>

</div>

<hr className="settings-divider"/>

<div className="security-session">

<div>

<h4>

<FiMonitor className="toggle-icon"/>

Current Device

</h4>

<p>

Windows • Chrome • Active Now

</p>

</div>

<button className="secondary-btn">

This Device

</button>

</div>

<div className="security-session">

<div>

<h4>

<FiLogOut className="toggle-icon"/>

Other Devices

</h4>

<p>

Sign out from all other active sessions.

</p>

</div>

<button

className="danger-outline-btn"

onClick={()=>toast.success("Signed out from all devices.")}

>

Sign Out

</button>

</div>

<hr className="settings-divider"/>

<div className="danger-zone">

<h3>

Danger Zone

</h3>

<p>

Deleting your account is permanent and cannot be undone.

</p>

<button

className="delete-account-btn"

onClick={()=>toast.error("Delete functionality disabled in demo.")}

>

<FiTrash2/>

Delete Account

</button>

</div>

</div>

</div>

    );

}

export default SecuritySettings;