import axios from "axios";
import { toast } from "react-toastify";

import {
    FiCalendar,
    FiEdit2,
    FiFolder,
    FiTrash2
} from "react-icons/fi";

import {
    MdOutlineTaskAlt
} from "react-icons/md";

function KanbanCard({

    task,

    onEdit,

    onDeleted

}) {

    const token = localStorage.getItem("token");

    const deleteTask = async () => {

        if (!window.confirm(`Delete "${task.title}"?`)) return;

        try {

            await axios.delete(

                `http://localhost:5000/api/tasks/${task._id}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            toast.success("Task deleted");

            onDeleted();

        }

        catch {

            toast.error("Unable to delete task.");

        }

    };

    const priorityClass = () => {

        switch (task.priority) {

            case "High":

                return "priority high";

            case "Medium":

                return "priority medium";

            default:

                return "priority low";

        }

    };

    return (

        <div className="kanban-card">

            <div className="kanban-card-header">

                <div className="kanban-icon">

                    <MdOutlineTaskAlt />

                </div>

                <div className="kanban-actions">

                    <button

                        className="kanban-icon-btn"

                        onClick={onEdit}

                    >

                        <FiEdit2 />

                    </button>

                    <button

                        className="kanban-icon-btn delete"

                        onClick={deleteTask}

                    >

                        <FiTrash2 />

                    </button>

                </div>

            </div>

            <h3 className="kanban-title">

                {task.title}

            </h3>

            <p className="kanban-description">

                {task.description || "No description"}

            </p>

            <div className="kanban-tags">

                <span className={priorityClass()}>

                    {task.priority}

                </span>
            </div>

            <div className="kanban-divider"></div>

            <div className="kanban-meta">

                <div className="meta-item">

                    <FiFolder />

                    <span>

                        {task.project?.name || "No Project"}

                    </span>

                </div>

                <div className="meta-item">

                    <FiCalendar />

                    <span>

                        {task.dueDate
                            ? new Date(task.dueDate).toLocaleDateString()
                            : "No Date"}

                    </span>

                </div>

            </div>

        </div>

    );

}

export default KanbanCard;