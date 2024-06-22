import React from "react";

const Header = () => {
  return (
    <div className=" fixed">
      <div className="flex flex-row justify-start text-[30px] leading-[48px] font-['Roboto'] font-bold">
        <div className="w-[1440px] px-4 py-1">
          <a href="/">
            <span className="text-[#49deff]">청춘</span>
            <span className="text-[#000]"> </span>
            <span className="text-[#f00]">M</span>
            <span className="text-[#0500ff]">B</span>
            <span className="text-[#00bf13]">T</span>
            <span className="text-[#8f00ff]">I</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
