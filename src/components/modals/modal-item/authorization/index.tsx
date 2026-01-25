import { Modal } from "antd";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import { setAuthorizationModalVisiblty } from "../../../../redux/modal-store";
import Login from "./login";
import Register from "./register";
import { useState } from "react";

const AuthorizationModal = () => {
  const { authorizationModalVisiblity } = useReduxSelector(
    (state) => state.modalSlice,
  );

  const dispatch = useReduxDispatch();
  const [state, setState] = useState<string>("login");

  return (
    <Modal
      open={authorizationModalVisiblity}
      footer={false}
      onCancel={() => dispatch(setAuthorizationModalVisiblty())}
    >
      <div className="mt-10">
        <div className="flex items-center justify-center gap-4">
          <div
             className={`text-xl cursor-pointer ${state==="login" && "text-main"}`}
            onClick={() => setState("login")}
          >
            Login
          </div>
          <div className="bg-[#3D3D3D] w-px h-5"></div>
          <div
            className={`text-xl cursor-pointer ${state==="register" && "text-main"}`}
            onClick={() => setState("register")}
          >
            Register
          </div>
        </div>
        {state === "login" ? <Login /> : <Register />}
      </div>
    </Modal>
  );
};

export default AuthorizationModal;
