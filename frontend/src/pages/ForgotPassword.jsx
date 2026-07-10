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

const serverUrl = "http://localhost:5000";

const ForgotPassword = () => {
  const navigate = useNavigate();

  // Theme Colors
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  // Step Control
  // 1 = Email
  // 2 = OTP
  // 3 = Reset Password
  const [step, setStep] = useState(1);

  // Loading
  const [loading, setLoading] = useState(false);

  // Form States
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  // Show Password
  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword,
    setShowConfirmPassword] =
    useState(false);

  // OTP Input References
  const otpRefs = useRef([]);

  // -----------------------------
  // Handle OTP Input
  // -----------------------------
  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];

    updatedOtp[index] = value;

    setOtp(updatedOtp);

    // Move to next input
    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  // Backspace
  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      otpRefs.current[index - 1].focus();
    }
  };

  // -----------------------------
  // STEP 1
  // Send OTP
  // -----------------------------
  const sendOtp = async () => {
    if (!email) {
      alert("Please enter email.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/ForgotPassword`,
        { email },
        {
          withCredentials: true,
        }
      );

      alert(
        res.data.message ||
          "OTP sent successfully."
      );

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

  // -----------------------------
  // STEP 2
  // Verify OTP
  // -----------------------------
  const verifyOtp = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      alert("Enter complete OTP.");
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
        res.data.message ||
          "OTP Verified."
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

  // -----------------------------
  // STEP 3
  // Reset Password
  // -----------------------------
  const resetPassword = async () => {
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
          password: newPassword,
        }
      );

      alert(
        res.data.message ||
          "Password Reset Successfully."
      );

      navigate("/signin");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Reset Failed."
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
    {/* Back Button */}
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

    <p className="text-center text-gray-500 mt-2 mb-8">
      {step === 1 && "Forgot Password"}
      {step === 2 && "Verify OTP"}
      {step === 3 && "Reset Password"}
    </p>

    {/* ========================= */}
    {/* STEP 1 */}
    {/* ========================= */}

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
              onChange={(e) =>
                setEmail(e.target.value)
              }
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

    {/* ========================= */}
    {/* STEP 2 */}
    {/* ========================= */}

    {step === 2 && (
      <div className="space-y-6">

        <p className="text-center text-gray-500">
          OTP sent to
          <br />
          <span className="font-semibold">
            {email}
          </span>
        </p>

        <div className="flex justify-between gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) =>
                (otpRefs.current[index] = el)
              }
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) =>
                handleOtpChange(
                  e.target.value,
                  index
                )
              }
              onKeyDown={(e) =>
                handleKeyDown(e, index)
              }
              className="w-12 h-12 rounded-lg text-center text-xl outline-none"
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
          {loading
            ? "Verifying..."
            : "Verify OTP"}
        </button>

        <button
          onClick={sendOtp}
          className="w-full text-sm hover:underline"
          style={{
            color: primaryColor,
          }}
        >
          Resend OTP
        </button>
      </div>
    )}

    {/* ========================= */}
    {/* STEP 3 */}
    {/* ========================= */}

    {step === 3 && (
      <div className="space-y-5">

        {/* New Password */}

        <div>
          <label className="block mb-2 font-medium">
            New Password
          </label>

          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              placeholder="Enter new password"
              className="w-full rounded-lg pl-11 pr-12 py-3 outline-none"
              style={{
                border: `1px solid ${borderColor}`,
              }}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
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

        {/* Confirm Password */}

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
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder="Confirm password"
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
        >
          {loading
            ? "Updating..."
            : "Reset Password"}
        </button>
      </div>
    )}
  </div>
</div>
  );
};

export default ForgotPassword;