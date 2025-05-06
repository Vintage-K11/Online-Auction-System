import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';

// Layout
import SideDrawer from './layout/SideDrawer';

// Pages
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SubmitCommission from './pages/SubmitCommission';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import Leaderboard from './pages/Leaderboard';
import Auction from './pages/Auctions';
import AuctionItem from './pages/AuctionItem';
import CreateAuction from './pages/CreateAuction';
import ViewMyAuctions from './pages/ViewMyAuctions';
import ViewAuctionDetail from './pages/ViewAuctionDetails';
import Dashboard from './pages/Dashboard/Dashboard';
import Contact from './pages/Contact';
import UserProfile from './pages/UserProfile';
import Not from './pages/Not';
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import './index.css'


// Redux actions
import { fetchLeaderboard, fetchUser } from './store/slices/userSlice';
import { getAllAuctionItems } from './store/slices/auctionSlice';





const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(getAllAuctionItems());
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  return (
    <>
      <Router>
        <SideDrawer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/submit-commission" element={<SubmitCommission />} />
          <Route path="/how-it-works-inf0" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/auctions" element={<Auction />} />
          <Route path="/auction/item/:id" element={<AuctionItem />} />
          <Route path="/create-auction" element={<CreateAuction />} />
          <Route path="/view-my-auctions" element={<ViewMyAuctions />} />
          <Route path="/auction/details/:id" element={<ViewAuctionDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/me" element={<UserProfile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* 404 - Catch All */}
          <Route path="*" element={<Not />} />
        </Routes>

        <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light" // this gives colored backgrounds based on type (success, error, info, etc.)
/>
      </Router>
    </>
  );
};

export default App;
