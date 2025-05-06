import { register } from '@/store/slices/userSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [state, setState] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [password, setPassword] = useState("");
  const [GooglePayAccountNumber, setGooglePayAccountNumber] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [paypalEmail, setPayPalEmail] = useState("");

  const { loading, isAuthenticated } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);

    if (role === "Auctioneer") {
      formData.append("bankAccountName", bankAccountName);
      formData.append("bankAccountNumber", bankAccountNumber);
      formData.append("bankName", bankName);
      formData.append("GooglePayAccountNumber", GooglePayAccountNumber);
      formData.append("paypalEmail", paypalEmail);
    }

    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (role === "Bidder") {
      setGooglePayAccountNumber("");
      setBankAccountNumber("");
      setBankAccountName("");
      setBankName("");
      setPayPalEmail("");
    }
  }, [role]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(file);
      setProfileImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const renderIcon = (value, type = "text") => {
    if (!value) return null;
    if (type === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      return <FaTimesCircle className="text-rose-500 text-xl ml-2" />;
    }
    if (type === "phone" && value.length < 10) {
      return <FaTimesCircle className="text-rose-500 text-xl ml-2" />;
    }
    if (type === "password" && value.length < 6) {
      return <FaTimesCircle className="text-rose-500 text-xl ml-2" />;
    }
    return <FaCheckCircle className="text-emerald-500 text-xl ml-2" />;
  };

  return (
    <section className='w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-100 to-pink-100 px-4 py-8 lg:pl-[320px]'>
      <div className='bg-white mx-auto w-full max-w-5xl px-4 sm:px-8 py-8 rounded-xl shadow-lg'>
        <h1 className='text-purple-700 text-4xl font-bold mb-8 text-center'>Register</h1>

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleRegister}
          className='flex flex-col gap-6'
        >
          <div className='grid sm:grid-cols-2 gap-4'>
            {[
              { label: "Full Name", value: userName, setter: setUserName },
              { label: "Email", value: email, setter: setEmail, type: "email" },
              { label: "Phone", value: phone, setter: setPhone, type: "phone" },
              { label: "Address", value: address, setter: setAddress },
              { label: "Password", value: password, setter: setPassword, type: "password" },
            ].map(({ label, value, setter, type = "text" }, i) => (
              <div key={i} className='flex flex-col'>
                <label className='text-sm text-gray-600 font-medium'>{label}</label>
                <div className="flex items-center">
                  <input
                    type={type === "password" ? "password" : type === "email" ? "email" : "text"}
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    className='text-base py-2 bg-transparent border-b-2 border-purple-300 focus:border-purple-500 transition-all duration-300 focus:outline-none w-full'
                  />
                  {renderIcon(value, type)}
                </div>
              </div>
            ))}

            <div className='flex flex-col'>
              <label className='text-sm text-gray-600 font-medium'>Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className='text-base py-2 bg-transparent border-b-2 border-purple-300 focus:border-purple-500 transition-all duration-300 focus:outline-none'
              >
                <option value="">Select Role</option>
                <option value="Auctioneer">Auctioneer</option>
                <option value="Bidder">Bidder</option>
              </select>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-sm text-gray-600 font-medium'>Profile Image</label>
            <div className='flex items-center gap-3'>
              <img
                src={profileImagePreview || "/imageHolder.jpg"}
                alt="preview"
                className='w-14 h-14 rounded-full object-cover border'
              />
              <input type="file" accept="image/*" onChange={imageHandler} />
              {renderIcon(profileImage, "image")}
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <label className='font-semibold text-lg text-purple-700'>
              Payment Method Details
              <span className='text-sm text-gray-500 block'>
                Only required for Auctioneers
              </span>
            </label>

            <div className='grid sm:grid-cols-3 gap-4'>
              <div className='flex items-center'>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  disabled={role === "Bidder"}
                  className='text-base py-2 bg-transparent border-b-2 border-purple-300 focus:border-purple-500 transition-all duration-300 focus:outline-none w-full'
                >
                  <option value="">Select Your Bank</option>
                  <option value="SBI">SBI Bank</option>
                  <option value="BNB">Bank of Baroda (BNB)</option>
                  <option value="PNB">PNB Bank</option>
                  <option value="Kotak Bank">Kotak Bank</option>
                </select>
                {role === "Auctioneer" && renderIcon(bankName)}
              </div>

              <div className='flex items-center'>
                <input
                  type="text"
                  value={bankAccountNumber}
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                  placeholder='IBAN / IFSC'
                  disabled={role === "Bidder"}
                  className='text-base py-2 bg-transparent border-b-2 border-purple-300 focus:ring-purple-400 transition-all duration-300 focus:outline-none w-full'
                />
                {role === "Auctioneer" && renderIcon(bankAccountNumber)}
              </div>

              <div className='flex items-center'>
                <input
                  type="text"
                  value={bankAccountName}
                  onChange={(e) => setBankAccountName(e.target.value)}
                  placeholder='Bank Account Username'
                  disabled={role === "Bidder"}
                  className='text-base py-2 bg-transparent border-b-2 border-purple-300 focus:border-purple-500 transition-all duration-300 focus:outline-none w-full'
                />
                {role === "Auctioneer" && renderIcon(bankAccountName)}
              </div>
            </div>

            <div className='grid sm:grid-cols-2 gap-4'>
              <div className='flex items-center'>
                <input
                  type="number"
                  value={GooglePayAccountNumber}
                  onChange={(e) => setGooglePayAccountNumber(e.target.value)}
                  placeholder='Google Pay Account Number'
                  disabled={role === "Bidder"}
                  className='text-base py-2 bg-transparent border-b-2 border-purple-300 focus:border-purple-500 transition-all duration-300 focus:outline-none w-full'
                />
                {role === "Auctioneer" && renderIcon(GooglePayAccountNumber)}
              </div>

              <div className='flex items-center'>
                <input
                  type="email"
                  value={paypalEmail}
                  onChange={(e) => setPayPalEmail(e.target.value)}
                  placeholder='PayPal Email'
                  disabled={role === "Bidder"}
                  className='text-base py-2 bg-transparent border-b-2 border-purple-300 focus:border-purple-500 transition-all duration-300 focus:outline-none w-full'
                />
                {role === "Auctioneer" && renderIcon(paypalEmail, "email")}
              </div>
            </div>
          </div>

          <button
  className='bg-gradient-to-r w-[200px] from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 text-white font-semibold text-lg py-2 rounded-lg flex justify-center items-center gap-2 disabled:opacity-70 mx-auto'

            disabled={loading}
          >
            {loading ? (
              <>
                <ImSpinner2 className="animate-spin text-white text-xl" />
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Signup;
