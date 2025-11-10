import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <div>
      <header className='w-full '>
        <Navbar/>
      </header>
      <main className='w-11/12 mx-auto'>
        <Outlet/>
      </main>
      
    </div>
  );
};

export default MainLayout;