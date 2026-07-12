import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
const data = await loginUser(formData);

console.log("LOGIN RESPONSE:", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <img
          src="/kanban.svg"
          alt="TaskMatrix"
          className="logo-image"
        />

        <h1 className="logo-title">
          TaskMatrix
        </h1>

        <h2>Welcome Back</h2>

        <p className="subtitle">
          Sign in to continue managing your projects.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">

            {loading ? "Logging in..." : "LOGIN"}

          </button>

          <p className="register-text">

            Don't have an account?

            <Link
              to="/register"
              className="register-link"
            >
              Register
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;