import { Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Prices from "./price";

const CardTotal = () => {
  const navigate = useNavigate();
  return (

    <div className="w-full max-w-112.5 px-2 sm:px-0 mx-auto">
      <h3 className="pb-5 text-[#3D3D3D] font-bold text-[18px]">Card Total</h3>
      

      <Form className="flex h-10 mt-8.75">
        <input
          name="coupon"
          type="text"
          placeholder="Enter coupon code here..."
          className="border w-[75%] sm:w-4/5 border-[#46A358] pl-3.75 placeholder:text-[12px] sm:placeholder:text-base placeholder:font-light rounded-l-lg outline-none"
        />
        <button 
          type="submit"
          className="bg-[#46A358] flex rounded-r-lg items-center justify-center text-sm sm:text-base text-white w-[25%] sm:w-1/5"
        >
          <span>Apply</span>
        </button>
      </Form>

      <Prices />

      <button
        onClick={() => navigate("/proced-checkout")}
        className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white w-full h-10 mt-7.5 active:scale-95 transition-transform"
      >
        Proceed To Checkout
      </button>

      <Link to={"/"} className="flex justify-center">
        <button className="mt-3.5 text-[#46A358] cursor-pointer hover:underline">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default CardTotal;