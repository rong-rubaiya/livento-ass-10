import React from 'react';
import imgLogo from "../assets/liventologo.png";
import { FaFacebook, FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { NavLink } from 'react-router';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-gray-300 dark:bg-[#0D263C] text-black dark:text-gray-200">
      <div className="w-11/12 mx-auto py-10 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">

        {/* Logo / Branding */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <img src={imgLogo} alt="Livento Logo" className="h-10 rounded-full" />
          <p className="text-sm md:text-base text-center md:text-left">
            Livento – Your trusted real estate platform.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <h3 className="text-lg font-semibold mb-2 border-b border-black/20 dark:border-white/20 pb-1">
            Quick Links
          </h3>
          <ul className="flex flex-col space-y-2 text-sm">
            <NavLink to="/home" className="hover:text-[#EC6325] dark:hover:text-orange-400 transition-all duration-200">
              Home
            </NavLink>
            <NavLink to="/properties" className="hover:text-[#EC6325] dark:hover:text-orange-400 transition-all duration-200">
              All Properties
            </NavLink>
            <NavLink to="/add-property" className="hover:text-[#EC6325] dark:hover:text-orange-400 transition-all duration-200">
              Add Property
            </NavLink>
            <NavLink to="/my-properties" className="hover:text-[#EC6325] dark:hover:text-orange-400 transition-all duration-200">
              My Properties
            </NavLink>
          </ul>
        </div>

        {/* Social / Contact */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <h3 className="text-lg font-semibold mb-2 border-b border-black/20 dark:border-white/20 pb-1">
            Contact / Social
          </h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform duration-200">
              <FaFacebook size={20} />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform duration-200">
              <FaGithub size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform duration-200">
              <FaLinkedinIn size={20} />
            </a>
            <a href="mailto:your-email@example.com" className="hover:scale-110 transition-transform duration-200">
              <FaXTwitter size={22} />
            </a>
            <a href="mailto:your-email@example.com" className="hover:scale-110 transition-transform duration-200">
              <MdEmail size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-black/20 dark:border-white/20 mt-8 pt-4 pb-7 text-center text-sm opacity-90">
        <p>
          <span className="font-semibold">Livento</span>. All rights reserved.
        </p>
        <p className="mt-1 italic text-gray-500 dark:text-gray-400">
          Crafted with ❤️ by Rubaiya Hamid Rongkoni
        </p>
      </div>
    </footer>
  );
};

export default Footer;
