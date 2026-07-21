import axios from "axios";
import { useEffect, useMemo, useState } from "react";

import { FiSearch } from "react-icons/fi";

import {
    MdOutlineTaskAlt
} from "react-icons/md";

import {
    FaCheckCircle,
    FaClipboardList,
    FaSpinner
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import TaskCard from "../components/TaskCard";

import CreateTaskModal from "../components/CreateTaskModal";
import DeleteTaskModal from "../components/DeleteTaskModal";
import EditTaskModal from "../components/EditTaskModal";

import "../styles/tasks.css";

function Tasks() {

    const token = localStorage.getItem("token");

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showCreateModal, setShowCreateModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedTask, setSelectedTask] = useState(null);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [priorityFilter, setPriorityFilter] = useState("All");

    useEffect(() => {

        fetchTasks();

    }, []);

    const fetchTasks = async () => {

        try {

            setLoading(true);

            const response = await axios.get(

                "http://localhost:5000/api/tasks",

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setTasks(response.data.tasks);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    const filteredTasks = useMemo(() => {

        return tasks.filter((task) => {

            const matchesSearch =

                task.title
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                task.description
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const matchesStatus =

                statusFilter === "All"

                    ? true

                    : task.status === statusFilter;

            const matchesPriority =

                priorityFilter === "All"

                    ? true

                    : task.priority === priorityFilter;

            return (

                matchesSearch &&

                matchesStatus &&

                matchesPriority

            );

        });

    }, [

        tasks,

        search,

        statusFilter,

        priorityFilter

    ]);

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(

        (task) => task.status === "Completed"

    ).length;

    const progressTasks = tasks.filter(

        (task) => task.status === "In Progress"

    ).length;

    const todoTasks = tasks.filter(

        (task) => task.status === "Todo"

    ).length;

        return (

        <div className="dashboard-container">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <div className="tasks-page">

                    <div className="page-header">

                        <div>

                            <h1>

                                Tasks

                            </h1>

                            <p>

                                Plan, organize and track every task from one workspace.

                            </p>

                        </div>

                        <button

                            className="new-task-btn"

                            onClick={() =>

                                setShowCreateModal(true)

                            }

                        >

                            + New Task

                        </button>

                    </div>

                    <div className="stats-grid">

                        <div className="stats-card">

                            <FaClipboardList className="stats-icon"/>

                            <div>

                                <h3>

                                    Total Tasks

                                </h3>

                                <h2>

                                    {totalTasks}

                                </h2>

                            </div>

                        </div>

                        <div className="stats-card">

                            <FaCheckCircle

                                className="stats-icon success"

                            />

                            <div>

                                <h3>

                                    Completed

                                </h3>

                                <h2>

                                    {completedTasks}

                                </h2>

                            </div>

                        </div>

                        <div className="stats-card">

                            <FaSpinner

                                className="stats-icon warning"

                            />

                            <div>

                                <h3>

                                    In Progress

                                </h3>

                                <h2>

                                    {progressTasks}

                                </h2>

                            </div>

                        </div>

                        <div className="stats-card">

                            <MdOutlineTaskAlt

                                className="stats-icon purple"

                            />

                            <div>

                                <h3>

                                    Todo

                                </h3>

                                <h2>

                                    {todoTasks}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="task-toolbar">

                        <div className="search-box">

                            <FiSearch />

                            <input

                                type="text"

                                placeholder="Search tasks..."

                                value={search}

                                onChange={(e) =>

                                    setSearch(

                                        e.target.value

                                    )

                                }

                            />

                        </div>

                        <div className="filter-group">

                            <select

                                value={statusFilter}

                                onChange={(e) =>

                                    setStatusFilter(

                                        e.target.value

                                    )

                                }

                            >

                                <option value="All">

                                    Status

                                </option>

                                <option value="Todo">

                                    Todo

                                </option>

                                <option value="In Progress">

                                    In Progress

                                </option>

                                <option value="Review">

                                    Review

                                </option>

                                <option value="Completed">

                                    Completed

                                </option>

                            </select>

                        </div>

                        <div className="filter-group">

                            <select

                                value={priorityFilter}

                                onChange={(e) =>

                                    setPriorityFilter(

                                        e.target.value

                                    )

                                }

                            >

                                <option value="All">

                                    Priority

                                </option>

                                <option value="Low">

                                    Low

                                </option>

                                <option value="Medium">

                                    Medium

                                </option>

                                <option value="High">

                                    High

                                </option>

                            </select>

                        </div>

                    </div>

                                        {

                        loading

                        ?

                        (

                            <div className="loading-state">

                                Loading tasks...

                            </div>

                        )

                        :

                        filteredTasks.length === 0

                        ?

                        (

                            <div className="empty-state">

                                <h2>

                                    No Tasks Found

                                </h2>

                                <p>

                                    Create your first task to start managing your work.

                                </p>

                            </div>

                        )

                        :

                        (

                            <div className="projects-grid">

                                {

                                    filteredTasks.map((task) => (

                                        <TaskCard

                                            key={task._id}

                                            task={task}

                                            onEdit={() => {

                                                setSelectedTask(task);

                                                setShowEditModal(true);

                                            }}

                                            onDelete={() => {

                                                setSelectedTask(task);

                                                setShowDeleteModal(true);

                                            }}

                                        />

                                    ))

                                }

                            </div>

                        )

                    }

                </div>

            </div>

            <CreateTaskModal

                open={showCreateModal}

                onClose={() =>

                    setShowCreateModal(false)

                }

                onTaskCreated={fetchTasks}

            />

            <EditTaskModal

                open={showEditModal}

                task={selectedTask}

                onClose={() => {

                    setShowEditModal(false);

                    setSelectedTask(null);

                }}

                onTaskUpdated={fetchTasks}

            />

            <DeleteTaskModal

    open={showDeleteModal}

    task={selectedTask}

    tasks={tasks}

    setTasks={setTasks}

    onClose={() => {

        setShowDeleteModal(false);

        setSelectedTask(null);

    }}

/>

        </div>

    );

}

export default Tasks;