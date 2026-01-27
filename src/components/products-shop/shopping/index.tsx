import { Card, Empty } from "antd";
import { useNavigate } from "react-router-dom";


import { useReduxSelector } from "../../../hooks/useRedux";

const Shopping = () => {
  const navigate = useNavigate();

  const { data } = useReduxSelector((state) => state.shopSlice);

  return (
    <div className="w-[90%] m-auto mt-10 mb-20">
      <div>

        <div className="flex items-center justify-between text-start border-b border-[#46A358] pb-3 mb-5">
          <h2 className="text-[#3D3D3D] text-[16px] font-medium w-[40%]">
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
          <h3 className="text-[#3D3D3D] text-[16px] font-medium">Delete</h3>
        </div>


        {data.length ? (
          <div className="flex flex-col gap-2">
            {data.map((value) => (
              <Card key={value._id} {...value} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center flex-col items-center mt-20 py-10">
            <Empty description="Savatda hozircha mahsulot yo'q" />
            <button
              className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white h-10 px-6.25 mt-5 cursor-pointer hover:bg-[#3d8b4a] transition-all"
              onClick={() => navigate("/")}
            >
              Go shop
            </button>
          </div>
        )}


        {data.length > 0 && (
          <div className="flex justify-end mt-10">
            <div className="w-75">
              <h2 className="text-xl font-bold border-b pb-2 mb-4">Cart Totals</h2>
              <button 
                className="w-full bg-[#46A358] text-white py-3 rounded-md font-bold hover:opacity-90"
                onClick={() => navigate("/checkout")}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shopping;