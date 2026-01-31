import React from "react";
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import { setAuthorizationModalVisiblty } from "../../redux/modal-store"; // Importni tekshiring
import { Sparkles, PenTool, Image as ImageIcon, Mic } from "lucide-react";

const blogheaderhi2KeX2m = "https://green-shop-otabek.vercel.app/assets/blog-header-hi2KeX2m.png";

const Blogtop: React.FC = () => {
  const dispatch = useReduxDispatch();
  const user = useReduxSelector((state: any) => state.userSlice.user);

  const openAuthModal = () => {
    dispatch(setAuthorizationModalVisiblty());
  };

  if (user) return null;

  return (
    <section className="relative w-full py-12 md:py-20 overflow-hidden bg-[#fcfcfc]">

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-50 rounded-full blur-3xl -z-10 opacity-50 translate-x-1/2 -translate-y-1/2"></div>

      <div className="w-[90%] max-w-[90%] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          

          <div className="flex-1 text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-[#46a358] text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles size={14} />
              <span>Creator Economy</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6">
              Monetize your <span className="text-[#46a358]">Content</span> <br />
              with GreenShop
            </h1>

            <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              Gullaringiz va ijodingiz bilan pul ishlang. Maqola, video, audio yoki suratlar — hammasini GreenShop bilan monetizatsiya qiling.
            </p>

            {/* Qisqa feature list */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-2 text-gray-600 font-medium italic">
                <PenTool size={18} className="text-[#46a358]" /> <span>Articles</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 font-medium italic">
                <ImageIcon size={18} className="text-[#46a358]" /> <span>Photos</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 font-medium italic">
                <Mic size={18} className="text-[#46a358]" /> <span>Podcasts</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 font-medium italic">
                <Sparkles size={18} className="text-[#46a358]" /> <span>Monetize</span>
              </div>
            </div>

            <button
              onClick={openAuthModal}
              className="group relative bg-[#46a358] hover:bg-[#3d8f4d] text-white font-black py-4 px-10 rounded-2xl transition-all duration-300 shadow-xl shadow-green-200 active:scale-95 flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">Join GreenShop Now</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* O'NG TOMON: RASM (Mockup style) */}
          <div className="flex-1 order-1 lg:order-2 relative">
            <div className="relative z-10 rounded-[32px] overflow-hidden shadow-2xl border-4 border-white transform lg:rotate-2 hover:rotate-0 transition-transform duration-700">
              <img
                src={blogheaderhi2KeX2m}
                alt="GreenShop Banner"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Rasm ostidagi dekoratsiya */}
            <div className="absolute -bottom-6 -left-6 w-full h-full bg-[#46a358]/10 rounded-[32px] -z-10 transform lg:-rotate-2"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Qo'shimcha ikonka
const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default Blogtop;