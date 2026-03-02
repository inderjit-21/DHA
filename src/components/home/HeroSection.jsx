"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Data = [
  {
    Url: `/imgs/home/heroSection/Img1.webp`,
    Num: 1,
    herf: ``,
    text: ``,
  },
  {
    Url: `/imgs/home/heroSection/Img2.webp`,
    Num: 2,
    herf: ``,
    text: ``,
  },
  {
    Url: `/imgs/home/heroSection/Img3.webp`,
    Num: 3,
    herf: ``,
    text: ``,
  },
  {
    Url: `/imgs/home/heroSection/Img4.webp`,
    Num: 4,
    herf: ``,
    text: ``,
  },
];

const HeroSection = () => {
  const numberRef = useRef(null);

  // Home-Hero-Section-Time-Line
  useEffect(() => {
    const HHSTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".HomeheroSectionContMain",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
      },
    });
    HHSTL.to(".HeroContDiv4", {
      clipPath: "inset(0% 0% 100% 0%)",
      ease: "none",
    },'a1');
    HHSTL.to(".NumContText", {
      y:'-10vw'
    },'a1');
    HHSTL.to(".HeroContDiv3", {
      clipPath: "inset(0% 0% 100% 0%)",
      ease: "none",
    },'a2');
     HHSTL.to(".NumContText", {
      y:'-20vw'
    },'a2');
    HHSTL.to(".HeroContDiv2", {
      clipPath: "inset(0% 0% 100% 0%)",
      ease: "none",
    },'a3');
     HHSTL.to(".NumContText", {
      y:'-30vw'
    },'a3');
   
    
   
  }, []);

  return (
    <div
      style={{ height: `${Data.length * 100 * 2}vh` }}
      className={`w-full relative HomeheroSectionContMain`}
    >
      {/* Grid-Container */}
      <div className="w-full h-screen sticky top-0 left-0 bg-white grid grid-cols-[1fr_5fr] grid-rows-[1fr_5fr]">
        {/* Top Left */}
        <div className=""></div>

        {/* Top Right */}
        <div className=" w-full h-full flex justify-between items-end pr-8 pb-2">
          <p>Designs</p>
          <p>@2k26</p>
        </div>

        {/* Bottom Left */}
        <div className="w-full h-full flex flex-col px-8 pb-8 justify-between items-center">
          <div className="w-full h-fit flex flex-col gap-2">
            <p className=" uppercase text-[2rem] leading-[2rem]">Refined Architecture for Modern Living.</p>
          <p className="text-[1rem] leading-[1rem] capitalize"> Let's Shape the <span>Future</span> with us, build yure vision <span>today!</span></p>
          </div>
          <div
            ref={numberRef}
            className="w-full h-[10vw] select-none text-[10vw] leading-[10vw] tracking-tight flex justify-center  overflow-hidden"
          >
            0 <span className="h-fit NumContText overflow-hidden flex flex-col">
                {
                    Data.map((item,index)=>{
                        return <span key={index}> {item.Num}</span>
                    })
                }

            </span>
          </div>
        </div>

        {/* Bottom Right */}
        <div className=" relative overflow-hidden flex justify-center items-center">
          {Data.map((item, index) => {
            return (
              <div
                key={index}
                className={`w-full h-full flex overflow-hidden absolute justify-center items-center bottom-0 right-0 shrink-0 will-change-transform  HeroContDiv${item.Num} `}
                style={{ zIndex: index, clipPath: "inset(0% 0% 0% 0%)" }}
              >
                <Image
                  src={item.Url}
                  width={1000}
                  height={1000}
                  alt="Img"
                  className="w-full h-full object-center object-cover shrink-0  will-change-transform "
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
