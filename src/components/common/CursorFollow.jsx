"use client";
import React, { useRef } from "react";
import useMouseTrack from "@/hooks/useMouseTrack";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const quadrants = [
  {
    // Top Left
    vLine: { position: "end", margin: "mb-[0.7rem]" },
    hLine: { position: "start", margin: "mr-[0.7rem]" },
  },
  {
    // Top Right
  },
  {
    // Bottom Left
    vLine: { position: "start", margin: "mt-[0.7rem]" },
  },
  {
    // Bottom Right
    hLine: { position: "end", margin: "ml-[0.7rem]" },
  },
];

const CursorFollow = () => {
  const { x, y } = useMouseTrack();
  const MFD = useRef();

  useGSAP(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const setX = gsap.quickSetter(MFD.current, "x", "px");
    const setY = gsap.quickSetter(MFD.current, "y", "px");

    setX(x - centerX);
    setY(y - centerY);
    
  }, [x, y]);

  return (
    // Top-Screen-Fixed-Container
    <div className="fixed top-0 left-0 w-full h-screen mix-blend-difference overflow-hidden pointer-events-none select-none flex items-center justify-center z-90">
      {/* Mouse-Follow-div */}
      <div
        ref={MFD}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-difference w-[300vw] h-[300vh] grid grid-cols-2 grid-rows-2"
      >
        {quadrants.map((q, i) => (
          <div key={i} className="w-full h-full flex flex-col">
            {/* Vertical Line */}
            {q.vLine && (
              <div
                className={`w-full h-full flex justify-end ${
                  q.vLine.position === "start" ? "items-start" : "items-end"
                }`}
              >
                <div className={`w-[1.5px] h-full bg-white/40 ${q.vLine.margin}`} />
              </div>
            )}
            {/* Horizontal Line */}
            {q.hLine && (
              <div className="w-full h-px flex">
                <div className={`w-full h-[1.5px] bg-white/40 ${q.hLine.margin}`} />
              </div>
            )}
          </div>
        ))}
        {/* Center Div */}
        <div className="absolute z-20 w-6 flex justify-center items-center h-6 border border-white/50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" >
        <div className="w-1 h-1 rounded-full bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default CursorFollow;
