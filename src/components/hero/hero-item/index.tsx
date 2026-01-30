import type { FC } from "react";
import type { HeroMockType } from "../../../@types";

const HeroItem: FC<HeroMockType> = (props) => {
  const titleArray = props.title.split(" ");
  const lastWord = titleArray.pop();
  const firstPart = titleArray.join(" ");

  return (
    <div className="flex flex-col md:flex-row px-5 sm:px-10 md:px-20 items-center min-h-112.5 md:h-112.5 py-10 md:py-0 bg-[#F5F5F5] relative overflow-hidden">
      

      <div className="flex-[1.5] z-10 text-center md:text-left">
        <p className="text-[#3D3D3D] text-[12px] sm:text-[14px] font-medium tracking-widest uppercase mb-2">
          {props.subTitle}
        </p>
        
        <h2 className="font-black text-[#3D3D3D] text-[28px] min-[400px]:text-[40px] sm:text-[50px] md:text-[60px] lg:text-[70px] leading-[1.1] uppercase mb-4">
          {firstPart} <span className="text-[#46A358]">{lastWord}</span>
        </h2>
        
        <p className="w-full md:w-3/4 text-[#727272] text-[13px] sm:text-[14px] leading-6 mb-8 mx-auto md:mx-0">
          {props.description}
        </p>
        
        <button className="bg-[#46A358] text-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg font-bold uppercase hover:bg-[#3d8b4a] transition-all text-[14px]">
          {props.buttonText}
        </button>
      </div>


      <div className="flex-1 flex items-center justify-center relative mt-10 md:mt-0 w-full">

        <img
          className="absolute bottom-0 left-0 w-20 sm:w-37.5 opacity-40 blur-[1px] z-0"
          src={props.small_img_url}
          alt="decoration"
        />
        

        <img 
          className="w-50 min-[400px]:w-62.5 sm:w-87.5 md:w-full h-auto object-contain z-10" 
          src={props.big_img_url} 
          alt="main_plant" 
        />
      </div>
    </div>
  );
};

export default HeroItem;