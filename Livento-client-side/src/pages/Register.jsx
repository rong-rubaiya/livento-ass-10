import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import homebg from '../assets/home-bg.jpg';
import openeye from '../assets/blackOpen.png';
import hideneye from '../assets/blackHide.png';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const [eyeOpen, setEyeOpen] = useState(false);
  const [confirmEyeOpen, setConfirmEyeOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const pathname=useLocation()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Password validation
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasLength = password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!hasUppercase || !hasLowercase || !hasLength) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '⚠ Please meet all password conditions before signing up!',
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '❗ Confirm password doesn’t match.',
      });
      return;
    }

    // Firebase create user
    createUser(email, password)
      .then((result) => {
        // Update displayName and photoURL
        updateUserProfile(name, e.target.photoURL.value)
          .then(() => {
            Swal.fire({
              title: 'User created successfully!',
              icon: 'success',
            });
            navigate('/');
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        Swal.fire({
          title: 'Logged in successfully!',
          icon: 'success',
        });
        navigate('/');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20 ">
      <title>Register</title>
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${homebg})` }}
      ></div>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-md p-8 bg-white rounded-xl shadow-2xl z-10 mt-10"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 ">
          {/* Name */}
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC6325] focus:border-[#EC6325] placeholder:text-gray-400 text-gray-800"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC6325] focus:border-[#EC6325] placeholder:text-gray-400 text-gray-800"
          />

          {/* Photo URL */}
          <input
            type="url"
            name="photoURL"
            placeholder="Photo URL"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC6325] focus:border-[#EC6325] placeholder:text-gray-400 text-gray-800"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={eyeOpen ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC6325] focus:border-[#EC6325] placeholder:text-gray-400 text-gray-800"
            />
            <img
              src={eyeOpen ? openeye : hideneye}
              alt="Toggle visibility"
              className="h-6 w-6 absolute right-3 top-3 cursor-pointer"
              onClick={() => setEyeOpen(!eyeOpen)}
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={confirmEyeOpen ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC6325] focus:border-[#EC6325] placeholder:text-gray-400 text-gray-800"
            />
            <img
              src={confirmEyeOpen ? openeye : hideneye}
              alt="Toggle visibility"
              className="h-6 w-6 absolute right-3 top-3 cursor-pointer"
              onClick={() => setConfirmEyeOpen(!confirmEyeOpen)}
            />
          </div>

          {/* Password Validation */}
          {password && (
            <div className="text-sm mt-1 space-y-1 text-gray-700">
              <p>Password characters: <strong>{password.length}</strong></p>
              <p className={`${hasUppercase ? 'text-green-600' : 'text-red-500'}`}>
                {hasUppercase ? '✔' : '✖'} Must contain an Uppercase letter
              </p>
              <p className={`${hasLowercase ? 'text-green-600' : 'text-red-500'}`}>
                {hasLowercase ? '✔' : '✖'} Must contain a Lowercase letter
              </p>
              <p className={`${hasLength ? 'text-green-600' : 'text-red-500'}`}>
                {hasLength ? '✔' : '✖'} Must be at least 6 characters long
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#EC6325] text-white py-3 rounded-lg font-semibold hover:bg-[#d15c20] transition-all duration-300"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  
                           
                           <button
                             onClick={handleGoogleSignIn}
                             className="btn btn-primary border-none shadow-black hover:scale-110 transition ease-in-out duration-300 bg-white text-black flex items-center justify-center gap-2"
                           >
                             <FcGoogle size={24} /> Sign in with Google
                           </button>
                 
                           
                 <button className="btn btn-primary border-none shadow-black hover:scale-110 transition ease-in-out duration-300 text-white flex items-center justify-center gap-2">
                   <FaFacebook size={24} /> Sign in with Facebook
                 </button>
               </div>

        {/* Already have account */}
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-[#EC6325] font-semibold underline italic">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
