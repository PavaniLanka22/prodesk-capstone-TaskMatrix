import { useEffect, useState } from "react";

import {
    FiBriefcase,
    FiMail,
    FiUser,
    FiUsers,
    FiX
} from "react-icons/fi";

function EditMemberModal({

    open,

    member,

    onClose,

    onSave

}) {

    const [formData, setFormData] = useState({

        name: "",

        email: "",

        role: "Developer",

        department: "Engineering",

        status: "Online"

    });

    useEffect(() => {

        if (member) {

            setFormData(member);

        }

    }, [member]);

    if (!open || !member) return null;

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSave(formData);

    };

    return (

        <div

            className="modal-overlay"

            onClick={onClose}

        >

            <div

                className="invite-modal"

                onClick={(e)=>e.stopPropagation()}

            >

                <div className="invite-header">

                    <div className="invite-icon">

                        <FiUser/>

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

                        onClick={onClose}

                    >

                        <FiX/>

                    </button>

                </div>

                <form

                    className="invite-form"

                    onSubmit={handleSubmit}

                >

                    <div className="form-group">

                        <label>

                            Full Name

                        </label>

                        <div className="input-icon">

                            <FiUser/>

                            <input

                                name="name"

                                value={formData.name}

                                onChange={handleChange}

                                required

                            />

                        </div>

                    </div>

                    <div className="form-group">

                        <label>

                            Email

                        </label>

                        <div className="input-icon">

                            <FiMail/>

                            <input

                                type="email"

                                name="email"

                                value={formData.email}

                                onChange={handleChange}

                                required

                            />

                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group">

                            <label>

                                Role

                            </label>

                            <div className="input-icon">

                                <FiBriefcase/>

                                <select

                                    name="role"

                                    value={formData.role}

                                    onChange={handleChange}

                                >

                                    <option>Admin</option>

                                    <option>Manager</option>

                                    <option>Developer</option>

                                    <option>Tester</option>

                                    <option>Viewer</option>

                                </select>

                            </div>

                        </div>

                        <div className="form-group">

                            <label>

                                Department

                            </label>

                            <div className="input-icon">

                                <FiUsers/>

                                <select

                                    name="department"

                                    value={formData.department}

                                    onChange={handleChange}

                                >

                                    <option>Engineering</option>

                                    <option>Frontend</option>

                                    <option>Backend</option>

                                    <option>QA</option>

                                    <option>Management</option>

                                    <option>Design</option>

                                </select>

                            </div>

                        </div>

                    </div>

                    <div className="form-group">

                        <label>

                            Status

                        </label>

                        <div className="input-icon">

                            <FiUsers/>

                            <select

                                name="status"

                                value={formData.status}

                                onChange={handleChange}

                            >

                                <option>Online</option>

                                <option>Offline</option>

                            </select>

                        </div>

                    </div>

                    <div className="invite-footer">

                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={onClose}

                        >

                            Cancel

                        </button>

                        <button

                            className="invite-btn"

                            type="submit"

                        >

                            Save Changes

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditMemberModal;