import { useReduxSelector } from "../../../../hooks/useRedux";

const Prices = () => {
  const { data } = useReduxSelector((state) => state.shopSlice);

  const subtotal = data.reduce((acc, item) => acc + (item.userPrice || 0), 0);

  const shipping = data.length > 0 ? 16 : 0;

  const total = subtotal + shipping;

  const cupon_title_style = "text-[#3D3D3D] text-[15px] font-normal";

  return (
    <div>
      <div className="mt-5">
        <div className="flex justify-between items-center pt-3">
          <h3 className={`${cupon_title_style}`}>Subtotal</h3>
          <h2 className="text-[#3D3D3D] text-[18px] font-medium">
            ${subtotal.toFixed(2)}
          </h2>
        </div>

        <div className="flex justify-between items-center pt-3">
          <h3 className={`${cupon_title_style}`}>Coupon Discount</h3>
          <h2 className="text-[#3D3D3D] text-[15px]">0.00$</h2>
        </div>

        <div className="flex justify-between items-center pt-3">
          <h3 className={`${cupon_title_style}`}>Shipping</h3>
          <h2 className="text-[#3D3D3D] text-[18px] font-medium">
            ${shipping.toFixed(2)}
          </h2>
        </div>
      </div>

      <div>
        <div className="flex justify-between mt-5 border-t pt-4">
          <h2 className="text-[#3D3D3D] text-[16px] font-bold">Total:</h2>
          <div>
            <h1 className="text-[#46A358] text-[18px] font-bold">
              ${total.toFixed(2)}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prices;
