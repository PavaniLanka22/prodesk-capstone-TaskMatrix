import axios from "axios";

import {
    useEffect,
    useState
} from "react";

import {
    toast
} from "react-toastify";


function EditProjectModal({

    open,

    onClose,

    project,

    onProjectUpdated

}) {

    const API_URL = import.meta.env.VITE_API_URL;


    const [formData, setFormData] = useState({

        name: "",

        description: "",

        category: "Full Stack",

        dueDate: "",

        progress: 0

    });


    useEffect(() => {

        if (project) {

            setFormData({

                name: project.name || "",

                description:
                    project.description || "",

                category:
                    project.category || "Full Stack",

                dueDate:

                    project.dueDate

                        ? project.dueDate.substring(0, 10)

                        : "",

                progress:
                    project.progress || 0

            });

        }

    }, [project]);


    if (!open) return null;


    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:

                e.target.name === "progress"

                    ? Number(e.target.value)

                    : e.target.value

        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const response = await axios.put(

                `${API_URL}/api/projects/${project._id}`,

                formData,

                {

                    headers: {

                        Authorization:

                            `Bearer ${localStorage.getItem("token")}`

                    }

                }

            );


            if (onProjectUpdated) {

                onProjectUpdated(

                    response.data.project

                );

            }


            toast.success(

                "Project updated successfully!"

            );


            onClose();

        }


        catch (error) {

            console.error(

                "Update project error:",

                error

            );


            toast.error(

                error.response?.data?.message ||

                "Failed to update project."

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

                onClick={(e) =>

                    e.stopPropagation()

                }

            >

                <h2>

                    Edit Project

                </h2>


                <p className="modal-subtitle">

                    Update project information.

                </p>


                <form

                    onSubmit={handleSubmit}

                >

                    <label>

                        Project Name

                    </label>


                    <input

                        name="name"

                        value={formData.name}

                        onChange={handleChange}

                        required

                    />


                    <label>

                        Description

                    </label>


                    <textarea

                        rows="4"

                        name="description"

                        value={formData.description}

                        onChange={handleChange}

                    />


                    <label>

                        Category

                    </label>


                    <select

                        name="category"

                        value={formData.category}

                        onChange={handleChange}

                    >

                        <option value="Frontend">

                            Frontend

                        </option>


                        <option value="Backend">

                            Backend

                        </option>


                        <option value="Full Stack">

                            Full Stack

                        </option>


                        <option value="Mobile">

                            Mobile

                        </option>

                    </select>


                    <label>

                        Due Date

                    </label>


                    <input

                        type="date"

                        name="dueDate"

                        value={formData.dueDate}

                        onChange={handleChange}

                    />


                    <label>

                        Progress (%)

                    </label>


                    <input

                        type="number"

                        min="0"

                        max="100"

                        name="progress"

                        value={formData.progress}

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

                            className="create-btn"

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


export default EditProjectModal;