import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import CreateProjectModal from "../components/CreateProjectModal";
import DeleteProjectModal from "../components/DeleteProjectModal";
import EditProjectModal from "../components/EditProjectModal";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import Sidebar from "../components/Sidebar";

import "../styles/dashboard.css";

function Projects() {

    const [showModal, setShowModal] = useState(false);

    const [projects, setProjects] = useState([]);

    const [deleteModal, setDeleteModal] = useState(false);

    const [editModal, setEditModal] = useState(false);

    const [selectedProject, setSelectedProject] = useState(null);

    const token = localStorage.getItem("token");

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

            toast.error("Failed to fetch projects.");

        }

    };

    useEffect(() => {

        fetchProjects();

    }, []);

    const handleProjectCreated = (newProject) => {

        setProjects((prevProjects) => [

            newProject,

            ...prevProjects

        ]);

    };

    const handleProjectUpdated = (updatedProject) => {

        setProjects((prevProjects) =>

            prevProjects.map((project) =>

                project._id === updatedProject._id

                    ? updatedProject

                    : project

            )

        );

    };

    const deleteProject = async () => {

        try {

            await axios.delete(

                `http://localhost:5000/api/projects/${selectedProject._id}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setProjects(

                projects.filter(

                    (project) =>

                        project._id !== selectedProject._id

                )

            );

            const deletedProjectName = selectedProject.name;

            setDeleteModal(false);

            setSelectedProject(null);

            toast.success(

                `🗑️ "${deletedProjectName}" deleted successfully!`

            );

        }

        catch (error) {

            console.log(error);

            toast.error("Failed to delete project.");

        }

    };

    return (

        <div className="dashboard-container">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <div className="page-header">

                    <div>

                        <h1>Projects</h1>

                        <p>

                            Manage all your projects in one place.

                        </p>

                    </div>

                    <button

                        className="new-project"

                        onClick={() => setShowModal(true)}

                    >

                        + Create Project

                    </button>

                </div>

                <div className="projects-grid">

                    {

                        projects.length === 0

                            ?

                            (

                                <p>

                                    No projects found.

                                    Create your first project.

                                </p>

                            )

                            :

                            (

                                projects.map((project) => (

                                    <ProjectCard

                                        key={project._id}

                                        id={project._id}

                                        title={project.name}

                                        category={project.category}

                                        progress={project.progress || 0}

                                        tasks={0}

                                        members={1}

                                        onEdit={() => {

                                            setSelectedProject(project);

                                            setEditModal(true);

                                        }}

                                        onDelete={() => {

                                            setSelectedProject(project);

                                            setDeleteModal(true);

                                        }}

                                    />

                                ))

                            )

                    }

                </div>

            </div>

            <CreateProjectModal

                open={showModal}

                onClose={() => setShowModal(false)}

                onProjectCreated={handleProjectCreated}

            />

            <EditProjectModal

                open={editModal}

                project={selectedProject}

                onClose={() => {

                    setEditModal(false);

                    setSelectedProject(null);

                }}

                onProjectUpdated={handleProjectUpdated}

            />

            <DeleteProjectModal

                open={deleteModal}

                projectName={selectedProject?.name}

                onClose={() => {

                    setDeleteModal(false);

                    setSelectedProject(null);

                }}

                onConfirm={deleteProject}

            />

        </div>

    );

}

export default Projects;