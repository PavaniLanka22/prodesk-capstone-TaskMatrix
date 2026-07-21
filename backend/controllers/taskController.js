const taskService = require("../services/taskService");

const createTask = async (req, res) => {

    try {

        const task = await taskService.createTask({

            ...req.body,

            user: req.user.id

        });

        const populatedTask = await task.populate("project", "name");

        res.status(201).json({

            success: true,

            task: populatedTask

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const getTasks = async (req, res) => {

    try {

        const tasks = await taskService.getAllTasks(

            req.user.id

        );

        res.status(200).json({

            success: true,

            tasks

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const getTask = async (req, res) => {

    try {

        const task = await taskService.getTaskById(

            req.params.id,

            req.user.id

        );

        if (!task) {

            return res.status(404).json({

                success: false,

                message: "Task not found"

            });

        }

        res.json({

            success: true,

            task

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const updateTask = async (req, res) => {

    try {

        const updatedTask = await taskService.updateTask(

            req.params.id,

            req.user.id,

            req.body

        );

        if (!updatedTask) {

            return res.status(404).json({

                success: false,

                message: "Task not found"

            });

        }

        const populatedTask = await updatedTask.populate(

            "project",

            "name"

        );

        res.json({

            success: true,

            message: "Task updated successfully",

            task: populatedTask

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const deleteTask = async (req, res) => {

    try {

        const deletedTask = await taskService.deleteTask(

            req.params.id,

            req.user.id

        );

        if (!deletedTask) {

            return res.status(404).json({

                success: false,

                message: "Task not found"

            });

        }

        res.json({

            success: true,

            message: "Task deleted successfully"

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

    createTask,

    getTasks,

    getTask,

    updateTask,

    deleteTask

};