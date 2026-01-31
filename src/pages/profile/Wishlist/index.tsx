import { useReduxSelector } from "../../../hooks/useRedux";
import { Empty, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import Card from "../../../components/dashboard/products/card";

const WishlistPage = () => {
  const { wishlist } = useReduxSelector((state) => state.shopSlice);
  const navigate = useNavigate();

  return (
    <section className="min-h-[70vh] py-12 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center justify-between mb-12 border-b border-gray-50 pb-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-50 p-3 rounded-2xl">
              <Heart className="text-[#46A358] fill-[#46A358]" size={24} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#3D3D3D] tracking-tight">
                My Wishlist
              </h1>
              <p className="text-[#727272] text-sm mt-1 font-medium">Sizga yoqqan gullar to'plami</p>
            </div>
          </div>
          <span className="hidden sm:block bg-[#46A358] text-main px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-green-100">
            {wishlist.length} Mahsulot
          </span>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-14">
            {wishlist.map((product) => (
              <div 
                key={product._id} 
                className="animate-in fade-in slide-in-from-bottom-4 duration-700"
              >
                <Card {...product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-[#fcfcfc] rounded-[40px] border border-gray-100">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div className="text-center mt-4">
                  <h3 className="text-2xl font-bold text-[#3D3D3D] mb-3">
                    Sevimli gullaringiz yo'q
                  </h3>
                  <p className="text-[#727272] max-w-sm mx-auto mb-8 leading-relaxed font-medium">
                    Sizga yoqqan gullarni saqlab qo'ying va ularni istalgan vaqtda shu yerdan toping.
                  </p>
                </div>
              }
            />
            <Button 
              size="large"
              onClick={() => navigate("/")}
              className="bg-[#46A358] hover:!bg-[#3d8e4d] text-main border-none h-14 px-12 rounded-2xl font-bold text-[16px] transition-all active:scale-95 shadow-xl shadow-green-200 flex items-center justify-center"
            >
              Do'konni aylanish
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default WishlistPage;