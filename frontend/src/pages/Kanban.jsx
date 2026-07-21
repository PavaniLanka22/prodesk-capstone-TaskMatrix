import axios from "axios";
import { useEffect, useMemo, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import KanbanColumn from "../components/KanbanColumn";

import CreateTaskModal from "../components/CreateTaskModal";
import EditTaskModal from "../components/EditTaskModal";

import { FiSearch } from "react-icons/fi";

import {
    FaCheckCircle,
    FaClipboardList,
    FaSpinner
} from "react-icons/fa";

import { MdOutlineTaskAlt } from "react-icons/md";

import "../styles/kanban.css";

function Kanban() {

    const token = localStorage.getItem("token");

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [projectFilter, setProjectFilter] = useState("All");

    const [priorityFilter, setPriorityFilter] = useState("All");

    const [showCreateModal, setShowCreateModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {

        fetchTasks();

    }, []);

    const fetchTasks = async () => {

        try {

            setLoading(true);

            const response = await axios.get(

                "https://prodesk-capstone-taskmatrix-9row.onrender.com/api/tasks",

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setTasks(response.data.tasks || []);

        }

        catch (error) {

            console.log(

                "Failed to fetch tasks:",

                error.response?.data || error.message

            );

        }

        finally {

            setLoading(false);

        }

    };

    const projects = useMemo(() => {

        const unique = [];

        tasks.forEach(task => {

            if (

                task.project &&

                !unique.find(

                    p => p._id === task.project._id

                )

            ) {

                unique.push(task.project);

            }

        });

        return unique;

    }, [tasks]);

    const filteredTasks = useMemo(() => {

        return tasks.filter(task => {

            const title = task.title || "";

            const description = task.description || "";

            const matchesSearch =

                title

                    .toLowerCase()

                    .includes(search.toLowerCase()) ||

                description

                    .toLowerCase()

                    .includes(search.toLowerCase());

            const matchesProject =

                projectFilter === "All" ||

                task.project?._id === projectFilter;

            const matchesPriority =

                priorityFilter === "All" ||

                task.priority === priorityFilter;

            return (

                matchesSearch &&

                matchesProject &&

                matchesPriority

            );

        });

    }, [

        tasks,

        search,

        projectFilter,

        priorityFilter

    ]);

    const todo = filteredTasks.filter(

        task => task.status === "Todo"

    );

    const progress = filteredTasks.filter(

        task => task.status === "In Progress"

    );

    const review = filteredTasks.filter(

        task => task.status === "Review"

    );

    const completed = filteredTasks.filter(

        task => task.status === "Completed"

    );

    return (

        <div className="dashboard-container">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <div className="kanban-page">

                    <div className="page-header">

                        <div>

                            <h1>

                                Kanban Board

                            </h1>

                            <p>

                                Organize work visually across your workflow.

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

                            <FaClipboardList

                                className="stats-icon"

                            />

                            <div>

                                <h3>

                                    Total Tasks

                                </h3>

                                <h2>

                                    {tasks.length}

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

                                    {todo.length}

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

                                    {progress.length}

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

                                    {completed.length}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="kanban-toolbar">

                        <div className="search-box">

                            <FiSearch />

                            <input

                                type="text"

                                placeholder="Search tasks..."

                                value={search}

                                onChange={(e) =>

                                    setSearch(e.target.value)

                                }

                            />

                        </div>

                        <select

                            className="toolbar-select"

                            value={projectFilter}

                            onChange={(e) =>

                                setProjectFilter(e.target.value)

                            }

                        >

                            <option value="All">

                                All Projects

                            </option>

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

                        <select

                            className="toolbar-select"

                            value={priorityFilter}

                            onChange={(e) =>

                                setPriorityFilter(e.target.value)

                            }

                        >

                            <option value="All">

                                All Priorities

                            </option>

                            <option>

                                High

                            </option>

                            <option>

                                Medium

                            </option>

                            <option>

                                Low

                            </option>

                        </select>

                    </div>

                    {

                        loading

                            ?

                            <div className="loading-state">

                                Loading Board...

                            </div>

                            :

                            <div className="kanban-columns">

                                <KanbanColumn

                                    title="Todo"

                                    color="todo"

                                    tasks={todo}

                                    onEdit={(task) => {

                                        setSelectedTask(task);

                                        setShowEditModal(true);

                                    }}

                                    onRefresh={fetchTasks}

                                    onAdd={() =>

                                        setShowCreateModal(true)

                                    }

                                />

                                <KanbanColumn

                                    title="In Progress"

                                    color="progress"

                                    tasks={progress}

                                    onEdit={(task) => {

                                        setSelectedTask(task);

                                        setShowEditModal(true);

                                    }}

                                    onRefresh={fetchTasks}

                                    onAdd={() =>

                                        setShowCreateModal(true)

                                    }

                                />

                                <KanbanColumn

                                    title="Review"

                                    color="review"

                                    tasks={review}

                                    onEdit={(task) => {

                                        setSelectedTask(task);

                                        setShowEditModal(true);

                                    }}

                                    onRefresh={fetchTasks}

                                    onAdd={() =>

                                        setShowCreateModal(true)

                                    }

                                />

                                <KanbanColumn

                                    title="Completed"

                                    color="completed"

                                    tasks={completed}

                                    onEdit={(task) => {

                                        setSelectedTask(task);

                                        setShowEditModal(true);

                                    }}

                                    onRefresh={fetchTasks}

                                    onAdd={() =>

                                        setShowCreateModal(true)

                                    }

                                />

                            </div>

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

                onClose={() => {

                    setShowEditModal(false);

                    setSelectedTask(null);

                }}

                task={selectedTask}

                onTaskUpdated={fetchTasks}

            />

        </div>

    );

}

export default Kanban;