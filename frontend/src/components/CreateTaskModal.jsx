import axios from "axios";

import {
    AlignLeft,
    Calendar,
    ClipboardList,
    Flag,
    FolderKanban
} from "lucide-react";

import { useEffect, useState } from "react";

import { toast } from "react-toastify";


function CreateTaskModal({

    open,

    onClose,

    onTaskCreated

}) {

    const token = localStorage.getItem("token");

    const API_URL = import.meta.env.VITE_API_URL;


    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(false);


    const [task, setTask] = useState({

        title: "",

        description: "",

        priority: "Medium",

        status: "Todo",

        dueDate: "",

        project: ""

    });


    useEffect(() => {

        if (open) {

            fetchProjects();

        }

    }, [open]);


    const fetchProjects = async () => {

        try {

            const response = await axios.get(

                `${API_URL}/api/projects`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setProjects(

                response.data.projects || []

            );

        }

        catch (error) {

            console.log(

                "Error fetching projects:",

                error.response?.data || error.message

            );

            toast.error(

                error.response?.data?.message ||

                "Unable to load projects."

            );

        }

    };


    if (!open) return null;


    const handleChange = (e) => {

        setTask({

            ...task,

            [e.target.name]: e.target.value

        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);


        try {

            const response = await axios.post(

                `${API_URL}/api/tasks`,

                task,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );


            toast.success(

                "Task created successfully!"

            );


            onTaskCreated(

                response.data.task

            );


            setTask({

                title: "",

                description: "",

                priority: "Medium",

                status: "Todo",

                dueDate: "",

                project: ""

            });


            onClose();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to create task."

            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div

            className="modal-overlay"

            onClick={onClose}

        >

            <div

                className="task-modal"

                onClick={(e) =>

                    e.stopPropagation()

                }

            >

                <div className="task-modal-header">

                    <div className="task-modal-icon">

                        <ClipboardList size={28} />

                    </div>

                    <div>

                        <h2>

                            Create New Task

                        </h2>

                        <p>

                            Create a task and assign it to your project.

                        </p>

                    </div>

                </div>


                <form

                    className="task-form"

                    onSubmit={handleSubmit}

                >


                    <div className="form-group">

                        <label>

                            Task Title

                        </label>

                        <div className="input-icon">

                            <ClipboardList size={18} />

                            <input

                                type="text"

                                name="title"

                                placeholder="Enter task title"

                                value={task.title}

                                onChange={handleChange}

                                required

                            />

                        </div>

                    </div>


                    <div className="form-group">

                        <label>

                            Project

                        </label>

                        <div className="input-icon">

                            <FolderKanban size={18} />

                            <select

                                name="project"

                                value={task.project}

                                onChange={handleChange}

                                required

                            >

                                <option value="">

                                    Select Project

                                </option>


                                {

                                    projects.map(

                                        (project) => (

                                            <option

                                                key={project._id}

                                                value={project._id}

                                            >

                                                {project.name}

                                            </option>

                                        )

                                    )

                                }

                            </select>

                        </div>

                    </div>


                    <div className="form-group full-width">

                        <label>

                            Description

                        </label>

                        <div className="input-icon textarea-icon">

                            <AlignLeft size={18} />

                            <textarea

                                rows="5"

                                name="description"

                                value={task.description}

                                onChange={handleChange}

                                placeholder="Describe the task..."

                            />

                        </div>

                    </div>


                    <div className="form-group">

                        <label>

                            Due Date

                        </label>

                        <div className="input-icon">

                            <Calendar size={18} />

                            <input

                                type="date"

                                name="dueDate"

                                value={task.dueDate}

                                onChange={handleChange}

                            />

                        </div>

                    </div>


                    <div className="form-group">

                        <label>

                            Priority

                        </label>

                        <div className="input-icon">

                            <Flag size={18} />

                            <select

                                name="priority"

                                value={task.priority}

                                onChange={handleChange}

                            >

                                <option>

                                    Low

                                </option>

                                <option>

                                    Medium

                                </option>

                                <option>

                                    High

                                </option>

                            </select>

                        </div>

                    </div>


                    <div className="form-group">

                        <label>

                            Status

                        </label>

                        <div className="input-icon">

                            <ClipboardList size={18} />

                            <select

                                name="status"

                                value={task.status}

                                onChange={handleChange}

                            >

                                <option>

                                    Todo

                                </option>

                                <option>

                                    In Progress

                                </option>

                                <option>

                                    Review

                                </option>

                                <option>

                                    Completed

                                </option>

                            </select>

                        </div>

                    </div>


                    <div></div>


                    <div className="task-modal-footer">

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

                            disabled={loading}

                        >

                            {

                                loading

                                    ?

                                    "Creating..."

                                    :

                                    "Create Task"

                            }

                        </button>

                    </div>


                </form>

            </div>

        </div>

    );

}


export default CreateTaskModal;