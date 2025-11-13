import React, { useEffect } from 'react';
import { useLoaderData, useLocation } from 'react-router';
import Slider from './../components/homecompo/Slider';
import RealState from '../components/homecompo/RealState';
import FAQSection from '../components/homecompo/FAQSection';
import ChoosUs from '../components/homecompo/ChoosUs';

import Agent from '../components/homecompo/Agent';




const Home = () => {
  const data=useLoaderData();
  const pathname=useLocation()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return (
    
    <div className= 'mt-16'>
      <Slider data={data}></Slider>
      <RealState data={data}></RealState>
      
      <FAQSection></FAQSection>
      <ChoosUs></ChoosUs>
      <Agent></Agent>
     
      
    </div>
  );
};

export default Home;