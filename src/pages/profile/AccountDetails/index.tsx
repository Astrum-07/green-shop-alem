import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { UploadCloud, User as UserIcon } from "lucide-react";
import { message } from "antd";

// 1. Foydalanuvchi ma'lumotlari uchun interfeys
interface UserType {
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  username: string;
  avatar?: string;
}

// 2. Input komponenti uchun props interfeysi
interface InputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

const COOKIE_NAME = "user";

const AccountDetails: React.FC = () => {
  const [user, setUser] = useState<UserType>({
    name: "",
    surname: "",
    email: "",
    phone_number: "",
    username: "",
    avatar: ""
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const data = Cookies.get(COOKIE_NAME);
    if (data) {
      try {
        setUser(JSON.parse(data));
      } catch (err) {
        console.error("Cookie parsing error", err);
      }
    }
  }, []);

  // Rasm yuklash funksiyasi
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2000000) { // 2MB limit
        message.error("Rasm hajmi 2MB dan ko'p bo'lmasligi kerak");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!user.name || !user.email || !user.username) {
      message.warning("Iltimos, barcha majburiy maydonlarni to'ldiring");
      return;
    }

    Cookies.set(COOKIE_NAME, JSON.stringify(user), { expires: 7, path: '/' });
    message.success("Ma'lumotlar muvaffaqiyatli saqlandi!");
  };

  return (
    <div className="animate-fadeIn max-w-4xl">
      <h2 className="text-[17px] font-bold mb-8 text-[#3D3D3D] border-b border-gray-100 pb-4">
        Account Details
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <Input 
          label="First name" 
          value={user.name} 
          onChange={(v) => setUser({...user, name: v})} 
        />
        <Input 
          label="Last name" 
          value={user.surname} 
          onChange={(v) => setUser({...user, surname: v})} 
        />
        <Input 
          label="Email address" 
          type="email" 
          value={user.email} 
          onChange={(v) => setUser({...user, email: v})} 
        />
        <Input 
          label="Phone number" 
          value={user.phone_number} 
          onChange={(v) => setUser({...user, phone_number: v})} 
        />
        <Input 
          label="Username" 
          value={user.username} 
          placeholder="Enter username" 
          onChange={(v) => setUser({...user, username: v})} 
        />

        {/* Image Upload Section */}
        <div className="flex flex-col gap-3">
          <label className="text-[15px] font-medium text-[#3D3D3D]">Photo</label>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="text-gray-300" size={24} />
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageChange} 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 border border-[#46A358] text-[#46A358] rounded-lg h-10 px-5 hover:bg-green-50 transition-colors text-sm font-bold"
            >
              <UploadCloud size={16} /> 
              Change Photo
            </button>
          </div>
        </div>
      </div>

      <button 
        onClick={handleSave} 
        className="mt-12 bg-[#46A358] text-white px-12 py-3.5 rounded-lg font-bold hover:bg-[#3d8e4d] transition-all shadow-lg shadow-green-100 active:scale-95"
      >
        Save Changes
      </button>
    </div>
  );
};

const Input: React.FC<InputProps> = ({ label, value, onChange, type = "text", placeholder = "", required = true }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[15px] font-medium text-[#3D3D3D]">
      {required && <span className="text-red-500 mr-1">*</span>}
      {label}
    </label>
    <input
      type={type} 
      value={value} 
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="border border-[#EAEAEA] rounded-lg px-4 h-11 outline-none focus:border-[#46A358] transition-all text-[#3D3D3D] placeholder:text-gray-300"
    />
  </div>
);

export default AccountDetails;