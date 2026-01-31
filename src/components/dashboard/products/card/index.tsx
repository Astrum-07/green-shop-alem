import type { FC } from "react";

import {
  HeartFilled,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
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
    "bg-[#FFFFFF] w-[35px] h-[35px] flex rounded-lg justify-center items-center cursor-pointer text-[20px] hover:text-[#46A358] transition-colors shadow-sm";

  const goToDetail = () => {
    navigate(`/shop/${props._id}`, { state: props });
  };

  return (
    <div className="relative w-full">
      <div className="group h-75 bg-[#f5f5f5] flex justify-center items-center relative overflow-hidden rounded-sm">
        <img
          onClick={goToDetail}
          src={props.main_image}
          alt={props.title}
          className="w-full h-full object-contain cursor-pointer"
        />

        <div className="flex md:hidden md:group-hover:flex gap-3 justify-center inset-x-auto absolute bottom-5 items-center animate-in fade-in slide-in-from-bottom-2">
          <div
            onClick={() =>
              dispatch(
                getData({ ...props, counter: 1, userPrice: props.price }),
              )
            }
            className={icon_style}
          >
            <ShoppingCartOutlined />
          </div>
          <div
            onClick={() =>
              dispatch(
                toggleWishlist({
                  ...props,
                  count: 1,
                  userPrice: props.price,
                }),
              )
            }
            className={icon_style}
          >
            <HeartFilled
              className={isWishlisted ? "text-red-500" : "text-gray-400"}
            />
          </div>
          <div onClick={goToDetail} className={icon_style}>
            <SearchOutlined />
          </div>
        </div>

        {props.discount && (
          <div className="bg-[#46A358] text-white absolute top-4 left-0 px-2.5 py-0.75 text-sm font-medium">
            13% OFF
          </div>
        )}
      </div>

      <div className="mt-2">
        <h3
          onClick={goToDetail}
          className="text-[#3D3D3D] text-[16px] font-medium pt-2.5 pb-0.5 cursor-pointer hover:text-[#46A358] capitalize"
        >
          {props.title}
        </h3>
        <div className="flex items-center gap-3">
          <h1 className="text-[#46A358] text-[18px] font-bold">
            ${props.price}
          </h1>
          {props.discount && (
            <h1 className="font-light text-[#A5A5A5] line-through text-[16px]">
              ${props.discount_price}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
