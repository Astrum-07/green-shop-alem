import { useState } from "react";
import Cookies from "js-cookie";
import { User, ShoppingBag, MapPin, Heart, Truck, LogOut } from "lucide-react";
import AccountDetails from "./AccountDetails";

import TrackOrder from "./TrackOrder";
import Address from "./address";
import WishlistPage from "./Wishlist";
import Header from "../../components/header";
import Footer from "../../components/footer";




const Profile = () => {
  const [activeTab, setActiveTab] = useState("account");

  const handleLogout = () => {
    Cookies.remove("user", { path: '/' });
    Cookies.remove("access_token", { path: '/' });
    window.location.href = "/";
  };

  const renderContent = () => {
    switch (activeTab) {
      case "account": return <AccountDetails />;
      case "products": return 
      case "track": return <TrackOrder />;
      case "address": return <Address/>
      case "wishlist": return <WishlistPage/>;
      default: return <AccountDetails />;
    }
  };

  return (
    <div className="">
      <Header/>
      <div className="max-w-[90%] mx-auto px-4 py-10 font-sans">
      <div className="flex flex-col md:flex-row gap-10">
        

        <aside className="w-full md:w-[310px] bg-[#FBFBFB] h-fit">
          <nav className="flex flex-col">
            <NavItem 
              id="account" active={activeTab} onClick={setActiveTab} 
              icon={<User size={20} />} text="Account Details" 
            />
            <NavItem 
              id="products" active={activeTab} onClick={setActiveTab} 
              icon={<ShoppingBag size={20} />} text="My Products" 
            />
            <NavItem 
              id="address" active={activeTab} onClick={setActiveTab} 
              icon={<MapPin size={20} />} text="Address" 
            />
            <NavItem 
              id="wishlist" active={activeTab} onClick={setActiveTab} 
              icon={<Heart size={20} />} text="Wishlist" 
            />
            <NavItem 
              id="track" active={activeTab} onClick={setActiveTab} 
              icon={<Truck size={20} />} text="Track Order" 
            />
            
            <div 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-[#FF4D4F] font-bold cursor-pointer mt-4 hover:bg-red-50 border-l-[4px] border-transparent"
            >
              <LogOut size={20} />
              <span className="text-[15px]">Log out</span>
            </div>
          </nav>
        </aside>


        <main className="flex-1 min-h-[500px]">
          {renderContent()}
        </main>
      </div>
    </div>
    <Footer/>
    </div>
  );
};


const NavItem = ({ id, active, onClick, icon, text }: any) => (
  <div 
    onClick={() => onClick(id)}
    className={`flex items-center gap-3 px-4 py-3 border-l-[4px] cursor-pointer transition-all ${
      active === id 
      ? "border-[#46A358] bg-[#EAF4EE] text-[#46A358] font-bold shadow-sm" 
      : "border-transparent text-[#3D3D3D] hover:bg-gray-50"
    }`}
  >
    <div className={active === id ? "text-[#46A358]" : "text-[#3D3D3D]"}>
      {icon}
    </div>
    <span className="text-[15px]">{text}</span>
  </div>
);

export default Profile;