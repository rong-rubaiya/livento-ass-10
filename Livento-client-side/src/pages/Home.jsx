import React from 'react';
import { useLoaderData } from 'react-router';
import Slider from './../components/homecompo/Slider';
import RealState from '../components/homecompo/RealState';
import ChoosUs from '../components/homecompo/ChoosUs';

const Home = () => {
  const data=useLoaderData();
  
  return (
    
    <div>
      <Slider data={data}></Slider>
      <RealState data={data}></RealState>
      <ChoosUs></ChoosUs>
    </div>
  );
};

export default Home;