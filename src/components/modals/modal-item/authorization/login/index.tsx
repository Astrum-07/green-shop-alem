import { Form, Input } from "antd";
import Googleicon from "../../../../../assets/img/google-icon.png";
import { useLoginMutation, useOnAuthGoogle } from "../../../../../hooks/useQuery/useQueryAction";
import { Loader } from "lucide-react";


const Login = () => {
  const input_style: string = "h-[40px] mt-2 border-[#46A358]";
  const icon_style: string =
    "border h-[40px] rounded-md flex items-center justify-center gap-3 mb-4 cursor-pointer";
  const { mutate, isPending } = useLoginMutation();
  const login = (e: { email: string; password: string }) => {
    mutate(e);
  };

const {mutate: mutateGoogle}= useOnAuthGoogle()

  return (
    <div className="w-4/5 m-auto">
      <div className="mt-5 mb-2">
        <p>Enter your email and password to login.</p>
        <Form onFinish={login}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Plase input your email",
              },
            ]}
          >
            <Input
              type="email"
              placeholder="almamun_uxui@outlook.com"
              className={`${input_style}`}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Plase input your password",
              },
            ]}
          >
            <Input.Password
              placeholder="**********"
              className={`${input_style}`}
            />
          </Form.Item>

          <p className="text-end mt-2  text-sm cursor-pointer">
            Forgot Password?
          </p>

          <button className="bg-main w-full mt-4 text-white h-10 rounded-md flex items-center justify-center">
            {isPending ? <Loader className="animate-spin" /> : "Login"}
          </button>
        </Form>

        <div className="flex items-center justify-center mt-5 mb-5 gap-4">
          <div className="w-[30%] h-0.5 bg-[#EAEAEA]"></div>
          <p className="w-[40%] text-[#3D3D3D] text-[13px]">Or login with</p>
          <div className="w-[30%] h-0.5 bg-[#EAEAEA]"></div>
        </div>

        <div onClick={()=> mutateGoogle()} className={`${icon_style}`}>
          <img className="w-6" src={Googleicon} alt="" />
          <p>Login with Google</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
