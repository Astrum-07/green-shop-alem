import { DeleteFilled } from "@ant-design/icons";
import type { FC } from "react";
import type { ShopCartType } from "../../../@types";
import { useDispatch } from "react-redux";
import { decrementCounter, deleteProduct, incrementCounter } from "../../../redux/shop-slice";


const Card: FC<ShopCartType> = (props) => {
  const { main_image, title, _id, price, counter, userPrice } = props;
  const dispatch = useDispatch();

  return (
    <div className="my-5 bg-[#eee] p-2 flex items-center justify-between rounded-lg">
      <div className="flex items-center gap-4 w-[40%]">
        <img className="w-16 h-16 object-cover" src={main_image} alt={title} />
        <div>
          <h3 className="text-[16px] font-medium">{title}</h3>
          <p className="text-[14px] font-normal pt-2.5 max-sm:text-[12px] ">
            <span className="text-[#A5A5A5]">SKU: </span> {_id}
          </p>
        </div>
      </div>

      <div className="text-[#727272] text-[16px] font-medium w-[20%] text-center">
        ${price}
      </div>

      <div className="flex items-center justify-center gap-3 w-[20%]">
        <button 
          onClick={() => dispatch(decrementCounter(_id))}
          className="w-7 h-7 bg-[#46A358] rounded-full text-white flex items-center justify-center cursor-pointer active:scale-90"
        >
          -
        </button>
        <span className="text-[17px] font-bold w-5 text-center">{counter}</span>
        <button 
          onClick={() => dispatch(incrementCounter(_id))}
          className="w-7 h-7 bg-[#46A358] rounded-full text-white flex items-center justify-center cursor-pointer active:scale-90"
        >
          +
        </button>
      </div>

      <div className="text-[#46A358] text-[16px] font-bold w-[20%] text-center">
        ${userPrice?.toFixed(2)}
      </div>

      <div className="w-[10%] flex justify-end pr-4">
        <DeleteFilled 
          onClick={() => dispatch(deleteProduct(_id))}
          className="text-[#727272] text-[20px] cursor-pointer hover:text-red-500 transition-colors" 
        />
      </div>
    </div>
  );
};

export default Card;