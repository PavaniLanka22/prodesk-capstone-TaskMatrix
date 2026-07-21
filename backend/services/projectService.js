const Project = require("../models/Project");

const createProject = async (projectData) => {

    return await Project.create(projectData);

};

const getAllProjects = async (userId) => {

    return await Project.find({

        user: userId

    })

    .sort({

        createdAt: -1

    });

};

const updateProject = async (

    id,

    userId,

    projectData

) => {

    return await Project.findOneAndUpdate(

        {

            _id: id,

            user: userId

        },

        projectData,

        {

            new: true,

            runValidators: true

        }

    );

};

const deleteProject = async (

    id,

    userId

) => {

    return await Project.findOneAndDelete({

        _id: id,

        user: userId

    });

};

module.exports = {

    createProject,

    getAllProjects,

    updateProject,

    deleteProject

};