import { login } from '@/store/slices/userSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email.trim());
    formData.append('password', password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo('/');
    }
  }, [isAuthenticated]);

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.trim().length > 0;

  return (
    <section className='w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-100 to-pink-100 px-4 py-8 lg:pl-[320px]'>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='bg-white shadow-2xl w-full max-w-md px-6 py-8 rounded-2xl flex flex-col gap-6'
      >
        <h1 className='text-purple-700 text-4xl font-extrabold text-center'>Login</h1>
        <form className='flex flex-col gap-6' onSubmit={handleLogin}>
          {/* Email Field */}
          <div className='flex flex-col gap-1'>
            <label className='text-[15px] font-medium text-stone-700'>Email</label>
            <div className='relative'>
              <input
                type='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setTouched((prev) => ({ ...prev, email: true }));
                }}
                placeholder='Enter your email'
                className='peer border border-stone-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200'
              />
              <AnimatePresence mode='wait'>
                {touched.email && (
                  <motion.div
                    key={isEmailValid ? 'tick-email' : 'cross-email'}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                    className='absolute right-3 top-1/2 -translate-y-1/2'
                  >
                    {isEmailValid ? (
                      <FaCheckCircle className='text-green-500 text-lg' />
                    ) : (
                      <FaTimesCircle className='text-red-500 text-lg' />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Password Field */}
          <div className='flex flex-col gap-1'>
            <label className='text-[15px] font-medium text-stone-700'>Password</label>
            <div className='relative'>
              <input
                type='password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setTouched((prev) => ({ ...prev, password: true }));
                }}
                placeholder='Enter your password'
                className='peer border border-stone-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200'
              />
              <AnimatePresence mode='wait'>
                {touched.password && (
                  <motion.div
                    key={isPasswordValid ? 'tick-pass' : 'cross-pass'}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                    className='absolute right-3 top-1/2 -translate-y-1/2'
                  >
                    {isPasswordValid ? (
                      <FaCheckCircle className='text-green-500 text-lg' />
                    ) : (
                      <FaTimesCircle className='text-red-500 text-lg' />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Login Button */}
          <button
  className='bg-gradient-to-r w-[200px] from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 text-white font-semibold text-lg py-2 rounded-lg flex justify-center items-center gap-2 disabled:opacity-70 mx-auto'

            type='submit'
            disabled={loading}
          >
            {loading ? (
              <>
                <motion.span
                  className='inline-block'
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                >
                  <ImSpinner2 className='text-white text-xl' />
                </motion.span>
                Logging In...
              </>
            ) : (
              'Login'
            )}
          </button>

          {/* Forgot Password Link */}
          <div className='text-right'>
            <button
              type='button'
              className='text-purple-600 text-sm font-medium hover:underline'
              onClick={() => navigateTo('/forgot-password')}
            >
              Forgot Password?
            </button>
          </div>
          <div className='text-center'>
  <span className='text-sm text-stone-600'>
    Don't have an account?{' '}
    <button
      type='button'
      className='text-red-600 font-medium hover:underline'
      onClick={() => navigateTo('/sign-up')}
    >
      Sign Up
    </button>
  </span>
</div>
        </form>
      </motion.div>
    </section>
  );
};

export default Login;
