import React from "react";
import { Link, useLoaderData } from "react-router";
import { motion } from "framer-motion";
import { FaStar, FaUserCircle, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const SortSingle = () => {
  const data = useLoaderData();
  const property = data.result;
  // console.log(property);

  return (
    <div></div>
  );
};

export default SortSingle;
