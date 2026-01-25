import type { FC } from "react";
import type { HeroMockType } from "../../../@types";



const HeroItem: FC<HeroMockType> = (props) => {

  const titleArray = props.title.split(" ");
  const lastWord = titleArray.pop();
  const firstPart = titleArray.join(" "); 

  return (
    <div className="flex px-10 md:px-20 items-center h-112.5 max-md:h-auto max-md:py-10 bg-[#F5F5F5] relative overflow-hidden">

      <div className="flex-[1.5] z-10">
        <p className="text-[#3D3D3D] text-[14px] font-medium tracking-widest uppercase mb-2">
          {props.subTitle}
        </p>
        
        <h2 className="font-black text-[#3D3D3D] text-[70px] leading-17.5 uppercase mb-4">
          {firstPart} <span className="text-[#46A358]">{lastWord}</span>
        </h2>
        
        <p className="w-full md:w-3/4 text-[#727272] text-[14px] leading-6 mb-8">
          {props.description}
        </p>
        
        <button className="bg-[#46A358] text-white px-8 py-3 rounded-lg font-bold uppercase hover:bg-[#3d8b4a] transition-all">
          {props.buttonText}
        </button>
      </div>


      <div className="flex-1 flex items-center justify-center relative">

        <img
          className="absolute bottom-10 left-10 w-37.5 opacity-50 blur-[2px] z-0"
          src={props.small_img_url}
          alt="decoration"
        />
        

        <img 
          className="w-full h-auto object-contain z-10" 
          src={props.big_img_url} 
          alt="main_plant" 
        />
      </div>
    </div>
  );
};

export default HeroItem;