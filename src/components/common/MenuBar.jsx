"use client";
import React, { useState } from "react";
import { FiCornerRightUp } from "react-icons/fi";
import gsap from "gsap";

const MenuBar = () => {
  const [isMenuopen, SetIsMenuOpen] = useState(false);

  const MenuChangeStatusOpenClose = () =>{
    if(isMenuopen == true){
      // Close-Menu-Time-Line
      const CMTL = gsap.timeline()
      CMTL.to('.MenuMainCont',{
        top:'100%'
      },'C1')
      CMTL.to('.MenuSymbolOpenClose',{
        rotateZ:0
      },'C1')
      CMTL.to('.MenuBlurPage',{
        pointerEvents:'none'
      },'C1')
      SetIsMenuOpen(false)
    }
    else{
      // Open-Menu-Time-Line
      const OMTL = gsap.timeline()
      OMTL.to('.MenuMainCont',{
        top:'50%'
      },'O1')
      OMTL.to('.MenuSymbolOpenClose',{
        rotateZ:180
      },'O1')
      OMTL.to('.MenuBlurPage',{
        pointerEvents:'auto'
      },'O1')
      SetIsMenuOpen(true)
    }
  }

  return (
    <>
      {/* Background-Blur */}
      <div onClick={MenuChangeStatusOpenClose} className={`w-full MenuBlurPage h-screen fixed top-0 left-0 z-88 pointer-events-none transition-all duration-600 ease-out ${isMenuopen == true?('bg-black/20 backdrop-blur-[4px]'):('bg-white/0 backdrop-blur-[0px]')}  `}></div>

      {/* Background-Menu */}
      <div className="MenuMainCont w-full h-[50vh] bg-black fixed top-full left-0 z-89">
        <div className="w-full h-full relative"> 
          {/* MenuHighLight */}
          <div onClick={MenuChangeStatusOpenClose} className="w-fit group transition-all duration-600 ease-out  select-none px-6 absolute flex items-center gap-2 -top-11.25 left-1/2 -translate-x-1/2 py-2.5 rounded-tl-[15px] rounded-tr-[15px] bg-black text-white text-[1.1rem]">
            MENU <FiCornerRightUp className="MenuSymbolOpenClose group-hover:rotate-90" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
