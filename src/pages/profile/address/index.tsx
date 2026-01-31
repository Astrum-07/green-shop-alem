import { useState } from "react";
import Cookies from "js-cookie";

interface BillingAddress {
  country: string;
  town: string;
  street_address: string;
  state: string;
  zip: string;
  extra_address: string;
}

interface AddressInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
}

const COOKIE_NAME = "user";

const DEFAULT_VALUES: BillingAddress = {
  country: "",
  town: "",
  street_address: "",
  state: "",
  zip: "",
  extra_address: "",
};

const Address = () => {
  const [address, setAddress] = useState<BillingAddress>(() => {
    const raw = Cookies.get(COOKIE_NAME);
    if (raw) {
      try {
        const user = JSON.parse(raw);
        if (user?.billing_address) {
          return user.billing_address;
        }
      } catch (err) {
        console.error("Cookie parse error:", err);
      }
    }
    return DEFAULT_VALUES;
  });

  const handleChange = (name: keyof BillingAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const raw = Cookies.get(COOKIE_NAME);
    let user = {};

    if (raw) {
      try {
        user = JSON.parse(raw);
      } catch (e) {
        user = {};
      }
    }

    const updatedUser = {
      ...user,
      billing_address: address,
    };

    Cookies.set(COOKIE_NAME, JSON.stringify(updatedUser), {
      expires: 7,
      path: "/",
    });

    alert("Manzil muvaffaqiyatli saqlandi!");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-lg shadow-sm border border-gray-100">
      <div className="flex flex-col gap-1 mb-8">
        <h2 className="text-[16px] font-bold text-[#3D3D3D]">
          Billing Address
        </h2>
        <p className="text-[#727272] text-[14px]">
          Quyidagi manzil buyurtma berish sahifasida sukut bo'yicha (default) ishlatiladi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
        <AddressInput 
          label="Country / Region" 
          value={address.country} 
          onChange={(v) => handleChange("country", v)} 
        />
        <AddressInput 
          label="Town / City" 
          value={address.town} 
          onChange={(v) => handleChange("town", v)} 
        />
        <AddressInput 
          label="Street Address" 
          value={address.street_address} 
          onChange={(v) => handleChange("street_address", v)} 
          placeholder="Uy raqami va ko'cha nomi"
        />
        <AddressInput 
          label="State" 
          value={address.state} 
          onChange={(v) => handleChange("state", v)} 
        />
        <AddressInput 
          label="Zip Code" 
          value={address.zip} 
          onChange={(v) => handleChange("zip", v)} 
        />
        <AddressInput 
          label="Extra Address (Optional)" 
          value={address.extra_address} 
          onChange={(v) => handleChange("extra_address", v)} 
          required={false}
        />
      </div>

      <button
        onClick={handleSave}
        className="mt-10 bg-[#46A358] hover:bg-[#3d8e4d] text-white px-10 py-3 rounded-md font-bold text-[16px] transition-all active:scale-95"
      >
        Save Address
      </button>
    </div>
  );
};

const AddressInput = ({ label, value, onChange, placeholder, required = true }: AddressInputProps) => (
  <div className="flex flex-col gap-2 text-left">
    <label className="text-[15px] font-medium text-[#3D3D3D]">
      {required && <span className="text-red-500 mr-1">*</span>}
      {label}
    </label>
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="border border-[#EAEAEA] rounded-md px-4 h-11 outline-none focus:border-[#46A358] transition-colors text-[#3D3D3D]"
    />
  </div>
);

export default Address;