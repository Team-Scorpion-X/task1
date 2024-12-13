import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS
import { Link, useNavigate } from "react-router-dom";
const apiBase = process.env.REACT_APP_API;

const Login = ({ setIsLoggedIn }) => {
  
  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
  });
  
  const [loading, setLoading] = useState(false); // Loading state for the button animation
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
      setLoading(true); // Start loading animation before login attempt
      const response = await axios.post(`${apiBase}/auth/login`, {
        phone_number,
        password,
      });
      localStorage.setItem("token", response.data.token); // Save token to local storage
      toast.success("User login successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
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
        theme: "light",
      });
    } finally {
      setLoading(false); // Stop loading animation after the request completes
    }
  };

  return (
    <section className="bg-myLight h-screen flex flex-col items-center justify-center pt-48 sm:pt-36">
      <div className="flex flex-col justify-center items-center">
        <h1 className="p-0 m-0">
          Ayubowan to <span className="font-bold">MEDi</span>tools.lk
        </h1>
        <p className="text-center w-5/6 text-sm text-myDim font-light mb-4">
          Sri Lanka's Best and Most Trusted Source for Quality Medical Accessories
        </p>
      </div>
      <div className="flex flex-col justify-center items-center w-full max-w-md bg-myLight border rounded-2xl shadow-md p-6 space-y-4 md:space-y-6">
        <h2 className="text-xl font-bold leading-tight text-myDark">Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 w-full">
          <div>
            <label
              htmlFor="phone_number"
              className="block mb-2 text-sm font-medium text-myDark text-start"
            >
              Phone Number:
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              placeholder="Enter your phone number"
              value={formData.phone_number}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-0.5 focus:outline-none focus:ring-myDim block w-full p-2.5"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-myDark text-start"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-0.5 focus:outline-none focus:ring-myDim block w-full p-2.5"
            />
            <a
              href="/register"
              className="text-myBlue flex justify-end mt-4 hover:underline text-sm font-medium text-gray-500"
            >
              Forgot password?
            </a>
          </div>
          <div className="flex flex-col items-center space-y-5">
            <button
              type="submit"
              disabled={loading} // Disable button when loading
              className={`mt-4 text-myDark bg-myBlue hover:bg-myPurple focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center flex justify-center items-center text-nowrap _button _active_button ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                "loading"
              ) : (
                "Log In"
              )}
            </button>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Don't have an account?{" "}
                <Link to="/register" className="text-myBlue hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;