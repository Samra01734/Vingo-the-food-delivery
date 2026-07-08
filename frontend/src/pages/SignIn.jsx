import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const serverUrl = "http://localhost:5000";

const SignIn = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Sign In
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      email: formData.email,
      password: formData.password,
    };

    console.log("Signin Data:", data);

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        data,
        {
          withCredentials: true,
        }
      );

      console.log("Login Success:", result.data);

      alert("Login Successful!");

      // Clear Form
      setFormData({
        email: "",
        password: "",
      });

      // Save user if backend sends it
      if (result.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(result.data.user)
        );
      }

      // Save token if backend sends it
      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
      }

      // Redirect
      navigate("/");
    } catch (error) {
      console.log(
        "Login Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Invalid Email or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8"
        style={{ border: `1px solid ${borderColor}` }}
      >
        {/* Logo */}
        <h1
          className="text-3xl font-bold text-center"
          style={{ color: primaryColor }}
        >
          Vingo
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Welcome Back
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <div className="relative">
              <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-lg pl-11 pr-4 py-3 outline-none"
                style={{
                  border: `1px solid ${borderColor}`,
                }}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full rounded-lg pl-11 pr-12 py-3 outline-none"
                style={{
                  border: `1px solid ${borderColor}`,
                }}
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm hover:underline"
              style={{ color: primaryColor }}
            >
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-white font-semibold transition-all"
            style={{
              backgroundColor: primaryColor,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                hoverColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                primaryColor)
            }
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">
              OR
            </span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full border rounded-lg py-3 flex items-center justify-center gap-3 font-medium hover:bg-gray-50 transition"
            style={{
              border: `1px solid ${borderColor}`,
            }}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign In with Google
          </button>

          {/* Navigate */}
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold hover:underline"
              style={{ color: primaryColor }}
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;