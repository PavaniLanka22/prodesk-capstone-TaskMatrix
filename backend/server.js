const express = require("express");
const cors = require("cors");
require("dotenv").config();
const projectRoutes = require("./routes/projectRoutes");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.send("🚀 TaskMatrix Backend Running...");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on Port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();