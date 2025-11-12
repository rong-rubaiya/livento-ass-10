import React, { use, useState } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import homebg from '../assets/home-bg.jpg';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import openeye from '../assets/blackOpen.png';
import hideneye from '../assets/blackHide.png';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';


const Login = () => {
  const [eyeOpen, setEyeOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signInUser, signInWithGoogle } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  // Password validation conditions
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasLength = password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!hasUppercase || !hasLowercase || !hasLength) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "⚠ Please meet all password conditions before signing in!",
      });
      return;
    }

    // Proceed with login logic
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(email, password);
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        Swal.fire({
                  title: "User login successfully!",
                  icon: "success",
                });
        e.target.reset();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      });


  };


  // google sign in

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
       navigate(location?.state || "/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-10">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${homebg})` }}
      />
      <div className="absolute inset-0 bg-[#0E243B]/90" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-md p-8 bg-white sm:rounded-xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <input
             type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email Address"
            className="w-full p-3  focus:bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#EC6325] focus:border-[#EC6325] placeholder-gray-400  text-black"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={eyeOpen ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#EC6325] focus:border-[#EC6325] text-black placeholder-gray-400"
            />
            <img
              onClick={() => setEyeOpen(!eyeOpen)}
              src={eyeOpen ? openeye : hideneye}
              alt="toggle"
              className="absolute right-3 top-3 h-6 w-6 cursor-pointer"
            />
          </div>

          {/* Password Conditions */}
          {password && (
            <div className="text-sm mt-1   text-black space-y-1">
              <p>Password characters: <strong>{password.length}</strong></p>
              <p className={hasUppercase ? "text-green-600" : "text-red-500"}>
                {hasUppercase ? "✔" : "✖"} Must contain an Uppercase letter
              </p>
              <p className={hasLowercase ? "text-green-600" : "text-red-500"}>
                {hasLowercase ? "✔" : "✖"} Must contain a Lowercase letter
              </p>
              <p className={hasLength ? "text-green-600" : "text-red-500"}>
                {hasLength ? "✔" : "✖"} Must be at least 6 characters long
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#EC6325] text-white py-3 rounded-lg font-semibold hover:bg-[#d15c20] transition-all duration-300"
          >
            Login
          </button>
        </form>

        
        {/* Register Link */}
        <p className="text-center  text-black py-4 hidden sm:block">
          New here?{' '}
          <Link to="/register" className="text-[#EC6325] italic font-semibold underline">
            Create an account
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
          <button
          onClick={handleGoogleSignIn}
          className="btn btn-primary border-none shadow-black hover:scale-110 transition ease-in-out duration-300 bg-white text-black flex items-center justify-center gap-2">
            <FcGoogle size={24} /> Sign in with Google
          </button>
          <button className="btn btn-primary border-none shadow-black hover:scale-110 transition ease-in-out duration-300 text-white flex items-center justify-center gap-2">
            <FaFacebook size={24} /> Sign in with Facebook
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export default Login;
