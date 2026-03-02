"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppContext } from "@/components/common/AppContext";

gsap.registerPlugin(ScrollTrigger);

const Data = [
  {
    url: `/imgs/projects/img1.webp`,
    number: `01`,
    title: `Semple Text 1`,
    desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. printing and typesetting industry. `,
  },
  {
    url: `/imgs/projects/img2.webp`,
    number: `02`,
    title: `Semple Text 2`,
    desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. `,
  },
  {
    url: `/imgs/projects/img3.webp`,
    number: `03`,
    title: `Semple Text 3`,
    desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. printing and typesetting `,
  },
  {
    url: `/imgs/projects/img4.webp`,
    number: `04`,
    title: `Semple Text 4`,
    desc: `Lorem Ipsum is simply dummy text of the printing. `,
  },
  {
    url: `/imgs/projects/img5.webp`,
    number: `05`,
    title: `Semple Text 5`,
    desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. `,
  },
  {
    url: `/imgs/projects/img6.webp`,
    number: `06`,
    title: `Semple Text 6`,
    desc: `Lorem Ipsum is simply dummy text of the printing and  industry. `,
  },
  {
    url: `/imgs/projects/img1.webp`,
    number: `01`,
    title: `Semple Text 1`,
    desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. typesetting industry. printing and typesetting `,
  },
  {
    url: `/imgs/projects/img2.webp`,
    number: `02`,
    title: `Semple Text 2`,
    desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. `,
  },
  {
    url: `/imgs/projects/img3.webp`,
    number: `03`,
    title: `Semple Text 3`,
    desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry printing and typesetting `,
  },
  {
    url: `/imgs/projects/img4.webp`,
    number: `04`,
    title: `Semple Text 4`,
    desc: `Lorem Ipsum is simply dummy text of the printing. `,
  },
  {
    url: `/imgs/projects/img5.webp`,
    number: `05`,
    title: `Semple Text 5`,
    desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry printing and typesetting. `,
  },
  {
    url: `/imgs/projects/img6.webp`,
    number: `06`,
    title: `Semple Text 6`,
    desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. `,
  },
];

/* -------------------- IMAGE LOAD HELPER -------------------- */

const waitForImages = (container) => {
  const imgs = container.querySelectorAll("img");
  return Promise.all(
    [...imgs].map(
      (img) =>
        img.complete ||
        new Promise((resolve) => {
          img.onload = img.onerror = resolve;
        })
    )
  );
};


const ProjectStructure = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const images = useAppContext();

  const [expandedIndex, setExpandedIndex] = useState(null);
  const getWords = (text) => text.trim().split(/\s+/);


  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    let ctx;

    const init = async () => {
      // ✅ wait until images load (CRITICAL)
      await waitForImages(track);

      ctx = gsap.context(() => {
        const getScrollAmount = () =>
          track.scrollWidth - window.innerWidth;

        gsap.set(track, { x: 0 });

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        .to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
        }, 0)
        .to(
          ".ProjectGalleryHilight",
          { width: "100%", ease: "none" },
          0
        );
      }, section);

      ScrollTrigger.refresh();
    };

    init();

    return () => ctx && ctx.revert();
  }, []);


  return (
    <>
      {/* FOR DESKTOP */}
      <div
        ref={sectionRef}
        className="relative w-full overflow-hidden ProjectGalleryMainCont"
      >
        <div className="w-full h-screen sticky top-0  flex flex-col items-center left-0 overflow-hidden">
          {/* Top-Container */}
          <div className=" w-full h-full flex justify-between items-center px-10 py-10">
            <div className="w-fit h-fit flex gap-5 mt-5">
              <p className="text-[5vw] leading-[5vw] max-sm:text-[10vw] max-sm:leading-[10vw] tracking-tighter text-[#53462e]">
                Project Gallery
              </p>
            </div>

            <span className="text-[#53462ea7] mt-auto">(2k26)</span>
          </div>

          {/* Horizontal scroll */}
          <div
            ref={trackRef}
            className="min-w-max h-fit flex gap-5  ml-auto  px-10  "
          >
            {Data.map((item, index) => {
              const aspectClass =
                index % 2 === 0 ? "aspect-[2/2]" : "aspect-[2/1.5]";

              const words = getWords(item.desc);
              const isLong = words.length > 10;
              const isExpanded = expandedIndex === index;

              const visibleText = isExpanded
                ? item.desc
                : words.slice(0, 10).join(" ");

              return (
                <div
                  key={index}
                  className={`w-[25vw] max-sm:w-[70vw] shrink-0 cursor-pointer `}
                  onMouseEnter={() => {
                    images.current[index].__hovered = true;
                  }}
                  onMouseLeave={() => {
                    images.current[index].__hovered = false;
                  }}
                >
                  <div className={` ${aspectClass} overflow-hidden`}>
                    <img
                      ref={(el) => {
                        if (el && !images.current.includes(el)) {
                          images.current.push(el);
                        }
                      }}
                      src={item.url}
                      alt="imgs"
                      className="w-full IMG_WEBGL opacity-0 h-full object-cover object-center"
                    />
                  </div>
                  <div className="w-full h-fit mt-2 select-none ">
                    {/* Title & Number */}
                    <div className="w-full flex justify-between items-center">
                      <p className="text-[#53462e]">{item.title}</p>
                      <p className="text-[#53462e]">{item.number}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* bottom-Container */}
          <div className=" w-full h-full flex absolute bottom-0 left-0">
            {/* Left */}
            <div className="w-1/2 h-full flex  justify-start items-center px-10">
              <p className="text-[#53462e]">(Scroll)</p>
            </div>
            {/* Right */}
            <div className="w-1/2 h-full flex justify-end items-center px-10">
              <div className="w-1/2 h-[4px] bg-[#d8d8d8] rounded-full overflow-hidden">
                {/* Project-Gallery-Hilight */}
                <div className="w-[0%] h-full bg-[#53462e]  ProjectGalleryHilight "></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectStructure;
