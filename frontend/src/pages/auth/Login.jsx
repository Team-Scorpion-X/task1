import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import './login.css';

const apiBase = process.env.REACT_APP_API;

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "MEDtools.lk | Login";
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { phone_number, password } = formData;

    try {
      setLoading(true);
      const response = await axios.post(`${apiBase}/auth/login`, {
        phone_number,
        password,
      });
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

      if (response.data.type === "admin") {
        navigate("/admin");
      } else {
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (err) {
      const error_message = err.response?.data?.error?.message || "Login failed!";
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
              <label htmlFor="phone_number">Username:</label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                placeholder="Username or Email"
                value={formData.phone_number}
                onChange={handleChange}
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
              />
              <div className="extras">
                <Link to="/forgot-password" className="forgot-link">
                  {/* Forgot password? */}
                </Link>
              </div>
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
