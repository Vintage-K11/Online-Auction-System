import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { verifyOtpAndResetPassword } from "../store/slices/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const isPasswordValid = newPassword.length >= 8;
  const isConfirmValid = confirm === newPassword && confirm.length >= 8;

  if (!email) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-100 via-blue-100 to-purple-200"
      >
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Session Expired</h2>
          <p className="text-gray-600 mb-4">
            Please go back and request OTP again.
          </p>
          <button
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded"
            onClick={() => navigate("/forgot-password")}
          >
            Go Back
          </button>
        </div>
      </motion.div>
    );
  }

  const handleReset = async () => {
    if (!isPasswordValid) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (!isConfirmValid) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await dispatch(
        verifyOtpAndResetPassword({ email, otp, newPassword })
      );

      if (res.success) {
        toast.success(res.message || "Password reset successful!");
        navigate("/login");
      } else {
        toast.error(res.error || "Reset failed");
      }
    } catch (err) {
      console.error("❌ Error in Reset:", err);
      toast.error(err?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-100 via-blue-100 to-purple-200"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
          Reset Your Password
        </h2>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <div className="relative mb-4">
          <input
            type="password"
            placeholder="New Password"
            className={`w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 ${
              newPassword.length === 0
                ? "border-gray-300"
                : isPasswordValid
                ? "border-green-500 focus:ring-green-300"
                : "border-red-500 focus:ring-red-300"
            }`}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            minLength={8}
          />
          {newPassword.length > 0 && (
            <span className="absolute top-3 right-3 text-xl">
              {isPasswordValid ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <FaTimesCircle className="text-red-500" />
              )}
            </span>
          )}
        </div>

        <div className="relative mb-6">
          <input
            type="password"
            placeholder="Confirm Password"
            className={`w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 ${
              confirm.length === 0
                ? "border-gray-300"
                : isConfirmValid
                ? "border-green-500 focus:ring-green-300"
                : "border-red-500 focus:ring-red-300"
            }`}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          {confirm.length > 0 && (
            <span className="absolute top-3 right-3 text-xl">
              {isConfirmValid ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <FaTimesCircle className="text-red-500" />
              )}
            </span>
          )}
        </div>

        <motion.button
          whileHover={{ scale: loading ? 1 : 1.05 }}
          whileTap={{ scale: loading ? 1 : 0.95 }}
          disabled={loading || !otp}
          onClick={handleReset}
          className={`w-full py-3 text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center gap-2 ${
            !otp || loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="w-5 h-5 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
