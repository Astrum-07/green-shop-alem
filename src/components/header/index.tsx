import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Bell, ShoppingCart } from "lucide-react";
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import { setAuthorizationModalVisiblty } from "../../redux/modal-store";
import { Badge } from "antd";

const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useReduxDispatch();
  const { user, isAuth } = useReduxSelector((state) => state.userSlice);
  const navigate = useNavigate();

  const { data } = useReduxSelector((state) => state.shopSlice);

  return (
    <div className="py-3 border-b border-[#00800043]">
      <div className="w-[90%] m-auto flex items-center justify-between">
        <img
          src="https://green-shop-otabek.vercel.app/assets/logo-nyVMFuKc.svg"
          alt=""
        />
        <div className="flex items-center gap-5">
          <Link
            to={"/"}
            className={`${pathname === "/" && "text-main"} font-semibold`}
          >
            Home
          </Link>
          <Link
            className={`${pathname === "/blog" && "text-main"} font-semibold`}
            to={"/blog"}
          >
            Blog
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <Search />
          <Bell />
          <div
            onClick={() => navigate("/shop")}
            className="cursor-pointer"
          >
            <Badge count={data.length}>
              <ShoppingCart />
            </Badge>
          </div>
          <button
            onClick={() => {
              if (isAuth) {
                return navigate("/profile");
              }
              dispatch(setAuthorizationModalVisiblty());
            }}
            className="bg-main rounded-lg font-medium text-white p-[7px_25px] cursor-pointer"
          >
            {user ? user.name : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
