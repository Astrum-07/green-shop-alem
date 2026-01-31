import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message, Radio, Checkbox } from "antd";
import Cookies from "js-cookie";
import { useReduxSelector } from "../../hooks/useRedux";
import type { ShopCartType } from "../../@types";
import OrderModal from "../OrderModal";
import Header from "../../components/header";
import Footer from "../../components/footer";

interface BillingForm {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  street: string;
  extra: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
  notes: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { data, coupon } = useReduxSelector((state) => state.shopSlice);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [formData, setFormData] = useState<BillingForm>(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        return {
          firstName: user.name || "",
          lastName: user.surname || "",
          email: user.email || "",
          phone: user.phone_number || "",
          country: user.billing_address?.country || "",
          city: user.billing_address?.town || "",
          street: user.billing_address?.street_address || "",
          extra: user.billing_address?.extra_address || "",
          state: user.billing_address?.state || "",
          zip: user.billing_address?.zip || "",
          notes: "",
        };
      } catch (e) {
        console.error(e);
      }
    }
    return {
      firstName: "", lastName: "", country: "", city: "", 
      street: "", extra: "", state: "", zip: "", 
      email: "", phone: "", notes: ""
    };
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      message.warning("Iltimos, avval ro'yxatdan o'ting!");
      navigate("/");
    }
  }, [navigate]);

  const subtotal = data.reduce((acc, item) => acc + (item.userPrice || 0), 0);
  const shipping = 16.0;
  const discountAmount = (subtotal * coupon) / 100;
  const total = subtotal - discountAmount + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    const required: (keyof BillingForm)[] = [
      "firstName", "lastName", "country", "city", "street", "state", "zip", "email", "phone"
    ];

    const isEmpty = required.some(field => !formData[field].trim());

    if (isEmpty) {
      message.error("Iltimos, hamma majburiy maydonlarni to'ldiring!");
      return;
    }

    const orderHistory = JSON.parse(localStorage.getItem("order-history") || "[]");
    const newOrder = {
      id: Math.floor(Math.random() * 1000000),
      items: data,
      total: total,
      date: new Date().toLocaleDateString(),
      method: paymentMethod,
    };
    localStorage.setItem("order-history", JSON.stringify([...orderHistory, newOrder]));
    
    setIsModalOpen(true);
  };

  const labelStyle = "block text-[#3D3D3D] text-[15px] mb-1.5 font-medium";
  const inputStyle = "w-full border border-[#EAEAEA] rounded-[3px] p-2.5 outline-none focus:border-[#46A358] transition-all text-[#727272] text-[14px]";

  return (
    <div className="">
        <Header/>

        <div className="max-w-[90%] mx-auto px-4 py-6 sm:py-10">
      <div className="text-[14px] mb-8 text-[#3D3D3D]">
        <span className="font-bold">Home</span> / Shop / Checkout
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        <div className="flex-1">
          <h2 className="text-[17px] font-bold text-[#3D3D3D] mb-6">Billing Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <label className={labelStyle}>First Name <span className="text-red-500">*</span></label>
              <input name="firstName" value={formData.firstName} onChange={handleChange} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Last Name <span className="text-red-500">*</span></label>
              <input name="lastName" value={formData.lastName} onChange={handleChange} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Country / Region <span className="text-red-500">*</span></label>
              <select name="country" value={formData.country} onChange={handleChange} className={inputStyle}>
                <option value="">Select a country</option>
                <option value="Uzbekistan">Uzbekistan</option>
              </select>
            </div>
            <div>
              <label className={labelStyle}>Town / City <span className="text-red-500">*</span></label>
              <input name="city" value={formData.city} onChange={handleChange} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Street Address <span className="text-red-500">*</span></label>
              <input name="street" value={formData.street} onChange={handleChange} className={inputStyle} placeholder="House number and street name" />
            </div>
            <div>
              <label className={labelStyle}>&nbsp;</label>
              <input name="extra" value={formData.extra} onChange={handleChange} className={inputStyle} placeholder="Appartment, suite, unit, etc. (optional)" />
            </div>
            <div>
              <label className={labelStyle}>State <span className="text-red-500">*</span></label>
              <select name="state" value={formData.state} onChange={handleChange} className={inputStyle}>
                <option value="">Select a state</option>
                <option value="Tashkent">Tashkent</option>
              </select>
            </div>
            <div>
              <label className={labelStyle}>Zip <span className="text-red-500">*</span></label>
              <input name="zip" value={formData.zip} onChange={handleChange} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Email address <span className="text-red-500">*</span></label>
              <input name="email" value={formData.email} onChange={handleChange} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Phone Number <span className="text-red-500">*</span></label>
              <div className="flex border border-[#EAEAEA] rounded-[3px]">
                <select className="p-2 bg-transparent outline-none text-[14px] border-r border-[#EAEAEA]" defaultValue="+998">
                  <option value="+998">+998</option>
                </select>
                <input name="phone" value={formData.phone} onChange={handleChange} className="flex-1 p-2 outline-none text-[14px]" />
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <Checkbox id="different" />
            <label htmlFor="different" className="text-[#3D3D3D] text-[15px] cursor-pointer">Ship to a different address?</label>
          </div>
          <div className="mt-8">
            <label className={labelStyle}>Order notes (optional)</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} className={`${inputStyle} h-32 resize-none`} />
          </div>
        </div>

        <div className="w-full lg:w-[420px]">
          <h2 className="text-[17px] font-bold text-[#3D3D3D] mb-6">Your Order</h2>
          <div className="flex justify-between font-bold text-[#3D3D3D] border-b pb-3 text-[16px]">
            <span>Products</span>
            <span>Subtotal</span>
          </div>

          <div className="my-4 space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {data.map((item: ShopCartType) => (
              <div key={item._id} className="flex items-center justify-between bg-[#FBFBFB] p-2 rounded-sm">
                <div className="flex items-center gap-3">
                  <img src={item.main_image} alt={item.title} className="w-16 h-16 object-cover bg-white" />
                  <div>
                    <h4 className="text-[#3D3D3D] font-bold text-[14px] leading-tight">{item.title}</h4>
                    <p className="text-[#A5A5A5] text-[12px] mt-1">SKU: {item._id.slice(-8)}</p>
                  </div>
                </div>
                <div className="text-[#A5A5A5] text-[14px] min-w-[40px] text-center">(x {item.counter})</div>
                <div className="text-[#46A358] font-bold text-[16px]">${item.userPrice.toFixed(2)}</div>
              </div>
            ))}
          </div>

          <p className="text-right text-[14px] mb-6">Have a coupon code? <span className="text-[#46A358] font-bold cursor-pointer hover:underline">Click here</span></p>

          <div className="space-y-4 border-b pb-5">
            <div className="flex justify-between"><span>Subtotal</span><span className="font-bold text-[18px]">${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Coupon Discount</span><span>(-) 00.00</span></div>
            <div className="flex justify-between items-center">
              <span>Shipping</span>
              <div className="text-right">
                <span className="font-bold text-[18px] block">${shipping.toFixed(2)}</span>
                <span className="text-[#46A358] text-[12px] cursor-pointer">View shipping charge</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between py-4 text-[#46A358] font-bold text-[16px]">
            <span className="text-[#3D3D3D]">Total</span>
            <span className="text-[22px]">${total.toFixed(2)}</span>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-[#3D3D3D] text-[17px] mb-4">Payment Method</h3>
            <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod} className="w-full flex flex-col gap-3">
              <div className="border border-[#EAEAEA] rounded p-3 flex justify-between items-center">
                <Radio value="paypal" className="font-medium">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4 inline ml-2" alt="paypal" />
                </Radio>
              </div>
              <div className="border border-[#EAEAEA] rounded p-3"><Radio value="bank" className="font-medium">Direct bank transfer</Radio></div>
              <div className={`border rounded p-3 ${paymentMethod === 'cash' ? 'border-[#46A358] bg-[#FBFBFB]' : 'border-[#EAEAEA]'}`}>
                <Radio value="cash" className="font-medium">Cash on delivery</Radio>
              </div>
            </Radio.Group>
          </div>

          <button 
            onClick={handlePlaceOrder}
            className="w-full bg-[#46A358] text-white font-bold py-4 rounded-md mt-8 hover:bg-[#3d8d4c] transition-all shadow-lg shadow-[#46a35833]"
          >
            Place Order
          </button>
        </div>
      </div>

      <OrderModal
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); navigate("/"); }}
        orderData={{ items: data, total, date: new Date().toLocaleDateString(), method: paymentMethod }}
      />
    </div>
    <Footer/>
    </div>
  );
};

export default Checkout;