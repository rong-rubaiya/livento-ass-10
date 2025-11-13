import React, { use, useEffect, useState } from 'react';
import { Link, Navigate, NavLink } from 'react-router';
import logo from '../assets/liventologo.png';
import { motion } from 'framer-motion';
import './common.css'; 
import { AuthContext } from '../context/AuthContext';
import { FaUser } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { IoLogOut } from 'react-icons/io5';


const Navbar = () => {
 const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const {user,signOutUser}=use(AuthContext)
  // console.log(user);
  return (
    <motion.div className={`fixed  w-full top-0 z-50 transition-all duration-300 bg-[#0D263C] text-gray-300  ${
    scrolled ? 'bg-[#0D263C] w-full text-gray-300 shadow-xl' : ''
  }`}
     initial={{ y: -50, opacity: 0 }} 
    animate={{ y: 0, opacity: 1 }} 
    transition={{ duration: 1.5 }}>
      <div className="w-full md:w-11/12 mx-auto flex  flex-row items-center justify-between px-6 md:px-0 py-6">
        {/* Logo */}
        <div className="">
          <NavLink  to="/home">
            <img className="w-12 rounded-full" src={logo} alt="Livento Logo" />
          </NavLink>
        </div>

        {/* Navigation Links */}
        <motion.div className="hidden md:flex gap-9 items-center font-bold"
        initial={{ x: -50, opacity: 0 }} 
    animate={{ x: 0, opacity: 1 }} 
    transition={{ duration: 1.5 }}>
          <NavLink to="/" className="hover:text-[#EC6325] hover:scale-110 transition ease-in-out duration-30">Home</NavLink>
          <NavLink to="/properties" className="hover:text-[#EC6325] hover:scale-110 transition ease-in-out duration-30">All Properties</NavLink>
          <NavLink to="/add-property" className="hover:text-[#EC6325] hover:scale-110 transition ease-in-out duration-30">Add Properties</NavLink>
          <NavLink to="/my-properties" className="hover:text-[#EC6325] hover:scale-110 transition ease-in-out duration-30">My Properties</NavLink>
          <NavLink to="/my-ratings" className="hover:text-[#EC6325] hover:scale-110 transition ease-in-out duration-30">My Ratings</NavLink>
          
        </motion.div>



        {/*button */}
       
 <div className=''>
{user ? (
          <div className="dropdown dropdown-end z-50 text-black mr-3 md:mr-0 ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12 border-2 border-gray-300 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  referrerPolicy="no-referrer"
                  src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                />
              </div>
            </div>
            <ul
              tabIndex="1"
              className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-44 sm:w-52 p-2 shadow"
            >
              <div className=" pb-3 border-b border-b-gray-200">
                <li className="text-sm font-bold">{user.displayName}</li>
                <li className="text-xs">{user.email}</li>
              </div>
              <li className="mt-3">
                <Link to={"/my-profile"}>
                  <FaUser /> Profile
                </Link>
              </li>
              <li>
                <a>
                  {" "}
                  <FaGear /> Settings
                </a>
              </li>
              <li>
                {/* LogOut btn */}
                <button
                onClick={signOutUser}
                  
                  className="slice"
                >
                  <IoLogOut/><span className='text'> Logout</span>
                </button>
              </li>
            </ul>
          </div>
        ) : (
           <div className="dropdown dropdown-end">
            <NavLink to="/login"
          >
             
             <button className="slice hidden sm:block">

              <span className="text">Login / Signup</span>
            </button>

            </NavLink>



            
          </div>
        )}

         {/* Mobile Menu */}
        <div className="md:hidden dropdown border-2 border-white h-10">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
           className="menu menu-compact dropdown-content shadow bg-base-100 rounded-box w-52 text-black border-2 absolute right-0 mt-2"
          >
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/properties">All Properties</NavLink></li>
            <li><NavLink to="/add-property">Add Properties</NavLink></li>
            <li><NavLink to="/my-properties">My Properties</NavLink></li>
            <li><NavLink to="/my-ratings">My Ratings</NavLink></li>
            <li><NavLink to="/login">Login / Signup</NavLink></li>
          </ul>
        </div>

 </div>

       
      </div>
    </motion.div>
  );
};

export default Navbar;
