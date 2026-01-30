import { useState } from "react";
import { useParams } from "react-router-dom";
import { useReduxDispatch, useReduxSelector } from "../../../hooks/useRedux";
import { getData, toggleWishlist } from "../../../redux/shop-slice";
import { useAxios } from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Heart, Minus, Plus, Loader } from "lucide-react";

const ProductDetails = () => {
  const dispatch = useReduxDispatch();
  const axios = useAxios();
  const [count, setCount] = useState(1);
  const [activeImg, setActiveImg] = useState("");
  const { id } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      if (!id) throw new Error("Product ID is missing");
      return axios({ url: `plant-list/${id}` }).then((res) => res.data.data);
    },
    enabled: !!id,
  });

  const { wishlist } = useReduxSelector((state) => state.shopSlice);
  const isLiked = wishlist?.some((item) => item._id === product?._id);

  if (product && !activeImg) setActiveImg(product.main_image);

  if (isLoading)
    return (
      <div className="py-20 text-center">
        <Loader className="animate-spin inline-block text-[#46A358]" />
      </div>
    );
  if (!product)
    return <div className="py-20 text-center">Mahsulot topilmadi</div>;

  return (
    <div className="w-[90%] m-auto py-10 font-sans">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex gap-4 lg:w-1/2">
          <div className="flex flex-col gap-4">
            {product.images?.map((img: string, idx: number) => (
              <div
                key={idx}
                onClick={() => setActiveImg(img)}
                className={`w-25 h-25 cursor-pointer border-2 rounded-lg p-2 bg-[#FBFBFB] transition-all ${
                  activeImg === img ? "border-[#46A358]" : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  className="w-full h-full object-contain"
                  alt="preview"
                />
              </div>
            ))}
          </div>
          <div className="flex-1 bg-[#FBFBFB] rounded-lg p-10 flex justify-center items-center border border-[#EAEAEA]">
            <img
              src={activeImg || product.main_image}
              className="w-full max-h-100 object-contain"
              alt="main"
            />
          </div>
        </div>

        <div className="lg:w-1/2 text-left">
          <h1 className="text-[30px] font-bold text-[#3D3D3D]">
            {product.title}
          </h1>

          <div className="flex justify-between items-center border-b pb-4 mt-3">
            <span className="text-[#46A358] text-[24px] font-bold">
              ${(product.discount_price || product.price).toFixed(2)}
            </span>
            <div className="flex items-center gap-1 text-[#FFAC0C]">
              <span>★★★★☆</span>
              <span className="text-[#3D3D3D] text-[14px] ml-2 font-medium">
                19 Customer Review
                <div></div>
              </span>
            </div>
          </div>

          <div className="mt-5">
            <h4 className="font-bold text-[#3D3D3D]">Short Description:</h4>
            <p className="text-[#727272] text-[14px] mt-2 leading-7">
              {product.short_description || product.description}
            </p>
          </div>

          <div className="flex items-center gap-6 mt-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => count > 1 && setCount(count - 1)}
                className="w-9 h-9 bg-[#46A358] text-white rounded-full flex items-center justify-center hover:bg-[#3d8b4c] transition-colors"
              >
                <Minus size={18} />
              </button>
              <span className="text-xl font-bold w-6 text-center">{count}</span>
              <button
                onClick={() => setCount(count + 1)}
                className="w-9 h-9 bg-[#46A358] text-white rounded-full flex items-center justify-center hover:bg-[#3d8b4c] transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>

            <button className="bg-[#46A358] text-white px-10 py-3 rounded-md font-bold uppercase text-sm shadow-sm hover:opacity-90 transition-opacity">
              Buy Now
            </button>

            <button
              onClick={() => dispatch(getData({ ...product, counter: count }))}
              className="border border-[#46A358] text-[#46A358] px-8 py-3 rounded-md font-bold uppercase text-sm hover:bg-[#46A358] hover:text-white transition-all"
            >
              Add to Cart
            </button>

            <button
              onClick={() => dispatch(toggleWishlist(product))}
              className={`border border-[#46A358] p-3 rounded-md transition-all ${isLiked ? "bg-[#46A358] text-white" : "text-[#46A358]"}`}
            >
              <Heart size={20} fill={isLiked ? "white" : "none"} />
            </button>
          </div>

          <div className="mt-10 flex flex-col gap-3 text-[15px] border-t pt-6">
            <p>
              <span className="text-[#A5A5A5] font-medium">SKU:</span>{" "}
              <span className="text-[#727272]">{product.sku}</span>
            </p>
            <p>
              <span className="text-[#A5A5A5] font-medium">Categories:</span>{" "}
              <span className="text-[#727272]">
                {product.categories || product.category}
              </span>
            </p>
            d\
            <p>
              <span className="text-[#A5A5A5] font-medium">Tags:</span>{" "}
              <span className="text-[#727272]">{product.tags}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
