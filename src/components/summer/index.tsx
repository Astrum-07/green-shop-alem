import type { FC } from "react"; 
import { ArrowRight } from "lucide-react";
import type { BannerData } from "../../@types";




const SummerSection: FC = () => {
  const banners: BannerData[] = [
    {
      id: 1,
      title: "Summer Cactus",
      subtitle: "& Succulents",
      desc: "We are an online plant shop offering a wide range of cheap and trendy plants",
      img: "https://green-shop-otabek.vercel.app/assets/1-Bhbx3ro7.png",
    },
    {
      id: 2,
      title: "Styling Trends",
      subtitle: "& Much More",
      desc: "We are an online plant shop offering a wide range of cheap and trendy plants",
      img: "https://green-shop-otabek.vercel.app/assets/2-6x9mMEaU.png",
    },
  ];

  return (
    <section className="w-full py-12 bg-white overflow-hidden">
      <div className="max-w-full mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {banners.map((item) => (
            <div
              key={item.id}
              className="relative bg-[#FBFBFB] rounded-sm flex items-center justify-between min-h-[200px] sm:min-h-[280px] px-3 sm:px-8 py-6 group overflow-hidden"
            >

              <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 border-[1px] border-[#46A358]/20 rounded-full"></div>
                <div className="absolute -bottom-5 -left-16 w-32 h-32 sm:w-40 sm:h-40 border-[1px] border-[#46A358]/10 rounded-full"></div>
              </div>


              <div className="relative z-10 w-[35%] sm:w-[45%] flex justify-center shrink-0">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full max-h-[150px] sm:max-h-[240px] object-contain transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>


              <div className="relative z-10 w-[60%] sm:w-[50%] flex flex-col items-end text-right">
                <div className="mb-2 sm:mb-4">
                  <h3 className="text-[#3D3D3D] font-black text-[14px] sm:text-lg md:text-xl uppercase leading-tight">
                    {item.title}
                  </h3>
                  <h3 className="text-[#3D3D3D] font-black text-[14px] sm:text-lg md:text-xl uppercase leading-tight">
                    {item.subtitle}
                  </h3>
                </div>
                
                <p className="text-[#727272] text-[10px] sm:text-xs md:text-sm leading-relaxed mb-4 sm:mb-6 max-w-[160px] sm:max-w-[240px]">
                  {item.desc}
                </p>

                <button className="bg-[#46A358] text-white flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-md text-[10px] sm:text-sm font-bold hover:bg-[#3d8b4c] transition-all shadow-sm active:scale-95 shrink-0">
                  Find More
                  <ArrowRight size={14} className="hidden xs:block sm:w-[16px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SummerSection;