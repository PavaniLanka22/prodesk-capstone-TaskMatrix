const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            validate: [
                validator.isEmail,
                "Please enter a valid email",
            ],
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },

        // -----------------------------
        // TEAM MANAGEMENT FIELDS
        // -----------------------------

        role: {
            type: String,
            enum: [
                "Admin",
                "Manager",
                "Developer",
                "Tester",
                "Viewer",
            ],
            default: "Developer",
        },

        department: {
            type: String,
            enum: [
                "Engineering",
                "Frontend",
                "Backend",
                "QA",
                "Management",
                "Design",
            ],
            default: "Engineering",
        },

        status: {
            type: String,
            enum: [
                "Online",
                "Offline",
            ],
            default: "Offline",
        },
    },
    {
        timestamps: true,
    }
);


// ------------------------------------
// HASH PASSWORD BEFORE SAVING
// ------------------------------------

userSchema.pre("save", async function () {

    if (!this.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(
        this.password,
        salt
    );
});


// ------------------------------------
// CHECK PASSWORD
// ------------------------------------

userSchema.methods.matchPassword = async function (
    enteredPassword
) {

    return await bcrypt.compare(
        enteredPassword,
        this.password
    );

};


module.exports = mongoose.model(
    "User",
    userSchema
);