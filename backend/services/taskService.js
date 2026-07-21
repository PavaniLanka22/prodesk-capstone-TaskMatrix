const Task = require("../models/Task");

const createTask = async (taskData) => {

    return await Task.create(taskData);

};

const getAllTasks = async (userId) => {

    return await Task.find({

        user: userId

    })

    .populate("project", "name")

    .sort({

        createdAt: -1

    });

};

const getTaskById = async (id, userId) => {

    return await Task.findOne({

        _id: id,

        user: userId

    })

    .populate("project", "name");

};

const updateTask = async (

    id,

    userId,

    taskData

) => {

    return await Task.findOneAndUpdate(

        {

            _id: id,

            user: userId

        },

        taskData,

        {

            new: true,

            runValidators: true

        }

    )

    .populate("project", "name");

};

const deleteTask = async (

    id,

    userId

) => {

    return await Task.findOneAndDelete({

        _id: id,

        user: userId

    });

};

module.exports = {

    createTask,

    getAllTasks,

    getTaskById,

    updateTask,

    deleteTask

};