import React, { useState } from 'react';
import { motion } from 'framer-motion';
import homebg from '../assets/home-bg.jpg';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import openeye from '../assets/blackOpen.png';
import hideneye from '../assets/blackHide.png';
import { Link, useNavigate } from 'react-router'; // Use react-router-dom for navigation
import Swal from 'sweetalert2';

const Register = () => {
  const [eyeOpen, setEyeOpen] = useState(false);
  const [confirmEyeOpen, setConfirmEyeOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Hook to navigate

  // password conditions

 const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasLength = password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();

     if (!hasUppercase || !hasLowercase || !hasLength) {
   Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "⚠ Please meet all password conditions before signing up!",
  
});
      return;
    
    }

    if (password !== confirmPassword) {
      Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "❗ Confirm password doesn’t match.",
  
  
});
return
    }

    console.log('Email:', email, 'Password:', password);
    
    // After registration, navigate to home page
    navigate('/'); // You can replace '/' with any desired route
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-10">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${homebg})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-md p-8 bg-white sm:rounded-xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC6325] focus:border-[#EC6325] placeholder:text-gray-400 text-gray-800"
              placeholder="Email Address"
            />
            <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
              peer-focus:top-1 peer-focus:text-[#EC6325] peer-focus:text-sm">
             
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={eyeOpen ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC6325] focus:border-[#EC6325] placeholder:text-gray-400 text-gray-800"
              placeholder="Password"
            />
            <img
              onClick={() => setEyeOpen(!eyeOpen)}
              className="h-6 w-6 right-3 top-3 absolute cursor-pointer"
              src={!eyeOpen ? hideneye : openeye}
              alt=""
            />
            <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
              peer-focus:top-1 peer-focus:text-[#EC6325] peer-focus:text-sm">
              
            </label>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={confirmEyeOpen ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="peer w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC6325] focus:border-[#EC6325] placeholder:text-gray-400 text-gray-800"
              placeholder="Confirm Password"
            />
            <img
              onClick={() => setConfirmEyeOpen(!confirmEyeOpen)}
              className="h-6 w-6 right-3 top-3 absolute cursor-pointer"
              src={!confirmEyeOpen ? hideneye : openeye}
              alt=""
            />
            <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
              peer-focus:top-1 peer-focus:text-[#EC6325] peer-focus:text-sm">
           
            </label>
          </div>

          {password && (
                <div className="text-sm mt-1 space-y-1 text-gray-700">
                  <p>Password characters: <strong>{password.length}</strong></p>
                  <p className={`${hasUppercase ? "text-green-600" : "text-red-500"}`}>
                    {hasUppercase ? "✔" : "✖"} Must contain an Uppercase letter
                  </p>
                  <p className={`${hasLowercase ? "text-green-600" : "text-red-500"}`}>
                    {hasLowercase ? "✔" : "✖"} Must contain a Lowercase letter
                  </p>
                  <p className={`${hasLength ? "text-green-600" : "text-red-500"}`}>
                    {hasLength ? "✔" : "✖"} Must be at least 6 characters long
                  </p>
                </div>
              )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#EC6325] text-white py-3 rounded-lg font-semibold hover:bg-[#d15c20] transition-all duration-300"
          >
            Register
          </button>
        </form>

        {/* Already have account */}
        <p className="text-center py-4 hidden sm:block">
          Already have an account?{' '}
          <Link to="/login">
            <span className="text-[#EC6325] italic font-semibold underline">
              Login
            </span>
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn btn-primary border-none shadow-black hover:scale-110 transition ease-in-out duration-300 bg-white text-black flex items-center justify-center gap-2">
            <FcGoogle size={24} /> Sign in with Google
          </button>

          <button className="btn btn-primary hover:scale-110 transition ease-in-out duration-300 flex items-center justify-center gap-2">
            <FaFacebook size={24} /> Sign in with Facebook
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
