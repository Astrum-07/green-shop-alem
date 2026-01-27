import { Form } from "antd";
import { Link, useNavigate } from "react-router-dom";

import Prices from "./prices";


const CardTotal = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">

      <h3 className="pb-5 text-[#3D3D3D] border-b border-[#46A3584d] font-bold text-[18px]">
        Cart Totals
      </h3>


      <div className="mt-8">
        <p className="text-[#3D3D3D] text-[14px] mb-2">If you have a coupon code, please apply it.</p>
        <Form className="flex h-10 mt-2">
          <input
            name="coupon"
            placeholder="Enter coupon code here..."
            className="border w-4/5 border-[#46A358] pl-3.75 placeholder:font-light rounded-l-lg outline-none text-[14px]"
          />
          <button 
            type="submit"
            className="bg-[#46A358] flex items-center justify-center text-white w-1/5 rounded-r-lg text-base font-semibold hover:bg-[#3d8b4a] transition-all"
          >
            <span>Apply</span>
          </button>
        </Form>
      </div>


      <div className="mt-5">
        <Prices />
      </div>


      <button
        onClick={() => navigate("/proced-checkout")}
        className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base font-bold text-white w-full h-11.25 mt-8 hover:bg-[#3d8b4a] shadow-md transition-all active:scale-[0.98]"
      >
        Proceed To Checkout
      </button>


      <Link to="/" className="flex justify-center mt-4">
        <button className="text-[#46A358] text-[14px] font-medium hover:underline cursor-pointer transition-all">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default CardTotal;