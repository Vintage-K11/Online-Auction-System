import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    leaderboard: [],
  },
  reducers: {
    registerRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    fetchUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    fetchUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },

    logoutSuccess(state, action) {
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
    },
    fetchLeaderboardRequest(state, action) {
      state.loading = true;
      state.leaderboard = [];
    },
    fetchLeaderboardSuccess(state, action) {
      state.loading = false;
      state.leaderboard = action.payload;
    },
    fetchLeaderboardFailed(state, action) {
      state.loading = false;
      state.leaderboard = [];
    },
    otpRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    otpSuccess: (state, action) => {
      state.loading = false;
      toast.success(action.payload);
    },
    otpFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    },
    resetRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    resetSuccess: (state, action) => {
      state.loading = false;
      toast.success(action.payload);
      state.step = 1;
      state.otp = "";
      state.email = "";
    },
    resetFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    },

    // Helpers
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
   

    clearAllErrors(state, action) {
      state.user = state.user;
      state.isAuthenticated = state.isAuthenticated;
      state.leaderboard = state.leaderboard;
      state.loading = false;
    },
  },
});

const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/register",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.registerSuccess(response.data));
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.registerFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  }
};

const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/login",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.loginSuccess(response.data));
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  }
};

const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/user/logout",
      { withCredentials: true }
    );
    dispatch(userSlice.actions.logoutSuccess());
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  }
};

const verifyOtpAndResetPassword = (data) => async (dispatch) => {
  dispatch(userSlice.actions.resetRequest());
  try {
    const res = await axios.post("http://localhost:3000/api/v1/user/reset-password", data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    const message = res.data?.message || "Password reset successful";
    dispatch(userSlice.actions.resetSuccess(message));

    return { success: true, message };
  } catch (error) {
    const errMsg = error.response?.data?.message || "Password reset failed";
    dispatch(userSlice.actions.resetFailed(errMsg));

    return { success: false, error: errMsg };
  }
};
const sendOtpForReset = (email) => async (dispatch) => {
  dispatch(userSlice.actions.otpRequest());
  try {
    const res = await axios.post("http://localhost:3000/api/v1/user/forgot-password", { email }, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    const message = res.data?.message || "OTP sent successfully";
    dispatch(userSlice.actions.otpSuccess(message));
    dispatch(userSlice.actions.setEmail(email));
    dispatch(userSlice.actions.setStep(2));

    return { success: true, message };
  } catch (error) {
    const errMsg = error.response?.data?.message || "Failed to send OTP";
    dispatch(userSlice.actions.otpFailed(errMsg));
    return { success: false, error: errMsg };
  }
};
const verifyOtp = ({ email, otp }) => async (dispatch) => {
  dispatch(userSlice.actions.otpRequest());
  try {
    const res = await axios.post("http://localhost:3000/api/v1/user/verify-otp", { email, otp }, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    dispatch(userSlice.actions.otpSuccess(res.data?.message || "OTP Verified!"));
    dispatch(userSlice.actions.setStep(3));
  } catch (error) {
    const errMsg = error.response?.data?.message || "Invalid OTP";
    dispatch(userSlice.actions.otpFailed(errMsg));
    throw error;
  }
};
 const fetchUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const response = await axios.get("http://localhost:3000/api/v1/user/me", {
      withCredentials: true,
    });
    dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.fetchUserFailed());
    dispatch(userSlice.actions.clearAllErrors());
    console.error(error);
  }
};

 const fetchLeaderboard = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchLeaderboardRequest());
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/user/leaderboard",
      {
        withCredentials: true,
      }
    );
    dispatch(
      userSlice.actions.fetchLeaderboardSuccess(response.data.leaderboard)
    );
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.fetchLeaderboardFailed());
    dispatch(userSlice.actions.clearAllErrors());
    console.error(error);
  }
};
export {
  sendOtpForReset,
  verifyOtp,
  verifyOtpAndResetPassword,
  register,
  login,
  logout,
  fetchUser,
  fetchLeaderboard,
};

export const {
  setOtp,
  setStep,
  setEmail,
  clearAllErrors,
} = userSlice.actions;

export default userSlice;
