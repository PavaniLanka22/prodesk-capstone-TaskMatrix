import { useEffect, useState } from "react";

import {
    FiBriefcase,
    FiMail,
    FiUser,
    FiUsers,
    FiX,
} from "react-icons/fi";


function EditMemberModal({

    open,

    member,

    onClose,

    onSave,

}) {

    const [formData, setFormData] = useState({

        name: "",

        email: "",

        role: "Developer",

        department: "Engineering",

        status: "Offline",

    });


    const [saving, setSaving] = useState(false);


    // ==================================================
    // LOAD SELECTED MEMBER
    // ==================================================

    useEffect(() => {

        if (member) {

            setFormData({

                name:
                    member.name || "",

                email:
                    member.email || "",

                role:
                    member.role || "Developer",

                department:
                    member.department ||
                    "Engineering",

                status:
                    member.status || "Offline",

            });

        }

    }, [member]);


    if (!open || !member) {

        return null;

    }


    // ==================================================
    // HANDLE INPUT CHANGE
    // ==================================================

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;


        setFormData(
            previousData => ({

                ...previousData,

                [name]: value,

            })
        );

    };


    // ==================================================
    // SAVE MEMBER
    // ==================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            setSaving(true);


            await onSave({

                ...member,

                ...formData,

            });

        } finally {

            setSaving(false);

        }

    };


    return (

        <div

            className="modal-overlay"

            onClick={onClose}

        >

            <div

                className="invite-modal"

                onClick={(e) =>
                    e.stopPropagation()
                }

            >

                {/* =====================================
                    HEADER
                ====================================== */}

                <div className="invite-header">

                    <div className="invite-icon">

                        <FiUser />

                    </div>


                    <div>

                        <h2>

                            Edit Member

                        </h2>

                        <p>

                            Update member information.

                        </p>

                    </div>


                    <button

                        className="close-btn"

                        type="button"

                        onClick={onClose}

                    >

                        <FiX />

                    </button>

                </div>


                {/* =====================================
                    FORM
                ====================================== */}

                <form

                    className="invite-form"

                    onSubmit={handleSubmit}

                >

                    {/* NAME */}

                    <div className="form-group">

                        <label>

                            Full Name

                        </label>


                        <div className="input-icon">

                            <FiUser />

                            <input

                                type="text"

                                name="name"

                                value={
                                    formData.name
                                }

                                onChange={
                                    handleChange
                                }

                                required

                            />

                        </div>

                    </div>


                    {/* EMAIL */}

                    <div className="form-group">

                        <label>

                            Email

                        </label>


                        <div className="input-icon">

                            <FiMail />

                            <input

                                type="email"

                                name="email"

                                value={
                                    formData.email
                                }

                                onChange={
                                    handleChange
                                }

                                required

                            />

                        </div>

                    </div>


                    {/* ROLE + DEPARTMENT */}

                    <div className="form-row">

                        <div className="form-group">

                            <label>

                                Role

                            </label>


                            <div className="input-icon">

                                <FiBriefcase />

                                <select

                                    name="role"

                                    value={
                                        formData.role
                                    }

                                    onChange={
                                        handleChange
                                    }

                                >

                                    <option value="Admin">

                                        Admin

                                    </option>

                                    <option value="Manager">

                                        Manager

                                    </option>

                                    <option value="Developer">

                                        Developer

                                    </option>

                                    <option value="Tester">

                                        Tester

                                    </option>

                                    <option value="Viewer">

                                        Viewer

                                    </option>

                                </select>

                            </div>

                        </div>


                        <div className="form-group">

                            <label>

                                Department

                            </label>


                            <div className="input-icon">

                                <FiUsers />

                                <select

                                    name="department"

                                    value={
                                        formData.department
                                    }

                                    onChange={
                                        handleChange
                                    }

                                >

                                    <option value="Engineering">

                                        Engineering

                                    </option>

                                    <option value="Frontend">

                                        Frontend

                                    </option>

                                    <option value="Backend">

                                        Backend

                                    </option>

                                    <option value="QA">

                                        QA

                                    </option>

                                    <option value="Management">

                                        Management

                                    </option>

                                    <option value="Design">

                                        Design

                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>


                    {/* STATUS */}

                    <div className="form-group">

                        <label>

                            Status

                        </label>


                        <div className="input-icon">

                            <FiUsers />

                            <select

                                name="status"

                                value={
                                    formData.status
                                }

                                onChange={
                                    handleChange
                                }

                            >

                                <option value="Online">

                                    Online

                                </option>

                                <option value="Offline">

                                    Offline

                                </option>

                            </select>

                        </div>

                    </div>


                    {/* FOOTER */}

                    <div className="invite-footer">

                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={onClose}

                            disabled={saving}

                        >

                            Cancel

                        </button>


                        <button

                            className="invite-btn"

                            type="submit"

                            disabled={saving}

                        >

                            {saving

                                ? "Saving..."

                                : "Save Changes"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}


export default EditMemberModal;