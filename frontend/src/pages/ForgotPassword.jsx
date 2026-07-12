import React, { useState, useRef } from "react";
import axios from "axios";
import {
  FaArrowLeft,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const serverUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const ForgotPassword = () => {
  const navigate = useNavigate();

  // Theme Colors
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  // Step Control
  const [step, setStep] = useState(1);

  // Loading
  const [loading, setLoading] = useState(false);

  // Email
  const [email, setEmail] = useState("");

  // OTP
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRefs = useRef([]);

  // Passwords
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Show Password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // ===========================
  // OTP Input
  // ===========================

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1);

    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // ===========================
  // Send OTP
  // ===========================

  const sendOtp = async () => {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        {
          withCredentials: true,
        }
      );

      alert(
        res.data.message || "OTP sent successfully."
      );

      setOtp(["", "", "", ""]);
      setStep(2);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to send OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Verify OTP
  // ===========================

  const verifyOtp = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 4) {
      alert("Please enter complete OTP.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        {
          email,
          otp: enteredOtp,
        }
      );

      alert(
        res.data.message || "OTP verified successfully."
      );

      setStep(3);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Invalid OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Reset Password
  // ===========================

  const resetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (newPassword.length < 6) {
      alert(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        {
          email,
          newPassword,
        }
      );

      alert(
        res.data.message ||
          "Password reset successfully."
      );

      navigate("/signin");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Password reset failed."
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
        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/signin")}
          className="flex items-center gap-2 text-sm mb-6 hover:underline"
          style={{ color: primaryColor }}
        >
          <FaArrowLeft />
          Back to Sign In
        </button>

        {/* Logo */}
        <h1
          className="text-3xl font-bold text-center"
          style={{ color: primaryColor }}
        >
          Vingo
        </h1>

        {/* Heading */}
        <p className="text-center text-gray-500 mt-2 mb-8">
          {step === 1 && "Forgot Password"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Reset Password"}
        </p>

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block mb-2 font-medium">
                Email Address
              </label>

              <div className="relative">
                <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg pl-11 pr-4 py-3 outline-none"
                  style={{
                    border: `1px solid ${borderColor}`,
                  }}
                />
              </div>
            </div>

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-semibold"
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
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <div className="space-y-6">
            <p className="text-center text-gray-500">
              OTP sent to
              <br />
              <span className="font-semibold">{email}</span>
            </p>

            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handleOtpChange(e.target.value, index)
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(e, index)
                  }
                  className="w-14 h-14 rounded-lg text-center text-xl outline-none"
                  style={{
                    border: `1px solid ${borderColor}`,
                  }}
                />
              ))}
            </div>

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-semibold"
              style={{
                backgroundColor: primaryColor,
              }}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              onClick={sendOtp}
              className="w-full text-sm hover:underline"
              style={{ color: primaryColor }}
            >
              Resend OTP
            </button>
          </div>
        )}

        {/* ================= STEP 3 ================= */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <label className="block mb-2 font-medium">
                New Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  className="w-full rounded-lg pl-11 pr-12 py-3 outline-none"
                  style={{
                    border: `1px solid ${borderColor}`,
                  }}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Confirm Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  className="w-full rounded-lg pl-11 pr-12 py-3 outline-none"
                  style={{
                    border: `1px solid ${borderColor}`,
                  }}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={resetPassword}
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-semibold"
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
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;