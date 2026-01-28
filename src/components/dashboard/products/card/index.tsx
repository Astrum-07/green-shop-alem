import type { FC } from "react";

import {
  HeartFilled,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import type { ProductType } from "../../../../@types";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import { getData } from "../../../../redux/shop-slice";

const Card: FC<ProductType> = (props) => {
  const icon_style =
    "bg-[#FFFFFF] w-[35px] h-[35px] flex rounded-lg justify-center items-center cursor-pointer text-[20px] hover:text-[#46A358] transition-colors";
  const { data } = useReduxSelector((state) => state.shopSlice);
  console.log(data);
  
  const dispatch = useReduxDispatch();
  return (
    <div className="relative w-full">
      <div className="group h-75 bg-[#f5f5f5] flex justify-center items-center relative overflow-hidden rounded-sm">
        <img
          src={props.main_image}
          alt="flower"
          className="w-full h-full max-sm:h-full object-contain"
        />

        <div className="hidden gap-3 justify-center inset-x-auto absolute bottom-5 items-center group-hover:flex animate-in fade-in slide-in-from-bottom-2">
          <div
           onClick={() => dispatch(getData({ ...props, counter: 1 }))}
            className={`${icon_style}`}
          >
            <ShoppingCartOutlined />
          </div>
          <div className={`${icon_style}`}>
            <HeartFilled className="text-red-500" />
          </div>
          <div className={`${icon_style}`}>
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
        <h3 className="text-[#3D3D3D] text-[16px] font-medium pt-2.5 pb-0.5">
          {props.title}
        </h3>

        <div className="flex items-center gap-3">
          <h1 className="text-[#46A358] text-[18px] font-bold">
            {props.price}$
          </h1>

          {props.discount && props.discount_price && (
            <h1 className="font-light text-[#A5A5A5] line-through text-[16px]">
              {props.discount_price}$
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
