import React from "react";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="h-[75vh] flex flex-col md:flex-row items-center justify-center">
      <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className=" text-4xl lg:text-6xl text-cyan-200 text-center lg:text-left font-fredrick">Learn from LearnSphere..</h1>
        <p className=" mt-4 text-xl text-cyan-200 text-center font-tapestry lg:text-left">
          Find all the necessary courses that we have for you from here.
        </p>
        <div className="mt-8">
          <Link to="/allcourses" className=" text-cyan-200 font-fredrick text-xl lg:text-2xl border border-cyan-800 rounded-full px-10 py-2 hover:bg-cyan-500 hover:text-cyan-200">
            More Courses
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center ">
      <img src="/Hero.png" alt="hero"/>
      </div>
    </div>
  );
};

export default Hero;
