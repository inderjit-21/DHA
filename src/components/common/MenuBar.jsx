"use client";
import React, { useState } from "react";
import { FiCornerRightUp } from "react-icons/fi";
import gsap from "gsap";
import { MdArrowOutward } from "react-icons/md";
import { useRouter } from "next/navigation" 

const MenuBar = () => {
  const [isMenuopen, SetIsMenuOpen] = useState(false);
  const router = useRouter()

  const MenuChangeStatusOpenClose = () => {
    if (isMenuopen == true) {
      // Close-Menu-Time-Line
      const CMTL = gsap.timeline();
      CMTL.to(
        ".MenuMainCont",
        {
          top: "100%",
        },
        "C1",
      );
      CMTL.to(
        ".MenuSymbolOpenClose",
        {
          rotateZ: 0,
        },
        "C1",
      );
      CMTL.to(
        ".MenuBlurPage",
        {
          pointerEvents: "none",
        },
        "C1",
      );
      SetIsMenuOpen(false);
    } else {
      // Open-Menu-Time-Line
      const OMTL = gsap.timeline();
      OMTL.to(
        ".MenuMainCont",
        {
          top: "50%",
        },
        "O1",
      );
      OMTL.to(
        ".MenuSymbolOpenClose",
        {
          rotateZ: 180,
        },
        "O1",
      );
      OMTL.to(
        ".MenuBlurPage",
        {
          pointerEvents: "auto",
        },
        "O1",
      );
      SetIsMenuOpen(true);
    }
  };

  const menuData = [
    {
      name: "Home",
      link: `/`,
    },
    {
      name: "About",
      link: `/`,
    },
    {
      name: "Projects",
      link: `/projects`,
    },
    {
      name: "Career",
      link: `/`,
    },
    {
      name: "Contact",
      link: `/`,
    },
  ];

  const MenuClickWork = (item) => {
    MenuChangeStatusOpenClose()
    router.push(item)
  }

  return (
    <>
      {/* Background-Blur */}
      <div
        onClick={MenuChangeStatusOpenClose}
        className={`w-full MenuBlurPage h-screen fixed top-0 left-0 z-88 pointer-events-none transition-all duration-600 ease-out ${isMenuopen == true ? "bg-black/20 backdrop-blur-[4px]" : "bg-white/0 backdrop-blur-[0px]"}  `}
      ></div>

      {/* Background-Menu */}
      <div className="MenuMainCont w-full h-[50vh] px-5 bg-black fixed top-full left-0 z-89 flex flex-col gap-2 justify-start items-start ">
        <div className="w-full h-full relative">
          {/* MenuHighLight */}
          <div
            onClick={MenuChangeStatusOpenClose}
            className="w-fit group transition-all duration-600 ease-out  select-none px-6 absolute flex items-center gap-2 -top-11.25 left-1/2 -translate-x-1/2 py-2.5 rounded-tl-[15px] rounded-tr-[15px] bg-black text-white text-[1.1rem]"
          >
            MENU{" "}
            <FiCornerRightUp className="MenuSymbolOpenClose group-hover:rotate-90" />
          </div>
        </div>
        {/* Menu Data */}
        <div className="w-full h-full absolute top-0 left-0  flex flex-col px-5 py-10">
          {
            menuData.map((item,index)=>{
              return(
                <div key={index} className={`w-full  py-2 px-5 relative overflow-hidden group`}>
                  <p onClick={()=> MenuClickWork(item.link)} className="text-[5.5vh] leading-[5.5vh] z-50 text-white mix-blend-difference flex gap-2 FontMedium ">
                    {item.name} <span className="text-[2.5vh] leading-[2.5vh] opacity-0  transition-all duration-200 ease-in group-hover:opacity-100"><MdArrowOutward /></span>
                  </p>

                  {/* Background-Fill-Up */}
                  <div className="w-full h-full absolute top-full left-0 z-[-1] transition-all duration-200 ease-in group-hover:top-0 bg-[#f5f5f5]"></div>
                  
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  );
};

export default MenuBar;
