import React from "react";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  MapPin, 
  Mail, 
  PhoneCall 
} from "lucide-react";

const GardenCareImg = "https://7-oy-6-dars-vp28.vercel.app/assets/1-Ctm6W3Jq-Ctm6W3Jq.png";
const PlantRenovationImg = "https://7-oy-6-dars-vp28.vercel.app/assets/2-BF1Oo3xK-BF1Oo3xK.png";
const WateringGardenImg = "https://7-oy-6-dars-vp28.vercel.app/assets/3-Bi-spicH-Bi-spicH.png";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#FBFBFB] pt-12 font-sans overflow-hidden">
      <div className="max-w-[90%] mx-auto px-4">
        
        {/* 1. TOP SECTION: Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-gray-100 lg:border-none">
          {[
            { img: GardenCareImg, title: "Garden Care" },
            { img: PlantRenovationImg, title: "Plant Renovation" },
            { img: WateringGardenImg, title: "Watering Garden" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col pr-0 lg:pr-6 lg:border-r border-[#46A358]/20 last:border-r-0">
              <div className="relative w-20 h-20 mb-4 mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-[#46A358]/10 rounded-full"></div>
                <img src={item.img} alt={item.title} className="relative z-10 w-full h-full object-contain" />
              </div>
              <h4 className="text-[#3D3D3D] font-bold text-lg mb-2 text-center lg:text-left">{item.title}</h4>
              <p className="text-[#727272] text-sm leading-6 text-center lg:text-left">
                We are an online plant shop offering a wide range of cheap and trendy plants.
              </p>
            </div>
          ))}

          {/* Newsletter - 280px uchun moslangan */}
          <div className="flex flex-col w-full">
            <h4 className="text-[#3D3D3D] font-bold text-lg mb-4 text-center lg:text-left">Join newsletters</h4>
            <div className="flex h-10 mb-4 w-full shadow-sm rounded-md overflow-hidden">
              <input 
                type="email" 
                placeholder="email..." 
                className="w-full min-w-0 px-3 text-sm border-none focus:outline-none bg-white"
              />
              <button className="bg-[#46A358] text-white px-4 font-bold text-sm hover:bg-[#3d8b4c] transition-colors shrink-0">
                Join
              </button>
            </div>
            <p className="text-[#727272] text-xs leading-5 text-center lg:text-left">
              We usually post offers and challenges in newsletter.
            </p>
          </div>
        </div>

        {/* 2. MIDDLE SECTION: Contact Bar - 280px Fix */}
        <div className="bg-[#46A358]/10 px-4 py-8 flex flex-col items-center lg:flex-row lg:justify-between gap-8 my-10 rounded-sm">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
             <div className="w-8 h-8 bg-[#46A358] rounded-full flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rounded-full"></div>
             </div>
             <span className="text-[#46A358] font-black text-xl tracking-tighter italic uppercase">GreenShop</span>
          </div>

          {/* Contact Details - Stacked on mobile */}
          <div className="flex flex-col gap-6 w-full lg:flex-row lg:w-auto lg:gap-8">
            <div className="flex items-start lg:items-center gap-3 text-[#3D3D3D] text-sm group">
              <MapPin size={20} className="text-[#46A358] shrink-0" />
              <span className="leading-tight">70 West Buckingham Ave. Farmingdale, NY 11735</span>
            </div>
            <div className="flex items-center gap-3 text-[#3D3D3D] text-sm">
              <Mail size={18} className="text-[#46A358] shrink-0" />
              <span className="break-all">contact@greenshop.com</span>
            </div>
            <div className="flex items-center gap-3 text-[#3D3D3D] text-sm">
              <PhoneCall size={18} className="text-[#46A358] shrink-0" />
              <span>+88 01911 717 490</span>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM SECTION: Links, Social & Payments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-10 border-b border-[#46A358]/10">
          {/* Link Ustunlari */}
          {[
            { title: "My Account", links: ["My Account", "Our stores", "Contact us"] },
            { title: "Help & Guide", links: ["Help Center", "How to Buy", "Shipping"] },
            { title: "Categories", links: ["House Plants", "Potter Plants", "Seeds"] },
          ].map((col, i) => (
            <div key={i} className="text-center sm:text-left">
              <h4 className="text-[#3D3D3D] font-bold text-lg mb-4">{col.title}</h4>
              <ul className="flex flex-col gap-3 text-[#3D3D3D] text-sm">
                {col.links.map(link => <li key={link} className="hover:text-[#46A358] cursor-pointer">{link}</li>)}
              </ul>
            </div>
          ))}

          {/* SOCIAL & PAYMENTS - BUG FIX 280px */}
          <div className="flex flex-col items-center sm:items-start w-full overflow-hidden">
            <h4 className="text-[#3D3D3D] font-bold text-lg mb-4 text-center sm:text-left">Social Media</h4>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-8">
              {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, idx) => (
                <div key={idx} className="w-8 h-8 border border-[#46A358]/20 rounded-md flex items-center justify-center text-[#46A358] hover:bg-[#46A358] hover:text-white cursor-pointer transition-all">
                  <Icon size={16} />
                </div>
              ))}
            </div>
            
            <h4 className="text-[#3D3D3D] font-bold text-lg mb-4 text-center sm:text-left">We accept</h4>
            {/* TO'LOV TIZIMLARI FIX: flex-wrap va gap qo'shildi */}
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 w-full">
               <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-3 sm:h-4 max-w-[50px] object-contain" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 sm:h-6 max-w-[40px] object-contain" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 sm:h-4 max-w-[50px] object-contain" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-3 sm:h-4 max-w-[50px] object-contain" />
            </div>
          </div>
        </div>

        {/* 4. COPYRIGHT */}
        <div className="py-6 text-center text-[#3D3D3D] text-xs sm:text-sm">
          © {new Date().getFullYear()} GreenShop. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;