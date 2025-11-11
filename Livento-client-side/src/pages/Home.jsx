import React from 'react';
import { useLoaderData } from 'react-router';
import Slider from './../components/homecompo/Slider';
import RealState from '../components/homecompo/RealState';
import FAQSection from '../components/homecompo/FAQSection';
import ChoosUs from '../components/homecompo/ChoosUs';

import Agent from '../components/homecompo/Agent';




const Home = () => {
  const data=useLoaderData();
  
  return (
    
    <div>
      <Slider data={data}></Slider>
      <RealState data={data}></RealState>
      
      <FAQSection></FAQSection>
      <ChoosUs></ChoosUs>
      <Agent></Agent>
     
      
    </div>
  );
};

export default Home;