const mongoose = require("mongoose");

const projectService = require("../services/projectService");
const projectSchema = require("../validation/projectValidation");

const createProject = async (req, res) => {
    try {

        const { error } = projectSchema.validate(req.body, {
            abortEarly: false
        });

        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map(err => err.message)
            });
        }

        const project = await projectService.createProject({
            ...req.body,
            user: req.user.id
        });

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            project
        });

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Project ID"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const getProjects = async (req, res) => {
    try {

        const projects = await projectService.getAllProjects(
            req.user.id
        );

        return res.status(200).json({
            success: true,
            projects
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const updateProject = async (req, res) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Project ID"
            });

        }

        const { error } = projectSchema.validate(req.body, {
            abortEarly: false
        });

        if (error) {

            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map(err => err.message)
            });

        }

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

        return res.status(200).json({
            success: true,
            message: "Project updated successfully",
            project: updatedProject
        });

    } catch (error) {

        if (error.name === "CastError") {

            return res.status(400).json({
                success: false,
                message: "Invalid Project ID"
            });

        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const deleteProject = async (req, res) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Project ID"
            });

        }

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

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        });

    } catch (error) {

        if (error.name === "CastError") {

            return res.status(400).json({
                success: false,
                message: "Invalid Project ID"
            });

        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

module.exports = {
    createProject,
    getProjects,
    updateProject,
    deleteProject
};