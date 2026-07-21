import axios from "axios";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

function DeleteTaskModal({

    open,

    task,

    onClose,

    onDeleted

}) {

    const token = localStorage.getItem("token");

    if (!open || !task) return null;

    const handleDelete = async () => {

        try {

            await axios.delete(

                `http://localhost:5000/api/tasks/${task._id}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            toast.success("Task deleted successfully");

            onDeleted();

            onClose();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to delete task."

            );

        }

    };

    return (

        <div

            className="modal-overlay"

            onClick={onClose}

        >

            <div

                className="delete-modal"

                onClick={(e) => e.stopPropagation()}

            >

                <div className="delete-icon">

                    <Trash2 size={40} />

                </div>

                <h2>

                    Delete Task

                </h2>

                <p>

                    Are you sure you want to permanently delete

                </p>

                <h3>

                    "{task.title}"

                </h3>

                <span>

                    This action cannot be undone.

                </span>

                <div className="delete-buttons">

                    <button

                        className="cancel-btn"

                        onClick={onClose}

                    >

                        Cancel

                    </button>

                    <button

                        className="delete-btn"

                        onClick={handleDelete}

                    >

                        Delete Task

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteTaskModal;