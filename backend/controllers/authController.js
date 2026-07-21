const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({

                message: "Please fill all fields"

            });

        }

        const userExists = await User.findOne({

            email

        });

        if (userExists) {

            return res.status(400).json({

                message: "User already exists"

            });

        }

        const user = new User({

            name,

            email,

            password

        });

        await user.save();

        res.status(201).json({

            success: true,

            token: generateToken(user),

            user: {

                id: user._id,

                name: user.name,

                email: user.email

            }

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: error.message

        });

    }

};

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({

                message: "Please enter email and password"

            });

        }

        const user = await User.findOne({

            email

        });

        if (!user) {

            return res.status(401).json({

                message: "Invalid email or password"

            });

        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {

            return res.status(401).json({

                message: "Invalid email or password"

            });

        }

        res.status(200).json({

            success: true,

            token: generateToken(user),

            user: {

                id: user._id,

                name: user.name,

                email: user.email

            }

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    registerUser,

    loginUser

};