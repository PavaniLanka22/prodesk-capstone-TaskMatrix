const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// CORS
app.use(
    cors({
        origin: true,
        credentials: true
    })
);

// Middleware
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/ai", aiRoutes);

// Backend health check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 TaskMatrix Backend Running..."
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});

// Use Render's PORT environment variable.
// For local development, use PORT from .env.
const PORT = process.env.PORT;

const startServer = async () => {

    try {

        await connectDB();

        app.listen(PORT);

    }

    catch (error) {

        process.exit(1);

    }

};

startServer();