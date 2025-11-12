import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer.jsx';
import { Outlet, useLocation } from 'react-router';
import Loading from '../components/Loading'; 

const MainLayout = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timer);
  }, [location]); 

  return (
    <div className="relative min-h-screen">
      <header className='w-full'>
        <Navbar />
      </header>

      {loading && <Loading />} 

      <main className='w-full'>
        {!loading && <Outlet />}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
