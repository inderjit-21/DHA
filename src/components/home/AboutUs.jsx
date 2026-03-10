import React from "react";

const AboutUs = () => {
  return (
    <div className="w-full h-fit px-10 max-sm:px-5 pb-10 flex BG_GRAY">
      <div className=" w-1/2 max-sm:w-full  ml-auto capitalize  py-5 flex flex-col gap-5">
        {/* Title */}
        <p className=" capitalize text-[1rem] FontBold leading-6">(About Us)</p>
        {/* Detail */}
        <p className="text-[1.8rem] max-sm:text-[1.4rem] max-sm:leading-[1.4rem]  leading-[1.8rem] text-[#202020b1] FontRegular">
          We are a design-driven architecture studio committed to creating
          functional, sustainable, and timeless spaces. With a strong focus on
          precision and quality, we transform ideas into thoughtfully crafted
          environments.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
