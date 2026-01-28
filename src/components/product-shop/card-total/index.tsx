import { Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Prices from "./price";

const CardTotal = () => {
  const navigate = useNavigate();
  return (
    <div className="w-112.5!">
      <h3 className="pb-5 text-[#3D3D3D] font-bold text-[18px]">Card Total</h3>
      <Form className="flex h-10 mt-8.75">
        <input
          name="coupon"
          placeholder="Enter coupon code here..."
          className="border w-4/5 border-[#46A358] pl-3.75 placeholder:font-light rounded-l-lg rounded-r-none outline-none text-"
        />
        <button className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white w-1/5 rounded-l-no">
          <span>Apply</span>
        </button>
      </Form>
      <Prices />
      <button
        onClick={() => navigate("/proced-checkout")}
        className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white w-full h-10 mt-7.5"
      >
        Proceed To Checkout
      </button>
      <Link to={"/"} className="flex justify-center">
        <button className="mt-3.5 text-[#46A358] cursor-pointer">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default CardTotal;
