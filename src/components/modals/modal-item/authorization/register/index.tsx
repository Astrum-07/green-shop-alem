import { Form, Input } from "antd";
import Googleicon from "../../../../../assets/img/google-icon.png";
import type { RegisterType } from "../../../../../@types";
import { notificationApi } from "../../../../../generic/notificationApi";
import { useRegisterMutation } from "../../../../../hooks/useQuery/useQueryAction";
import { Loader } from "lucide-react";
const Register = () => {
  const input_style: string = "h-[40px] mt-2";
  const icon_style: string =
    "border h-[40px] rounded-md flex items-center justify-center gap-3 mb-4 cursor-pointer";

const notify = notificationApi();
const {mutate, isPending}= useRegisterMutation()


const user_register = (e: RegisterType) => {
  if (e.password !== e.second_password) {
    return notify("second_password");
  }
  const {name, surname, password, email}=e

  mutate({name, surname, password, email})
};
  return (
    <div className="w-4/5 m-auto">
      <div className="mt-5">
        <p>Enter your email and password to register.</p>
        <Form onFinish={user_register}>
          <Form.Item
            name={"name"}
            rules={[{ required: true, message: "Plase input your name" }]}
          >
            <Input placeholder="Name" className={`${input_style}`} />
          </Form.Item>

          <Form.Item
            name={"surname"}
            rules={[{ required: true, message: "Plase input your surname" }]}
          >
            <Input placeholder="surname" className={`${input_style}`} />
          </Form.Item>

          <Form.Item
            name={"email"}
            rules={[{ required: true, message: "Plase input your email" }]}
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              className={`${input_style}`}
            />
          </Form.Item>

          <Form.Item
            name={"password"}
            rules={[{ required: true, message: "Plase input your password" }]}
          >
            <Input.Password placeholder="Password" className={`${input_style}`} />
          </Form.Item>

          <Form.Item
            name={"second_password"}
            rules={[
              { required: true, message: "Plase input your confirm password" },
            ]}
          >
            <Input.Password
              placeholder="Confirm Password"
              className={`${input_style}`}
            />
          </Form.Item>

          <p className="text-end mt-2 text-main text-sm cursor-pointer">
            Forgot Password?
          </p>

          <button className="bg-main w-full mt-4 text-white h-10 rounded-md flex items-center justify-center">
             {isPending ? <Loader className="animate-spin" /> : "Register"}
          </button>
        </Form>

        <div className="flex items-center justify-center mt-5 mb-5 gap-4">
          <div className="w-[30%] h-0.5 bg-[#EAEAEA]"></div>
          <p className="w-[40%] text-[#3D3D3D] text-[13px]">Or register with</p>
          <div className="w-[30%] h-0.5 bg-[#EAEAEA]"></div>
        </div>

        <div className={`${icon_style}`}>
          <img className="w-6" src={Googleicon} alt="" />
          <p>Register with Google</p>
        </div>

        
      </div>
    </div>
  );
};

export default Register;