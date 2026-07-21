import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../services/api";

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

    const [loading, setLoading] = useState(true);


    const fetchProjects = async () => {

        try {

            setLoading(true);

            const response = await api.get("/projects");

            console.log("PROJECTS RESPONSE:", response.data);

            setProjects(response.data.projects || []);

        }

        catch (error) {

            console.error(
                "Failed to fetch projects:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch projects."
            );

        }

        finally {

            setLoading(false);

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

        if (!selectedProject) return;

        try {

            await api.delete(

                `/projects/${selectedProject._id}`

            );


            const deletedProjectName =
                selectedProject.name;


            setProjects((prevProjects) =>

                prevProjects.filter(

                    (project) =>

                        project._id !==
                        selectedProject._id

                )

            );


            setDeleteModal(false);

            setSelectedProject(null);


            toast.success(

                `"${deletedProjectName}" deleted successfully!`

            );

        }

        catch (error) {

            console.error(

                "Failed to delete project:",

                error

            );

            toast.error(

                error.response?.data?.message ||

                "Failed to delete project."

            );

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

                        onClick={() =>
                            setShowModal(true)
                        }

                    >

                        + Create Project

                    </button>

                </div>


                {

                    loading

                        ?

                        (

                            <div className="loading-state">

                                Loading Projects...

                            </div>

                        )

                        :

                        (

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

                                            projects.map(

                                                (project) => (

                                                    <ProjectCard

                                                        key={
                                                            project._id
                                                        }

                                                        id={
                                                            project._id
                                                        }

                                                        title={
                                                            project.name
                                                        }

                                                        category={
                                                            project.category
                                                        }

                                                        progress={
                                                            project.progress ||
                                                            0
                                                        }

                                                        tasks={
                                                            project.tasks?.length ||
                                                            0
                                                        }

                                                        members={

                                                            project.members?.length ||

                                                            1

                                                        }

                                                        onEdit={() => {

                                                            setSelectedProject(
                                                                project
                                                            );

                                                            setEditModal(
                                                                true
                                                            );

                                                        }}

                                                        onDelete={() => {

                                                            setSelectedProject(
                                                                project
                                                            );

                                                            setDeleteModal(
                                                                true
                                                            );

                                                        }}

                                                    />

                                                )

                                            )

                                        )

                                }

                            </div>

                        )

                }

            </div>


            <CreateProjectModal

                open={showModal}

                onClose={() =>
                    setShowModal(false)
                }

                onProjectCreated={
                    handleProjectCreated
                }

            />


            <EditProjectModal

                open={editModal}

                project={selectedProject}

                onClose={() => {

                    setEditModal(false);

                    setSelectedProject(null);

                }}

                onProjectUpdated={
                    handleProjectUpdated
                }

            />


            <DeleteProjectModal

                open={deleteModal}

                projectName={
                    selectedProject?.name
                }

                onClose={() => {

                    setDeleteModal(false);

                    setSelectedProject(null);

                }}

                onConfirm={
                    deleteProject
                }

            />

        </div>

    );

}


export default Projects;