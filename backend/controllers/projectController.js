const projectService = require("../services/projectService");

const createProject = async (req, res) => {

    try {

        const project = await projectService.createProject({

            ...req.body,

            user: req.user.id

        });

        res.status(201).json({

            success: true,

            project

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const getProjects = async (req, res) => {

    try {

        const projects = await projectService.getAllProjects(

    req.user.id

);

        res.json({

            success: true,

            projects

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const updateProject = async (req, res) => {

    try {

        const updatedProject = await projectService.updateProject(

    req.params.id,

    req.user.id,

    req.body

);

        if (!updatedProject) {

            return res.status(404).json({

                success: false,

                message: "Project not found"

            });

        }

        res.json({

            success: true,

            message: "Project updated successfully",

            project: updatedProject

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const deleteProject = async (req, res) => {

    try {

       const deletedProject = await projectService.deleteProject(

    req.params.id,

    req.user.id

);

        if (!deletedProject) {

            return res.status(404).json({

                success: false,

                message: "Project not found"

            });

        }

        res.json({

            success: true,

            message: "Project deleted successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    createProject,

    getProjects,

    updateProject,

    deleteProject

};