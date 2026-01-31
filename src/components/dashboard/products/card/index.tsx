import type { FC } from "react";
import {
  HeartFilled,
  HeartOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import type { ProductType } from "../../../../@types";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import { getData, toggleWishlist } from "../../../../redux/shop-slice";
import { useNavigate } from "react-router-dom";

const Card: FC<ProductType> = (props) => {
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();
  
  const { wishlist } = useReduxSelector((state) => state.shopSlice);
  const isWishlisted = wishlist.some((item) => item._id === props._id);

  const icon_style =
    "bg-white w-[35px] h-[35px] flex rounded-lg justify-center items-center cursor-pointer text-[20px] hover:text-[#46A358] transition-all shadow-md active:scale-90";

  const goToDetail = () => {
    navigate(`/shop/${props._id}`, { state: props });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleWishlist({ ...props, count: 1, userPrice: props.price }));
    if (!isWishlisted) message.success("Wishlistga qo'shildi");
    else message.info("Wishlistdan olindi");
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(getData({ ...props, counter: 1, userPrice: props.price }));
    message.success("Savatchaga qo'shildi");
  };

  return (
    <div className="relative w-full group">
      <div className="h-80 bg-[#f5f5f5] flex justify-center items-center relative overflow-hidden rounded-lg">
        <img
          onClick={goToDetail}
          src={props.main_image}
          alt={props.title}
          className="w-full h-full object-contain cursor-pointer transition-transform duration-500 md:group-hover:scale-105"
        />


        <div className="absolute bottom-5 left-0 right-0 flex gap-3 justify-center items-center z-10 
          opacity-100 translate-y-0 
          md:opacity-0 md:group-hover:opacity-100 
          md:translate-y-4 md:group-hover:translate-y-0 
          transition-all duration-300">
          
          <div onClick={handleAddToCart} title="Savatchaga qo'shish" className={icon_style}>
            <ShoppingCartOutlined />
          </div>
          
          <div onClick={handleWishlist} title="Like" className={icon_style}>
            {isWishlisted ? (
              <HeartFilled className="text-red-500" />
            ) : (
              <HeartOutlined className="text-gray-600" />
            )}
          </div>

          <div onClick={goToDetail} title="Ko'rish" className={icon_style}>
            <SearchOutlined />
          </div>
        </div>

        {props.discount && (
          <div className="bg-[#46A358] text-white absolute top-4 left-0 px-2.5 py-1 text-xs font-bold shadow-sm">
            13% OFF
          </div>
        )}
      </div>

      <div className="mt-3">
        <h3
          onClick={goToDetail}
          className="text-[#3D3D3D] text-[16px] font-medium cursor-pointer hover:text-[#46A358] transition-colors"
        >
          {props.title}
        </h3>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-[#46A358] text-[18px] font-bold">
            ${props.price}
          </span>
          {props.discount && (
            <span className="text-[#A5A5A5] line-through text-[15px]">
              ${props.discount_price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;