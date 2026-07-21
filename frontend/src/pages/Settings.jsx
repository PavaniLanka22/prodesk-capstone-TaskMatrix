import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import ProfileSettings from "../components/ProfileSettings";
import WorkspaceSettings from "../components/WorkspaceSettings";
import AppearanceSettings from "../components/AppearanceSettings";
import NotificationSettings from "../components/NotificationSettings";
import SecuritySettings from "../components/SecuritySettings";

import {
    FiUser,
    FiHome,
    FiMonitor,
    FiBell,
    FiLock
} from "react-icons/fi";

import "../styles/settings.css";

function Settings() {

    const [activeTab, setActiveTab] = useState("profile");

    const tabs = [

        {
            id: "profile",
            title: "Profile",
            icon: <FiUser />
        },

        {
            id: "workspace",
            title: "Workspace",
            icon: <FiHome />
        },

        {
            id: "appearance",
            title: "Appearance",
            icon: <FiMonitor />
        },

        {
            id: "notifications",
            title: "Notifications",
            icon: <FiBell />
        },

        {
            id: "security",
            title: "Security",
            icon: <FiLock />
        }

    ];

    return (

<div className="dashboard-container">

<Sidebar/>

<div className="main-content">

<Navbar/>

<div className="settings-page">

<div className="settings-header">

<h1>

Settings

</h1>

<p>

Manage your account and workspace preferences.

</p>

</div>

<div className="settings-layout">

<div className="settings-sidebar">

{

tabs.map(tab=>(

<button

key={tab.id}

className={

activeTab===tab.id

?

"settings-tab active"

:

"settings-tab"

}

onClick={()=>setActiveTab(tab.id)}

>

<span>

{tab.icon}

</span>

{tab.title}

</button>

))

}

</div>

<div className="settings-content">


    
{

activeTab==="profile"

&&

<ProfileSettings/>

}

{

activeTab==="workspace"

&&

<WorkspaceSettings/>

}

{

activeTab==="appearance"

&&

<AppearanceSettings/>

}

{

activeTab==="notifications"

&&

<NotificationSettings/>

}

{

activeTab==="security"

&&

<SecuritySettings/>

}

</div>

</div>

</div>

</div>

</div>

);

}

export default Settings;