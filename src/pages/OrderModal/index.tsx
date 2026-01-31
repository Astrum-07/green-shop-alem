import { Modal } from "antd";
import Thank from "../../assets/img/thank-you.png";
import type { ShopCartType } from "../../@types";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    items: ShopCartType[];
    total: number;
    date: string;
    method: string;
  };
}

const OrderModal = ({ isOpen, onClose, orderData }: OrderModalProps) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
      className="order-modal"
    >
      <div className="text-center py-6 border-b border-[#46A358]/20">
        <div className="bg-[#46A358]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <img src={Thank} alt="Thanks" className="w-12" />
        </div>
        <h2 className="text-[#727272] text-[16px]">Your order has been received</h2>
      </div>

      <div className="grid grid-cols-4 gap-4 py-4 border-b border-[#46A358]/10 text-[12px] sm:text-[14px]">
        <div>
          <p className="text-[#A5A5A5]">Order Number</p>
          <p className="font-bold text-[#727272]">19586687</p>
        </div>
        <div>
          <p className="text-[#A5A5A5]">Date</p>
          <p className="font-bold text-[#727272]">{orderData.date}</p>
        </div>
        <div>
          <p className="text-[#A5A5A5]">Total</p>
          <p className="font-bold text-[#727272]">${orderData.total.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-[#A5A5A5]">Payment Method</p>
          <p className="font-bold text-[#727272] uppercase">{orderData.method}</p>
        </div>
      </div>

      <div className="py-4">
        <h3 className="font-bold text-[#3D3D3D] text-[15px] mb-4">Order Details</h3>
        <div className="max-h-[250px] overflow-y-auto pr-2">
          {orderData.items.map((item: ShopCartType) => (
            <div key={item._id} className="flex justify-between items-center mb-4 text-[14px]">
              <div className="flex items-center gap-3">
                <img src={item.main_image} alt={item.title} className="w-12 h-12 object-cover rounded" />
                <div>
                  <p className="font-bold text-[#3D3D3D] leading-none mb-1">{item.title}</p>
                  <p className="text-[#A5A5A5] text-[12px]">SKU: {item._id.slice(-8)}</p>
                </div>
              </div>
              <p className="text-[#A5A5A5] text-[13px]">(x {item.counter})</p>
              <p className="font-bold text-[#46A358]">${item.userPrice.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-4 space-y-2 text-[14px]">
        <div className="flex justify-between text-[#3D3D3D]">
          <span>Shipping</span>
          <span className="font-bold">$16.00</span>
        </div>
        <div className="flex justify-between text-[16px] font-bold">
          <span className="text-[#3D3D3D]">Total</span>
          <span className="text-[#46A358]">${orderData.total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full bg-[#46A358] text-white py-3 rounded-md mt-6 font-bold hover:bg-[#3d8d4c] transition-colors"
      >
        Track your order
      </button>
    </Modal>
  );
};

export default OrderModal;