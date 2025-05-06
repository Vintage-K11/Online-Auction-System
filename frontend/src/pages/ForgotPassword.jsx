import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendOtpForReset } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const response = await dispatch(sendOtpForReset(email));
      if (response.success) {
        navigate("/reset-password", { state: { email } });
      } else {
        toast.error(response?.error || "Failed to send OTP");
      }
    } catch (err) {
      console.error("Send OTP Error:", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-purple-200 px-4"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
          Forgot Your Password?
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Enter your registered email. We'll send you an OTP to reset your password.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 mb-6 transition duration-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: loading ? 1 : 1.05 }}
          whileTap={{ scale: loading ? 1 : 0.95 }}
          disabled={!email || loading}
          onClick={handleSendOtp}
          className={`w-full py-3 text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center gap-2 ${
            email && !loading
              ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              : "bg-gray-300 cursor-not-allowed"
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
              Sending...
            </>
          ) : (
            "Send OTP"
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
