import {
    FiCalendar,
    FiEdit2,
    FiFolder,
    FiTrash2
} from "react-icons/fi";

import { MdOutlineTaskAlt } from "react-icons/md";

function TaskCard({

    task,

    onEdit,

    onDelete

}) {

    const priorityColor = () => {

        switch (task.priority) {

            case "High":

                return "priority high";

            case "Medium":

                return "priority medium";

            default:

                return "priority low";

        }

    };

    const statusColor = () => {

        switch (task.status) {

            case "Completed":

                return "status completed";

            case "In Progress":

                return "status progress";

            case "Review":

                return "status review";

            default:

                return "status todo";

        }

    };

    return (

        <div className="task-card">

            <div className="task-card-header">

                <div className="task-icon">

                    <MdOutlineTaskAlt />

                </div>

                <div className="task-menu">

                    <button

                        className="icon-btn"

                        onClick={onEdit}

                        title="Edit Task"

                    >

                        <FiEdit2 />

                    </button>

                    <button

                        className="icon-btn delete"

                        onClick={onDelete}

                        title="Delete Task"

                    >

                        <FiTrash2 />

                    </button>

                </div>

            </div>

            <h3 className="task-title">

                {task.title}

            </h3>

            <p className="task-description">

                {

                    task.description ||

                    "No description available."

                }

            </p>

            <div className="badge-row">

                <span className={priorityColor()}>

                    {task.priority}

                </span>

                <span className={statusColor()}>

                    {task.status}

                </span>

            </div>

            <div className="task-divider"></div>

            <div className="task-info">

                <div className="info-item">

                    <FiFolder />

                    <span>

                        {

                            task.project?.name ||

                            "No Project"

                        }

                    </span>

                </div>

                <div className="info-item">

                    <FiCalendar />

                    <span>

                        {

                            task.dueDate

                                ?

                                new Date(

                                    task.dueDate

                                ).toLocaleDateString()

                                :

                                "No Due Date"

                        }

                    </span>

                </div>

            </div>

        </div>

    );

}

export default TaskCard;