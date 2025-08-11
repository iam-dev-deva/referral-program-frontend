import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/ApiService";
import { MdAlternateEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/Style.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (message) {
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      setMessage("");
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser(formData);

      login({
        id: data.id,
        name: data.name,
        email: data.email,
        referralCode: data.referralCode,
        rewardPoints: data.rewardPoints,
      });

      navigate("/dashboard", { replace: true });
    } catch (error) {
      setMessage(error.response?.data?.message || "Login Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Login</h2>
      <form className="form_main" onSubmit={handleSubmit}>
        <div className="inputContainer">
          <MdAlternateEmail className="inputIcon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="inputField"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inputContainer">
          <IoMdLock className="inputIcon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="inputField"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button id="button" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="signupContainer">
          <p>Don't have an account?</p>
          <Link to="/register">Signup</Link>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;