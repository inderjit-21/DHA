'use client'
import React from "react";
import gsap from "gsap";

const NavBar = () => {

    // Contact-Btn-Mouse-Enter
    const EnterTalkBtn = () =>{
        gsap.to('.TalkBtnGrid',{
            opacity:1,
            stagger:{
                each:0.01,
                from: "random",
            },
            ease:'power4.out'
        })
    }

    // Contact-Btn-Mouse-Leave
    const LeaveTalkBtn = () =>{
        gsap.to('.TalkBtnGrid',{
            opacity:0,
            stagger:{
                each:0.005,
                from: "random",
            },
            ease:'power4.out'
        })
    }

  return (
    <div className="fixed w-full h-fit px-8 py-4 flex justify-between items-center z-87">
      {/* Logo */}
      <div className="text-[1.5rem] select-none">DHA</div>

      {/* Contact */}
      <div onMouseEnter={EnterTalkBtn} onMouseLeave={LeaveTalkBtn} className=" bg-[#f5f5f5] px-4 py-2 relative transition-all duration-150 hover:text-white ">
        <p className="font-medium z-20 relative select-none text-[1rem]">Let`s Talk</p>
        <div className="w-full h-full absolute top-0 left-0 grid grid-cols-8 grid-row-4  z-10 ">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="w-full h-full bg-[#572f2f] TalkBtnGrid opacity-0" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
