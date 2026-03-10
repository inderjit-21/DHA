"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ChoseUs = () => {
  useEffect(() => {
    const TLC = gsap.timeline({
      scrollTrigger: {
        trigger: ".MainContChose",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
      },
    });
    
  }, []);


  return (
    <div className="MainContChose w-full h-[400vh] BG_GRAY max-sm:mt-0 sm:mt-[50vh] relative">
      <div className="w-full h-screen sticky top-0 left-0 bg-[#202020] flex justify-center items-center">
       
      </div>
    </div>
  );
};

export default ChoseUs;
