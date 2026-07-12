import axios from "axios";
import { useEffect, useState } from "react";

import CreateProjectModal from "../components/CreateProjectModal";
import DeleteProjectModal from "../components/DeleteProjectModal";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import Sidebar from "../components/Sidebar";


import "../styles/dashboard.css";

function Projects() {

    const [showModal, setShowModal] = useState(false);

    const [projects, setProjects] = useState([]);

    const [deleteModal, setDeleteModal] = useState(false);

    const [selectedProject, setSelectedProject] = useState(null);

    const token = localStorage.getItem("token");

    const fetchProjects = async () => {

        try {

           const response = await axios.get(

    "http://localhost:5000/api/projects",

    {

        headers: {

            Authorization: `Bearer ${localStorage.getItem("token")}`

        }

    }

);

setProjects(response.data.projects);

            setProjects(response.data.projects);

        }

        catch (error) {

            console.log(error);

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

    const deleteProject = async () => {

        try {

           axios.delete(

    `http://localhost:5000/api/projects/${selectedProject._id}`,

    {

        headers: {

            Authorization: `Bearer ${localStorage.getItem("token")}`

        }

    }

);

            setProjects(

                projects.filter(

                    (project) => project._id !== selectedProject._id

                )

            );

            setDeleteModal(false);

            setSelectedProject(null);

        }

        catch (error) {

            console.log(error);

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

                        projects.length === 0 ?

                        (

                            <p>

                                No projects found. Create your first project.

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