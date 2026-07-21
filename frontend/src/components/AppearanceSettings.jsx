import axios from "axios";

import {
    useState
} from "react";

import {
    FiMonitor,
    FiMoon,
    FiSave,
    FiSun
} from "react-icons/fi";

import {
    toast
} from "react-toastify";


function AppearanceSettings() {

    const API_URL = import.meta.env.VITE_API_URL;


    const [settings, setSettings] = useState({

        theme: "Light",

        compact: false,

        sidebarCollapsed: false,

        accent: "#6C63FF"

    });


    const colors = [

        "#6C63FF",

        "#3B82F6",

        "#10B981",

        "#F59E0B",

        "#EF4444",

        "#8B5CF6"

    ];


    const handleChange = (e) => {

        const {

            name,

            value,

            checked,

            type

        } = e.target;


        setSettings({

            ...settings,

            [name]:

                type === "checkbox"

                    ?

                    checked

                    :

                    value

        });

    };


    const saveAppearance = () => {

        toast.success(

            "Appearance updated successfully."

        );

    };


    const upgradeToPro = async () => {

        try {

            const token = localStorage.getItem(

                "token"

            );


            if (!token) {

                toast.error(

                    "Please log in before upgrading."

                );

                return;

            }


            const response = await axios.post(

                `${API_URL}/api/payment/create-checkout-session`,

                {},

                {

                    headers: {

                        Authorization:

                            `Bearer ${token}`

                    }

                }

            );


            if (response.data?.url) {

                window.location.href =

                    response.data.url;

            }

            else {

                toast.error(

                    "Stripe Checkout URL was not returned."

                );

            }

        }

        catch (error) {

            console.error(

                "Stripe Checkout error:",

                error

            );


            toast.error(

                error.response?.data?.message ||

                "Unable to start Stripe Checkout."

            );

        }

    };


    return (

        <div className="settings-card">

            <div className="settings-card-header">

                <div>

                    <h2>

                        Appearance

                    </h2>


                    <p>

                        Personalize your workspace.

                    </p>

                </div>

            </div>


            <div className="settings-form">

                <div className="settings-group">

                    <label>

                        Theme

                    </label>


                    <div className="theme-selector">

                        <button

                            className={

                                settings.theme === "Light"

                                    ?

                                    "theme-card active"

                                    :

                                    "theme-card"

                            }

                            onClick={() =>

                                setSettings({

                                    ...settings,

                                    theme: "Light"

                                })

                            }

                        >

                            <FiSun size={24} />


                            <span>

                                Light

                            </span>

                        </button>


                        <button

                            className={

                                settings.theme === "Dark"

                                    ?

                                    "theme-card active"

                                    :

                                    "theme-card"

                            }

                            onClick={() =>

                                setSettings({

                                    ...settings,

                                    theme: "Dark"

                                })

                            }

                        >

                            <FiMoon size={24} />


                            <span>

                                Dark

                            </span>

                        </button>


                        <button

                            className={

                                settings.theme === "System"

                                    ?

                                    "theme-card active"

                                    :

                                    "theme-card"

                            }

                            onClick={() =>

                                setSettings({

                                    ...settings,

                                    theme: "System"

                                })

                            }

                        >

                            <FiMonitor size={24} />


                            <span>

                                System

                            </span>

                        </button>

                    </div>

                </div>


                <div className="settings-group">

                    <label>

                        Accent Color

                    </label>


                    <div className="color-picker">

                        {

                            colors.map(

                                (color) => (

                                    <button

                                        key={color}

                                        className={

                                            settings.accent === color

                                                ?

                                                "color-dot active"

                                                :

                                                "color-dot"

                                        }

                                        style={{

                                            background:

                                                color

                                        }}

                                        onClick={() =>

                                            setSettings({

                                                ...settings,

                                                accent:

                                                    color

                                            })

                                        }

                                    />

                                )

                            )

                        }

                    </div>

                </div>


                <div className="settings-row">

                    <div className="settings-toggle-card">

                        <div>

                            <h4>

                                Compact Mode

                            </h4>


                            <p>

                                Reduce spacing across the application.

                            </p>

                        </div>


                        <label className="switch">

                            <input

                                type="checkbox"

                                name="compact"

                                checked={

                                    settings.compact

                                }

                                onChange={

                                    handleChange

                                }

                            />


                            <span className="slider"></span>

                        </label>

                    </div>

                </div>


                <div className="settings-row">

                    <div className="settings-toggle-card">

                        <div>

                            <h4>

                                Collapse Sidebar

                            </h4>


                            <p>

                                Use a compact navigation panel.

                            </p>

                        </div>


                        <label className="switch">

                            <input

                                type="checkbox"

                                name="sidebarCollapsed"

                                checked={

                                    settings.sidebarCollapsed

                                }

                                onChange={

                                    handleChange

                                }

                            />


                            <span className="slider"></span>

                        </label>

                    </div>

                </div>


                <div className="settings-preview">

                    <h4>

                        Live Preview

                    </h4>


                    <div className="preview-card">

                        <div

                            className="preview-header"

                            style={{

                                background:

                                    settings.accent

                            }}

                        >

                            TaskMatrix

                        </div>


                        <div className="preview-body">

                            <div className="preview-box"></div>

                            <div className="preview-box"></div>

                            <div className="preview-box"></div>

                        </div>

                    </div>

                </div>


                <div className="settings-actions">

                    <button

                        className="save-settings-btn"

                        onClick={saveAppearance}

                    >

                        <FiSave />

                        Save Appearance

                    </button>


                    <button

                        className="save-settings-btn"

                        onClick={upgradeToPro}

                        style={{

                            background:

                                "#16a34a"

                        }}

                    >

                        Upgrade to Pro

                    </button>

                </div>

            </div>

        </div>

    );

}


export default AppearanceSettings;