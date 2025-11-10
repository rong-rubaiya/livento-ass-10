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













//  {user ? (
//           <div className="dropdown dropdown-end z-50 text-black">
//             <div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost btn-circle avatar"
//             >
//               <div className="w-9 border-2 border-gray-300 rounded-full">
//                 <img
//                   alt="Tailwind CSS Navbar component"
//                   referrerPolicy="no-referrer"
//                   src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
//                 />
//               </div>
//             </div>
//             <ul
//               tabIndex="-1"
//               className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
//             >
//               <div className=" pb-3 border-b border-b-gray-200">
//                 <li className="text-sm font-bold">{user.displayName}</li>
//                 <li className="text-xs">{user.email}</li>
//               </div>
//               <li className="mt-3">
//                 <Link to={"/profile"}>
//                   <FaUser /> Profile
//                 </Link>
//               </li>
//               <li>
//                 <a>
//                   {" "}
//                   <FaGear /> Settings
//                 </a>
//               </li>
//               <li>
//                 <button
                  
//                   className="btn btn-xs text-left bg-linear-to-r from-pink-500 to-red-500 text-white"
//                 >
//                    Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         ) : (
//            <div className="dropdown dropdown-end">
//             <NavLink to="/login">
             
//              <button className="slice">
//               <span className="text">Login / Signup</span>
//             </button>

//             </NavLink>



            
//           </div>
//         )}