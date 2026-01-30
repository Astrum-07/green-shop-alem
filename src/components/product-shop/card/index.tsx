import { DeleteFilled } from "@ant-design/icons";
import type { FC } from "react";

import { useReduxDispatch } from "../../../hooks/useRedux";
import { decrement, deleteData, increment } from "../../../redux/shop-slice";
import type { ShopCartType } from "../../../@types";

const Card: FC<ShopCartType> = (props) => {
  const { main_image, title, _id, price, counter, userPrice } = props;
  const dispatch = useReduxDispatch();

  return (
    <div className="my-5 bg-[#fbfbfb] p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg gap-4 relative">
      

      <div className="flex items-center gap-3 w-full sm:w-[35%]">
        <img className="w-16 h-16 sm:w-17.5 sm:h-17.5 object-cover rounded" src={main_image} alt={title} />
        <div className="overflow-hidden">
          <h3 className="text-[14px] sm:text-[16px] font-medium truncate">{title}</h3>
          <p className="text-[12px] sm:text-[14px] font-normal pt-1 sm:pt-2.5">
            <span className="text-[#A5A5A5]">SKU: </span> 
            <span className="break-all">{_id}</span>
          </p>
        </div>
      </div>


      <div className="flex flex-wrap items-center justify-between w-full sm:w-[60%] gap-2 border-t sm:border-t-0 pt-3 sm:pt-0">
        

        <div className="text-[#727272] text-[14px] sm:text-[16px] font-medium min-w-12.5">
          ${price}
        </div>


        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => dispatch(decrement(_id))}
            className="w-6 h-6 sm:w-6.25 sm:h-6.25 bg-[#46A358] rounded-full text-white flex items-center justify-center active:scale-90 transition-transform"
          >
            -
          </button>
          <span className="text-[15px] sm:text-[17px] min-w-5 text-center">{counter}</span>
          <button
            onClick={() => dispatch(increment(_id))}
            className="w-6 h-6 sm:w-6.25 sm:h-6.25 bg-[#46A358] rounded-full text-white flex items-center justify-center active:scale-90 transition-transform"
          >
            +
          </button>
        </div>


        <div className="text-[#46A358] sm:text-[#727272] text-[14px] sm:text-[16px] font-bold sm:font-medium min-w-15 text-right">
          ${userPrice?.toFixed(2)}
        </div>
      </div>


      <DeleteFilled
        onClick={() => dispatch(deleteData(_id))}
        className="text-[#727272] text-[18px] sm:text-[20px] cursor-pointer hover:text-red-500 transition-colors absolute top-3 right-3 sm:static"
      />
    </div>
  );
};

export default Card;