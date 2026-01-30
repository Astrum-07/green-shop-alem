import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import {
  HeartOutlined,
  HeartFilled,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  MailOutlined,
  StarFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import { getData, toggleWishlist } from "../../redux/shop-slice";
import Header from "../../components/header";
import Footer from "../../components/footer";

const ProductDetail = () => {
  const { state: product } = useLocation();
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();
  const { wishlist } = useReduxSelector((state) => state.shopSlice);

  // 1. Hooklar tartibi (Boshlang'ich qiymat to'g'ridan-to'g'ri beriladi)
  const [count, setCount] = useState(1);
  const [activeSize, setActiveSize] = useState("S");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImg, setSelectedImg] = useState({
    src: product?.main_image || "",
    class: "",
  });

  // Agar product yo'q bo'lsa (masalan, sahifa refresh bo'lganda)
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <button
            onClick={() => navigate("/")}
            className="text-[#46A358] font-bold border border-[#46A358] px-6 py-2 rounded-md hover:bg-[#46A358] hover:text-white transition-all"
          >
            Mahsulot topilmadi. Bosh sahifaga qaytish
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const isWishlisted = wishlist.some((item) => item._id === product._id);

  // Aylantirilgan rasm variantlari
  const imageAngles = [
    { src: product.main_image, class: "" },
    { src: product.main_image, class: "scale-x-[-1]" },
    { src: product.main_image, class: "rotate-12" },
    { src: product.main_image, class: "rotate-[-12deg] scale-x-[-1]" },
  ];

  return (
    // key={product._id} berish orqali useEffect-siz state-larni reset qilamiz
    <div key={product._id} className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-[1200px] w-[95%] mx-auto px-4 py-8 font-sans">
        {/* Breadcrumb */}
        <nav className="text-sm mb-10 text-[#3D3D3D]">
          <span className="font-bold cursor-pointer hover:text-[#46A358]" onClick={() => navigate("/")}>Home</span>
          <span className="mx-2">/</span>
          <span className="cursor-pointer hover:text-[#46A358]" onClick={() => navigate("/shop")}>Shop</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* CHAP TARAF: GALEREYA */}
          <div className="flex flex-col-reverse md:flex-row gap-4 lg:w-[50%]">
            {/* Thumbnails */}
            <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-visible">
              {imageAngles.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImg(img)}
                  className={`w-16 h-16 md:w-24 md:h-24 bg-[#FBFBFB] border p-2 cursor-pointer transition-all rounded-sm shrink-0 flex items-center justify-center ${
                    selectedImg.class === img.class ? "border-[#46A358]" : "border-transparent"
                  }`}
                >
                  <img src={img.src} alt="" className={`w-full h-full object-contain ${img.class}`} />
                </div>
              ))}
            </div>

            {/* Asosiy rasm */}
            <PhotoProvider>
              <div className="flex-1 bg-[#FBFBFB] relative h-[350px] md:h-[450px] flex items-center justify-center p-4 group overflow-hidden border border-gray-50">
                <PhotoView src={selectedImg.src}>
                  <div className="relative cursor-zoom-in">
                    <img
                      src={selectedImg.src}
                      alt={product.title}
                      className={`max-h-[320px] md:max-h-[400px] object-contain transition-transform duration-500 ${selectedImg.class}`}
                    />
                    <div className="absolute top-0 right-0 bg-[#46A358] p-2 rounded-full shadow-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <SearchOutlined className="text-xl" />
                    </div>
                  </div>
                </PhotoView>
              </div>
            </PhotoProvider>
          </div>

          {/* O'NG TARAF: MA'LUMOTLAR */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-[#3D3D3D] mb-2">{product.title}</h1>
            
            <div className="flex justify-between items-center border-b pb-3 mb-5">
              <span className="text-[#46A358] text-2xl font-bold">${product.price}.00</span>
              <div className="flex items-center gap-1">
                <div className="flex text-[#FFAC0C] text-sm">
                  {[1, 2, 3, 4].map((s) => <StarFilled key={s} />)}
                  <StarFilled className="text-[#C4C4C4]" />
                </div>
                <span className="text-xs md:text-sm ml-2 text-[#3D3D3D] font-medium">19 Customer Review</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-[#3D3D3D] mb-2 text-sm uppercase">Short Description:</h4>
              <p className="text-[#727272] text-sm leading-6">
                The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. 
                Perfect for adding a touch of greenery to your workspace or home decor.
              </p>
            </div>

            {/* Size selection */}
            <div className="mb-8">
              <h4 className="font-bold text-[#3D3D3D] mb-3 text-sm">Size:</h4>
              <div className="flex gap-3">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setActiveSize(size)}
                    className={`w-9 h-9 rounded-full border text-sm flex items-center justify-center transition-all ${
                      activeSize === size ? "border-[#46A358] text-[#46A358] font-bold shadow-sm" : "border-[#EAEAEA] text-[#727272]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Soni va Buttonlar */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <div className="flex items-center gap-4 border rounded-full px-2 py-1">
                <button
                  onClick={() => setCount(Math.max(1, count - 1))}
                  className="w-8 h-8 rounded-full bg-[#46A358] text-white text-xl flex items-center justify-center hover:opacity-90"
                >-</button>
                <span className="text-lg font-bold w-4 text-center">{count}</span>
                <button
                  onClick={() => setCount(count + 1)}
                  className="w-8 h-8 rounded-full bg-[#46A358] text-white text-xl flex items-center justify-center hover:opacity-90"
                >+</button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button className="bg-[#46A358] text-white px-6 md:px-8 h-10 rounded-md font-bold text-sm uppercase hover:shadow-lg transition-all active:scale-95">
                  Buy Now
                </button>
                <button
                  onClick={() => dispatch(getData({ ...product, counter: count, userPrice: product.price * count }))}
                  className="border border-[#46A358] text-[#46A358] px-4 md:px-6 h-10 rounded-md font-bold text-sm uppercase hover:bg-[#46A358] hover:text-white transition-all active:scale-95"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => dispatch(toggleWishlist(product))}
                  className={`border border-[#46A358] w-10 h-10 flex items-center justify-center rounded-md transition-all ${
                    isWishlisted ? "bg-[#46A358] text-white" : "text-[#46A358] hover:bg-[#46A358] hover:text-white"
                  }`}
                >
                  {isWishlisted ? <HeartFilled className="text-xl" /> : <HeartOutlined className="text-xl" />}
                </button>
              </div>
            </div>

            {/* SKU, Category, Tags */}
            <div className="text-[14px] space-y-3 border-t pt-5">
              <p><span className="text-[#A5A5A5]">SKU:</span> <span className="text-[#727272] ml-2">{product._id}</span></p>
              <p><span className="text-[#A5A5A5]">Categories:</span> <span className="text-[#727272] ml-2 font-medium">Potter Plants</span></p>
              <p><span className="text-[#A5A5A5]">Tags:</span> <span className="text-[#727272] ml-2 font-medium">Home, Garden, Plants</span></p>
              <div className="flex items-center gap-4 pt-2">
                <span className="font-bold text-[#3D3D3D]">Share:</span>
                <FacebookOutlined className="cursor-pointer hover:text-[#46A358] text-lg" />
                <TwitterOutlined className="cursor-pointer hover:text-[#46A358] text-lg" />
                <LinkedinOutlined className="cursor-pointer hover:text-[#46A358] text-lg" />
                <MailOutlined className="cursor-pointer hover:text-[#46A358] text-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-16 md:mt-20">
          <div className="flex gap-6 md:gap-8 border-b">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-3 text-sm font-bold transition-all ${activeTab === "description" ? "text-[#46A358] border-b-2 border-[#46A358]" : "text-[#3D3D3D]"}`}
            >Product Description</button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 text-sm font-bold transition-all ${activeTab === "reviews" ? "text-[#46A358] border-b-2 border-[#46A358]" : "text-[#3D3D3D]"}`}
            >Reviews (19)</button>
          </div>
          <div className="py-7 text-[#727272] text-[14px] leading-7">
            {activeTab === "description" ? (
              <div className="space-y-6 animate-in fade-in duration-500">
                <p>The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <h4 className="font-bold text-[#3D3D3D]">Living Room:</h4>
                <p>Perfect for adding natural vibes to your living space. Requires minimal maintenance.</p>
              </div>
            ) : (
              <div className="text-center py-10 border border-dashed rounded-lg">
                Hozircha ushbu mahsulotga izohlar mavjud emas.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;