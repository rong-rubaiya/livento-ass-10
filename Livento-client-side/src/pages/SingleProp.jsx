import React from 'react';
import { useLoaderData } from 'react-router';

const SingleProp = () => {
  const data=useLoaderData
  const property=data.result;
  console.log(property);
  return (
    <div>
      I am single
    </div>
  );
};

export default SingleProp;