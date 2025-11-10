import React, { use,  useState } from 'react';
import { motion } from 'framer-motion';
import homebg from '../assets/home-bg.jpg';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import openeye from '../assets/blackOpen.png';
import hideneye from '../assets/blackHide.png';
import { Link, useNavigate } from 'react-router'; // ✅ use react-router-dom instead of react-router
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = use(AuthContext); // ✅ useContext instead of use
  const [eyeOpen, setEyeOpen] = useState(false);
  const [confirmEyeOpen, setConfirmEyeOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // Password conditions
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasLength = password.length >= 6;

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Check password conditions first (before createUser)
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
      return;
    }

    const photoURL = e.target.photoURL.value;

    // ✅ Firebase createUser
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          title: "User created successfully!",
          icon: "success",
        });

        // ✅ Optional: update profile
        updateUserProfile({
          photoURL: photoURL,
        });

        navigate('/');
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

  // ✅ Google Sign In
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        Swal.fire({
          title: "Logged in successfully!",
          icon: "success",
        });
        console.log(result.user);
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
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC6325] focus:border-[#EC6325] placeholder:text-gray-400 text-gray-800"
              placeholder="Email Address"
            />
          </div>

          {/* Photo URL */}
          <div className="relative">
            <input
              type="url"
              name="photoURL"
              required
              className="peer w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC6325] focus:border-[#EC6325] placeholder:text-gray-400 text-gray-800"
              placeholder="Photo URL"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={eyeOpen ? 'text' : 'password'}
              name="password"
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
              alt="Toggle visibility"
            />
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
              alt="Toggle visibility"
            />
          </div>

          {/* Password validation */}
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
          <button
            onClick={handleGoogleSignIn}
            className="border border-gray-300 hover:scale-110 transition ease-in-out duration-300 bg-white text-black flex items-center justify-center gap-2 rounded-lg py-2"
          >
            <FcGoogle size={24} /> Sign in with Google
          </button>

          <button className="hover:scale-110 transition ease-in-out duration-300 flex items-center justify-center gap-2 bg-[#1877F2] text-white rounded-lg py-2">
            <FaFacebook size={24} /> Sign in with Facebook
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
