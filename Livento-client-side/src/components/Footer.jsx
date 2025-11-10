import React from 'react';
import imgLogo from "../assets/liventologo.png";
import { FaFacebook, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { NavLink } from 'react-router';


const Footer = () => {
  return (
    <footer
   
    className=" sm:footer-horizontal bg-[#0D263C] text-neutral-content  text-center">
  <div className='mx-auto py-10 w-11/12 flex flex-col sm:flex-row justify-between '>
    <aside className=''>
   <div className='flex flex-col sm:flex-row gap-3 items-center pb-3.5 sm:pb-0'><img className='h-10 rounded-4xl' src={imgLogo} alt="" /></div>
   
  </aside>
  
   <div className='pb-3.5 sm:pb-0'>
          <h2 className="text-lg font-semibold mb-3 border-b border-white/20 inline-block pb-3.5 sm:pb-1">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm flex flex-col">
            <NavLink to="/" className="hover:text-[#EC6325] hover:scale-110 transition ease-in-out duration-30">Home</NavLink>
          <NavLink to="/properties" className="hover:text-[#EC6325] hover:scale-110 transition ease-in-out duration-30">All Properties</NavLink>
            
            
          </ul>
        </div>


  <div className="flex justify-center sm:justify-start gap-5 mt-3">
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
              <MdEmail size={22} />
            </a>
          </div>
  </div>

          <div className="border-t border-white/20 mt-8 pt-4 text-center text-sm opacity-90 pb-7">
        <p>
          <span className="font-semibold">Livento</span>. All rights reserved.  
        </p>
        <p className="mt-1 italic text-gray-200">Crafted with ❤️ by Rubaiya Hamid Rongkoni</p>
      </div>
          


          
 
</footer>
  );
};

export default Footer;