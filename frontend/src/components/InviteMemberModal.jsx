import { useState } from "react";

import {
    FiBriefcase,
    FiMail,
    FiUser,
    FiUsers,
    FiX
} from "react-icons/fi";

import { toast } from "react-toastify";

function InviteMemberModal({

    open,

    onClose,

    onInvite

}) {

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        name: "",

        email: "",

        role: "Developer",

        department: "Engineering"

    });

    if (!open) return null;

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        setLoading(true);

        setTimeout(() => {

            const newMember = {

                name: formData.name,

                email: formData.email,

                role: formData.role,

                department: formData.department,

                status: "Online"

            };

            if (onInvite) {

                onInvite(newMember);

            }

            toast.success("Invitation sent successfully.");

            setLoading(false);

            setFormData({

                name: "",

                email: "",

                role: "Developer",

                department: "Engineering"

            });

            onClose();

        }, 700);

    };

    return (

        <div

            className="modal-overlay"

            onClick={onClose}

        >

            <div

                className="invite-modal"

                onClick={(e) => e.stopPropagation()}

            >

                <div className="invite-header">

                    <div className="invite-icon">

                        <FiUsers />

                    </div>

                    <div>

                        <h2>

                            Invite Team Member

                        </h2>

                        <p>

                            Invite people into your workspace and assign roles.

                        </p>

                    </div>

                    <button

                        className="close-btn"

                        onClick={onClose}

                    >

                        <FiX />

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

                            <FiUser />

                            <input

                                type="text"

                                name="name"

                                placeholder="John Doe"

                                value={formData.name}

                                onChange={handleChange}

                                required

                            />

                        </div>

                    </div>

                    <div className="form-group">

                        <label>

                            Email Address

                        </label>

                        <div className="input-icon">

                            <FiMail />

                            <input

                                type="email"

                                name="email"

                                placeholder="john@email.com"

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

                                <FiBriefcase />

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

                                <FiUsers />

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

                    <div className="invite-footer">

                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={onClose}

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="invite-btn"

                            disabled={loading}

                        >

                            {

                                loading

                                    ?

                                    "Sending..."

                                    :

                                    "Send Invitation"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default InviteMemberModal;