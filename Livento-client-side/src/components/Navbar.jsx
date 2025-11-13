import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router';
import logo from '../assets/liventologo.png';
import { motion } from 'framer-motion';
import './common.css';
import { AuthContext } from '../context/AuthContext';
import { FaUser } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { IoLogOut } from 'react-icons/io5';
import { use } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user, signOutUser } = use(AuthContext);

  // Handle scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme toggle
  const handleTheme = (checked) => {
    const html = document.querySelector('html');
    if (checked) html.setAttribute('data-theme', 'dark');
    else html.setAttribute('data-theme', 'light');
  };

  return (
    <motion.div
      className={`fixed w-full top-0 z-50 transition-all duration-300
        ${scrolled ? 'shadow-xl' : ''}
        bg-gray-100 text-black dark:bg-[#0D263C] dark:text-gray-300`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className="w-full md:w-11/12 mx-auto flex flex-row items-center justify-between px-6 md:px-0 py-6">
        {/* Logo */}
        <NavLink to="/home">
          <img className="w-12 rounded-full" src={logo} alt="Livento Logo" />
        </NavLink>

        {/* Navigation Links (Desktop) */}
        <motion.div
          className="hidden md:flex gap-9 items-center font-bold"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {['/', '/properties', '/add-property', '/my-properties', '/my-ratings'].map((path, idx) => (
            <NavLink
              key={idx}
              to={path}
              className="hover:text-[#EC6325] dark:hover:text-orange-400 hover:scale-110 transition ease-in-out duration-300"
            >
              {['Home', 'All Properties', 'Add Properties', 'My Properties', 'My Ratings'][idx]}
            </NavLink>
          ))}
        </motion.div>

        {/* User / Auth Buttons */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="dropdown dropdown-end z-50">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-12 border-2 border-gray-300 rounded-full">
                  <img
                    alt="User Avatar"
                    referrerPolicy="no-referrer"
                    src={user.photoURL || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
                  />
                </div>
              </div>
              <ul
                tabIndex={1}
                className="menu menu-sm dropdown-content mt-3 w-44 sm:w-52 p-2 shadow rounded-box
                  bg-gray-300 text-black dark:bg-[#0D263C] dark:text-gray-300"
              >
                <div className="pb-3 border-b border-gray-200 dark:border-gray-700">
                  <li className="text-sm font-bold">{user.displayName}</li>
                  <li className="text-xs">{user.email}</li>
                </div>
                <li className="mt-3">
                  <Link to="/my-profile">
                    <FaUser /> Profile
                  </Link>
                </li>
                <li>
                  <a>
                    <FaGear /> Settings
                  </a>
                </li>
                <li>
                  <label className="swap swap-rotate">
                    <input
                      type="checkbox"
                      onChange={(e) => handleTheme(e.target.checked)}
                    />
                    {/* Sun Icon */}
                    <svg
                      className="swap-off h-10 w-10 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>
                    {/* Moon Icon */}
                    <svg
                      className="swap-on h-10 w-10 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                  </label>
                </li>
                <li>
                  <button onClick={signOutUser} className="slice flex items-center gap-2">
                    <IoLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink to="/login">
              <button className="slice hidden sm:block">Login / Signup</button>
            </NavLink>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden dropdown border-2 border-white h-10">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul className="menu menu-compact dropdown-content shadow bg-white dark:bg-[#0D263C] dark:text-gray-300 rounded-box w-52 absolute right-0 mt-2 border-2 border-black dark:border-gray-700">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/properties">All Properties</NavLink></li>
              <li><NavLink to="/add-property">Add Properties</NavLink></li>
              <li><NavLink to="/my-properties">My Properties</NavLink></li>
              <li><NavLink to="/my-ratings">My Ratings</NavLink></li>
              {!user && <li><NavLink to="/login">Login / Signup</NavLink></li>}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
