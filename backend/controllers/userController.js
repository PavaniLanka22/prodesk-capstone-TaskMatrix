const User = require("../models/User");


// ======================================================
// GET ALL USERS
// ======================================================

const getUsers = async (req, res) => {

    try {

        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            users,

        });

    } catch (error) {

        console.error(
            "Get users error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to fetch users.",

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


        const user =
            await User.findById(id);


        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found.",

            });

        }


        // ----------------------------------------------
        // UPDATE ONLY PROVIDED FIELDS
        // ----------------------------------------------

        if (name !== undefined) {

            user.name = name;

        }


        if (email !== undefined) {

            user.email = email;

        }


        if (role !== undefined) {

            user.role = role;

        }


        if (department !== undefined) {

            user.department =
                department;

        }


        if (status !== undefined) {

            user.status =
                status;

        }


        const updatedUser =
            await user.save();


        // ----------------------------------------------
        // REMOVE PASSWORD FROM RESPONSE
        // ----------------------------------------------

        const safeUser =
            updatedUser.toObject();

        delete safeUser.password;


        res.status(200).json({

            success: true,

            message:
                "User updated successfully.",

            user: safeUser,

        });

    } catch (error) {

        console.error(
            "Update user error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to update user.",

            error:
                error.message,

        });

    }

};


// ======================================================
// DELETE USER
// ======================================================

const deleteUser = async (req, res) => {

    try {

        const { id } = req.params;


        const user =
            await User.findById(id);


        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found.",

            });

        }


        await User.findByIdAndDelete(id);


        res.status(200).json({

            success: true,

            message:
                "User deleted successfully.",

        });

    } catch (error) {

        console.error(
            "Delete user error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to delete user.",

        });

    }

};


module.exports = {

    getUsers,

    updateUser,

    deleteUser,

};