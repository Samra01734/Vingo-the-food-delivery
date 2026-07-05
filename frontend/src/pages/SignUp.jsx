import React, { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaPhoneAlt,
  FaLock,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const SignUP = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");

  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const roles = [
    { id: "user", label: "User" },
    { id: "owner", label: "Owner" },
    { id: "delivery", label: "Delivery Boy" },
  ];

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

        <form className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block mb-2 font-medium">Full Name</label>

            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-lg pl-11 pr-4 py-3 outline-none"
                style={{ border: `1px solid ${borderColor}` }}
              />
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label className="block mb-2 font-medium">Mobile</label>

            <div className="relative">
              <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="tel"
                placeholder="Enter mobile number"
                className="w-full rounded-lg pl-11 pr-4 py-3 outline-none"
                style={{ border: `1px solid ${borderColor}` }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">Email</label>

            <div className="relative">
              <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg pl-11 pr-4 py-3 outline-none"
                style={{ border: `1px solid ${borderColor}` }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium">Password</label>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full rounded-lg pl-11 pr-12 py-3 outline-none"
                style={{ border: `1px solid ${borderColor}` }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          {/* Roles */}
          <div>
            <label className="block mb-2 font-medium">Select Role</label>

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
                    background: role === item.id ? "#fff3ef" : "#fff",
                    color: role === item.id ? primaryColor : "#555",
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
            style={{ backgroundColor: primaryColor }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = hoverColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = primaryColor)
            }
          >
            Sign Up
          </button>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full border rounded-lg py-3 flex items-center justify-center gap-3 font-medium hover:bg-gray-50 transition"
            style={{ border: `1px solid ${borderColor}` }}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign Up with Google
          </button>

          {/* Navigate to Sign In */}
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