import axios from "axios";

import {
    Trash2
} from "lucide-react";

import {
    toast
} from "react-toastify";


function DeleteTaskModal({

    open,

    task,

    tasks,

    setTasks,

    onClose

}) {

    const token = localStorage.getItem("token");

    const API_URL = import.meta.env.VITE_API_URL;


    if (!open || !task) return null;


    const handleDelete = async () => {

        // Backup current tasks
        const previousTasks = [...tasks];


        // Optimistically remove task immediately
        setTasks(

            tasks.filter(

                (t) => t._id !== task._id

            )

        );


        // Close modal immediately
        onClose();


        try {

            await axios.delete(

                `${API_URL}/api/tasks/${task._id}`,

                {

                    headers: {

                        Authorization:

                            `Bearer ${token}`

                    }

                }

            );


            toast.success(

                "Task deleted successfully"

            );

        }


        catch (error) {

            // Restore old data if API fails
            setTasks(

                previousTasks

            );


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

                onClick={(e) =>

                    e.stopPropagation()

                }

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