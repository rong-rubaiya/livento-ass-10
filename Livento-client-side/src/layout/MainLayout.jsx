import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer.jsx';

const MainLayout = () => {
  return (
    <div>
      <header className='w-full '>
        <Navbar/>
      </header>
      <main className='w-11/12 mx-auto'>
        <Outlet/>
      </main>
      <footer>
        <Footer/>
      </footer>
      
    </div>
  );
};

export default MainLayout;