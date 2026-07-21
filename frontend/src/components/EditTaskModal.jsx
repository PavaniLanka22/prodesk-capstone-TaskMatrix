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

function EditTaskModal({

    open,

    onClose,

    task,

    onTaskUpdated

}) {

    const token = localStorage.getItem("token");

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        title: "",

        description: "",

        priority: "Medium",

        status: "Todo",

        dueDate: "",

        project: ""

    });

    useEffect(() => {

        if (!open || !task) return;

        setFormData({

            title: task.title,

            description: task.description,

            priority: task.priority,

            status: task.status,

            dueDate: task.dueDate
                ? task.dueDate.substring(0, 10)
                : "",

            project: task.project?._id || task.project

        });

        fetchProjects();

    }, [open, task]);

    const fetchProjects = async () => {

        try {

            const response = await axios.get(

                "http://localhost:5000/api/projects",

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setProjects(response.data.projects);

        }

        catch (error) {

            console.log(error);

        }

    };

    if (!open) return null;

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await axios.put(

                `http://localhost:5000/api/tasks/${task._id}`,

                formData,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            toast.success("Task updated successfully!");

            onTaskUpdated(response.data.task);

            onClose();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to update task."

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

                onClick={(e) => e.stopPropagation()}

            >

                <div className="task-modal-header">

                    <div className="task-modal-icon">

                        <ClipboardList size={28} />

                    </div>

                    <div>

                        <h2>Edit Task</h2>

                        <p>

                            Modify task information and keep your project organized.

                        </p>

                    </div>

                </div>

                <form

                    className="task-form"

                    onSubmit={handleSubmit}

                >

                    <div className="form-group">

                        <label>Task Title</label>

                        <div className="input-icon">

                            <ClipboardList size={18} />

                            <input

                                type="text"

                                name="title"

                                value={formData.title}

                                onChange={handleChange}

                                required

                            />

                        </div>

                    </div>

                    <div className="form-group">

                        <label>Project</label>

                        <div className="input-icon">

                            <FolderKanban size={18} />

                            <select

                                name="project"

                                value={formData.project}

                                onChange={handleChange}

                            >

                                {

                                    projects.map(project => (

                                        <option

                                            key={project._id}

                                            value={project._id}

                                        >

                                            {project.name}

                                        </option>

                                    ))

                                }

                            </select>

                        </div>

                    </div>

                    <div className="form-group full-width">

                        <label>Description</label>

                        <div className="input-icon textarea-icon">

                            <AlignLeft size={18} />

                            <textarea

                                rows="5"

                                name="description"

                                value={formData.description}

                                onChange={handleChange}

                            />

                        </div>

                    </div>

                    <div className="form-group">

                        <label>Due Date</label>

                        <div className="input-icon">

                            <Calendar size={18} />

                            <input

                                type="date"

                                name="dueDate"

                                value={formData.dueDate}

                                onChange={handleChange}

                            />

                        </div>

                    </div>

                    <div className="form-group">

                        <label>Priority</label>

                        <div className="input-icon">

                            <Flag size={18} />

                            <select

                                name="priority"

                                value={formData.priority}

                                onChange={handleChange}

                            >

                                <option>Low</option>

                                <option>Medium</option>

                                <option>High</option>

                            </select>

                        </div>

                    </div>

                    <div className="form-group">

                        <label>Status</label>

                        <div className="input-icon">

                            <ClipboardList size={18} />

                            <select

                                name="status"

                                value={formData.status}

                                onChange={handleChange}

                            >

                                <option>Todo</option>

                                <option>In Progress</option>

                                <option>Review</option>

                                <option>Completed</option>

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

                                    "Saving..."

                                    :

                                    "Save Changes"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditTaskModal;