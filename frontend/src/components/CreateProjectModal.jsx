import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

function CreateProjectModal({ open, onClose, onProjectCreated }) {

    const [project, setProject] = useState({

        name: "",

        description: "",

        category: "Full Stack",

        dueDate: ""

    });

    if (!open) return null;

    const handleChange = (e) => {

        setProject({

            ...project,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(

                "http://localhost:5000/api/projects",

                project,

                {

                    headers: {

                        Authorization: `Bearer ${localStorage.getItem("token")}`

                    }

                }

            );

            if (onProjectCreated) {

    onProjectCreated(response.data.project);

}

toast.success("Project created successfully!");

setProject({

                name: "",

                description: "",

                category: "Full Stack",

                dueDate: ""

            });

            onClose();

        }

        catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Failed to create project."

            );

        }

    };

    return (

        <div

            className="modal-overlay"

            onClick={onClose}

        >

            <div

                className="modal"

                onClick={(e) => e.stopPropagation()}

            >

                <h2>Create New Project</h2>

                <p className="modal-subtitle">

                    Fill in the details below.

                </p>

                <form onSubmit={handleSubmit}>

                    <label>Project Name</label>

                    <input

                        type="text"

                        name="name"

                        value={project.name}

                        onChange={handleChange}

                        placeholder="Enter project name"

                        required

                    />

                    <label>Description</label>

                    <textarea

                        name="description"

                        rows="4"

                        value={project.description}

                        onChange={handleChange}

                        placeholder="Enter description"

                    />

                    <label>Category</label>

                    <select

                        name="category"

                        value={project.category}

                        onChange={handleChange}

                    >

                        <option value="Frontend">Frontend</option>

                        <option value="Backend">Backend</option>

                        <option value="Full Stack">Full Stack</option>

                        <option value="Mobile">Mobile</option>

                    </select>

                    <label>Due Date</label>

                    <input

                        type="date"

                        name="dueDate"

                        value={project.dueDate}

                        onChange={handleChange}

                    />

                    <div className="modal-buttons">

                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={onClose}

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="create-btn"

                        >

                            Create Project

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default CreateProjectModal;