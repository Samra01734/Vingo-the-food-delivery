import React, { useState } from "react";
import axios from "axios";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaPhoneAlt,
  FaLock,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

const serverUrl = "http://localhost:5000"; // Change according to your backend

const SignUP = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

 const roles = [
  { id: "user", label: "User" },
  { id: "owner", label: "Owner" },
  { id: "deliveryBoy", label: "Delivery Boy" },
];

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      fullName: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      password: formData.password,
      role,
    };

    console.log("Signup Data:", data);

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        data,
        {
          withCredentials: true,
        }
      );

      console.log("Success:", result.data);

      // Clear Form
      setFormData({
        name: "",
        mobile: "",
        email: "",
        password: "",
      });

      setRole("user");

    } catch (error) {
      console.log(
        "Error:",
        error.response?.data || error.message
      );
    }
  };
const handleGoogleAuth=async()=>{
  const provider=new GoogleAuthProvider()
  const result=await signInWithPopup(Auth,provider)
  console.log(result)
}
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
          Create your account
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full rounded-lg pl-11 pr-4 py-3 outline-none"
                style={{ border: `1px solid ${borderColor}` }}
                required
              />
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label className="block mb-2 font-medium">
              Mobile
            </label>

            <div className="relative">
              <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className="w-full rounded-lg pl-11 pr-4 py-3 outline-none"
                style={{ border: `1px solid ${borderColor}` }}
                required
              />
            </div>
          </div>

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
                style={{ border: `1px solid ${borderColor}` }}
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
                style={{ border: `1px solid ${borderColor}` }}
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

          {/* Roles */}
          <div>
            <label className="block mb-2 font-medium">
              Select Role
            </label>

            <div className="grid grid-cols-3 gap-2">
              {roles.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setRole(item.id)}
                  className="py-3 rounded-lg font-medium transition-all duration-200"
                  style={{
                    border:
                      role === item.id
                        ? `2px solid ${primaryColor}`
                        : `1px solid ${borderColor}`,
                    background:
                      role === item.id
                        ? "#fff3ef"
                        : "#fff",
                    color:
                      role === item.id
                        ? primaryColor
                        : "#555",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
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
            Sign Up
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
            className="w-full border rounded-lg py-3 flex items-center justify-center
             gap-3 font-medium hover:bg-gray-50 transition"
             onClick={handleGoogleAuth}
            style={{
              border: `1px solid ${borderColor}`,
            }}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign Up with Google
          </button>

          {/* Navigate */}
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-semibold hover:underline"
              style={{ color: primaryColor }}
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUP;