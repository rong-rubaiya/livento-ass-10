import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../assets/livento logo.png';
import { motion } from 'framer-motion';
import './common.css'; 


const Navbar = () => {
  return (
    <motion.div className="navbar shadow-sm border-b-2 bg-[#0D263C] text-white"
     initial={{ y: -50, opacity: 0 }} 
    animate={{ y: 0, opacity: 1 }} 
    transition={{ duration: 1.5 }}>
      <div className="w-full md:w-11/12 mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="">
          <NavLink  to="/">
            <img className="w-18 rounded-full" src={logo} alt="Livento Logo" />
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



        {/* profile */}
        <div className="flex gap-2 items-center">
         
          <div className="dropdown dropdown-end">
            <NavLink to="/login">
             
             <button className="slice">
              <span className="text">Login / Signup</span>
            </button>

            </NavLink>


            
            {/* <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="User Avatar"
                />
              </div>
            </div> */}
            {/* <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul> */}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 le" fill="none"
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
    </motion.div>
  );
};

export default Navbar;
