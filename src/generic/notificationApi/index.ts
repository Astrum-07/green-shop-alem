import { toast } from "react-hot-toast";
type NotificationType = "login" | "409" | "second_password" | "register"|"error"|"coupon"|"not_coupon"

export const notificationApi = () => {
  const notify = (type: NotificationType) => {
    switch (type) {
      case "login":
        return toast.success("Xush kelibsiz!");
      case "409":
        return toast.error("Email yoki parol xato!");
      case "second_password":
        return toast.error("Parollar mos emas!");
      case "register":
        return toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!");  
         case "error":
        return toast.error("Something Error!"); 
         case "coupon":
        return toast.success("Chegirma qabul qilindi!");
      case "not_coupon":
        return toast.error("Chegirma aniqlanmadi!");
    }
  };

  return notify;
};
