import { Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { useReduxSelector } from "../../../hooks/useRedux";
import Card from "../card";

const Shopping = () => {
  const navigate = useNavigate();
  const { data } = useReduxSelector((state) => state.shopSlice);

  return (
    <div className="w-full">

      <div className="hidden sm:flex items-center justify-between text-start border-b border-[#46A358] pb-3 px-2">
        <h2 className="text-[#3D3D3D] text-[16px] font-medium w-[35%]">
          Products
        </h2>
        <h2 className="text-[#3D3D3D] text-[16px] font-medium w-[20%]">
          Price
        </h2>
        <h2 className="text-[#3D3D3D] text-[16px] font-medium w-[20%]">
          Quantity
        </h2>
        <h2 className="text-[#3D3D3D] text-[16px] font-medium w-[20%]">
          Total
        </h2>
        <h3 className="text-[#3D3D3D] text-[16px] font-medium w-[5%] text-right">
          {/* Delete icon uchun bo'sh joy yoki sarlavha */}
        </h3>
      </div>

      {/* Savatchada mahsulotlar borligi tekshiriladi */}
      {data.length ? (
        <div className="flex flex-col gap-1">
          {data.map((value) => (
            <Card key={value._id} {...value} />
          ))}
        </div>
      ) : (

        <div className="flex justify-center flex-col items-center mt-10 px-4 text-center">
          <Empty description="Your cart is empty" />
          <button
            className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white h-10 px-6 mt-4 active:scale-95 transition-transform"
            onClick={() => navigate("/")}
          >
            Go shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Shopping;