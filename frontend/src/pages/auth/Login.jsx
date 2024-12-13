import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    loginIdentifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "CODECAMPUS | Login";
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { loginIdentifier, password } = formData;

    try {
      setLoading(true);
      // Call the login API
      const response = await axios.post(`http://localhost:4443/auth/login`, {
        loginIdentifier,
        password,
      });

      // Save token in local storage
      localStorage.setItem("token", response.data.token);

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      
      navigate("/profile")
      setIsLoggedIn(true); // Update parent state
      navigate("/"); // Redirect to the homepage
    } catch (err) {
      const error_message =
        err.response?.data?.message || "Login failed. Please try again.";
      toast.error(error_message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-brand">CODECAMPUS</h1>
            <h2 className="login-subtitle">Login</h2>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="loginIdentifier">Username or Email:</label>
              <input
                type="text"
                id="loginIdentifier"
                name="loginIdentifier"
                placeholder="Enter your username or email"
                value={formData.loginIdentifier}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="login-btn"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="register">
            Don’t have an account?{" "}
            <Link to="/register" className="register-link">
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
