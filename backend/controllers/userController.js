const User = require("../models/User");


// ======================================================
// CREATE USER
// ======================================================

const createUser = async (req, res) => {

    try {

        const {

            name,
            email,
            role,
            department,
            status,

        } = req.body;


        // ------------------------------------------
        // VALIDATION
        // ------------------------------------------

        if (!name || !email) {

            return res.status(400).json({

                success: false,

                message: "Name and Email are required.",

            });

        }


        // ------------------------------------------
        // CHECK DUPLICATE EMAIL
        // ------------------------------------------

        const existingUser = await User.findOne({

            email,

        });


        if (existingUser) {

            return res.status(400).json({

                success: false,

                message: "Email already exists.",

            });

        }


        // ------------------------------------------
        // CREATE USER
        // ------------------------------------------

        const user = await User.create({

            name,

            email,

            role: role || "Developer",

            department: department || "Engineering",

            status: status || "Online",

            // Temporary password
            password: "Temp@123",

        });


        const safeUser = user.toObject();

        delete safeUser.password;


        res.status(201).json({

            success: true,

            message: "Member invited successfully.",

            user: safeUser,

        });

    }

    catch (error) {

        console.error(

            "Create user error:",

            error

        );

        res.status(500).json({

            success: false,

            message: "Failed to create member.",

            error: error.message,

        });

    }

};


// ======================================================
// GET ALL USERS
// ======================================================

const getUsers = async (req, res) => {

    try {

        const users = await User.find()

            .select("-password")

            .sort({

                createdAt: -1,

            });


        res.status(200).json({

            success: true,

            users,

        });

    }

    catch (error) {

        console.error(

            "Get users error:",

            error

        );

        res.status(500).json({

            success: false,

            message: "Failed to fetch users.",

        });

    }

};


// ======================================================
// UPDATE USER
// ======================================================

const updateUser = async (req, res) => {

    try {

        const { id } = req.params;

        const {

            name,
            email,
            role,
            department,
            status,

        } = req.body;


        const user = await User.findById(id);


        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found.",

            });

        }


        if (name !== undefined) {

            user.name = name;

        }


        if (email !== undefined) {

            const existingUser = await User.findOne({

                email,

                _id: {

                    $ne: id,

                },

            });


            if (existingUser) {

                return res.status(400).json({

                    success: false,

                    message: "Email already exists.",

                });

            }


            user.email = email;

        }


        if (role !== undefined) {

            user.role = role;

        }


        if (department !== undefined) {

            user.department = department;

        }


        if (status !== undefined) {

            user.status = status;

        }


        const updatedUser = await user.save();


        const safeUser = updatedUser.toObject();

        delete safeUser.password;


        res.status(200).json({

            success: true,

            message: "User updated successfully.",

            user: safeUser,

        });

    }

    catch (error) {

        console.error(

            "Update user error:",

            error

        );

        res.status(500).json({

            success: false,

            message: "Failed to update user.",

            error: error.message,

        });

    }

};


// ======================================================
// DELETE USER
// ======================================================

const deleteUser = async (req, res) => {

    try {

        const { id } = req.params;


        const user = await User.findById(id);


        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found.",

            });

        }


        await User.findByIdAndDelete(id);


        res.status(200).json({

            success: true,

            message: "User deleted successfully.",

        });

    }

    catch (error) {

        console.error(

            "Delete user error:",

            error

        );

        res.status(500).json({

            success: false,

            message: "Failed to delete user.",

            error: error.message,

        });

    }

};


module.exports = {

    createUser,

    getUsers,

    updateUser,

    deleteUser,

};