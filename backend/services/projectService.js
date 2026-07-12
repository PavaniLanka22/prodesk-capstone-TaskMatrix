const Project = require("../models/Project");

const createProject = async (projectData) => {

    const project = await Project.create(projectData);

    return project;

};

const getAllProjects = async () => {

    return await Project.find().sort({ createdAt: -1 });

};

const deleteProject = async (id) => {

    return await Project.findByIdAndDelete(id);

};

module.exports = {

    createProject,

    getAllProjects,

    deleteProject,

};