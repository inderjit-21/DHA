"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const MainCont = useRef();
  const AnimationCont = useRef();

  const CompanyName = [
    {
      firstName: ["D", "E", "S", "I", "G", "N"],
      LastName: ["H", "A", "W", "K"],
    },
  ];

  useEffect(() => {
    if (!AnimationCont.current) return;

    const TimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: MainCont.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
      },
    });
    TimeLine.to(AnimationCont.current, {
      clipPath: "inset(40% 2.5% 5% 2.5% round 20px)",
      ease: "none",
    });
    TimeLine.to(".CompanyNameText", {
      y: 0,
      opacity: 1,
      stagger: 0.07,
      ease: "power3.inOut",
    });
  }, []);

  return (
    <div ref={MainCont} className=" relative w-full h-[400vh] BG_GRAY ">
      {/* Stcky-Container */}
      <div className="w-full h-screen  overflow-hidden sticky top-0 left-0 BG_GRAY">
        {/* Company-Name */}
        <div className="w-full h-[39vh] absolute top-0 left-0 flex justify-center  overflow-hidden ">
          <div className="w-full h-fit flex max-sm:px-2 max-sm:flex-col mt-auto">
            {/* First-Name */}
            <div className="w-fit h-fit max-sm:h-[20vw] flex overflow-hidden mt-auto">
              {CompanyName[0].firstName.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="text-[15vw] max-sm:text-[20vw] w-fit h-fit flex CompanyNameText opacity-0 FontSemiBold translate-y-[100%] text-[#202020] leading-[15vw] mt-auto tracking-tighter"
                  >
                    {item}
                  </div>
                );
              })}
            </div>
            {/* Last-Name */}
            <div className="w-fit h-fit max-sm:h-[20vw] flex overflow-hidden mt-auto">
              {CompanyName[0].LastName.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="text-[15vw] max-sm:text-[20vw] w-fit h-fit CompanyNameText opacity-0 FontSemiBold translate-y-[100%] flex leading-[15vw] text-[#202020] mt-auto tracking-tighter"
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Animation-Container */}
        <div
          ref={AnimationCont}
          style={{ clipPath: "inset(0% 0% 0% 0%)" }}
          className="w-full h-full z-50"
        >
          <img
            src={`/imgs/home/heroSection/BG1.jpg`}
            alt="IMG"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
