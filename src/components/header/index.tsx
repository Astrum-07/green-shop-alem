import { useState } from "react"; 
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Bell, ShoppingCart, Menu, X } from "lucide-react"; 
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import { setAuthorizationModalVisiblty } from "../../redux/modal-store";
import { Badge } from "antd";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const { pathname } = useLocation();
  const dispatch = useReduxDispatch();
  const { user, isAuth } = useReduxSelector((state) => state.userSlice);
  const navigate = useNavigate();

  const { data } = useReduxSelector((state) => state.shopSlice);


  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="py-3 border-b border-[#00800043] relative bg-white">
      <div className="w-[90%] m-auto flex items-center justify-between">

       <Link to={"/"}>
        <img
          src="https://green-shop-otabek.vercel.app/assets/logo-nyVMFuKc.svg"
          alt="Logo"
          className="w-30 md:w-37.5"
        /></Link>


        <div className="hidden md:flex items-center gap-5">
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


        <div className="flex items-center gap-3 md:gap-5">
          <Search className="cursor-pointer" />
          <div
            onClick={() => navigate("/shop")}
            className="cursor-pointer"
          >
            <Badge count={data.length}>
              <ShoppingCart />
            </Badge>
          </div>
          

          <Bell className="hidden sm:block cursor-pointer" />

          <button
            onClick={() => {
              if (isAuth) {
                return navigate("/profile");
              }
              dispatch(setAuthorizationModalVisiblty());
            }}
            className="hidden md:block bg-main rounded-lg font-medium text-white p-[7px_25px] cursor-pointer"
          >
            {user ? user.name : "Login"}
          </button>


          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>


      <div
        className={`fixed top-0 left-0 h-full w-62.5 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 flex flex-col gap-6">
          <img
            src="https://green-shop-otabek.vercel.app/assets/logo-nyVMFuKc.svg"
            alt="Logo"
            className="w-32.5 mb-5"
          />
          <Link
            to={"/"}
            onClick={closeMenu}
            className={`${pathname === "/" && "text-main"} font-semibold text-lg`}
          >
            Home
          </Link>
          <Link
            to={"/blog"}
            onClick={closeMenu}
            className={`${pathname === "/blog" && "text-main"} font-semibold text-lg`}
          >
            Blog
          </Link>
          <button
            onClick={() => {
              closeMenu();
              if (isAuth) {
                return navigate("/profile");
              }
              dispatch(setAuthorizationModalVisiblty());
            }}
            className="bg-main rounded-lg font-medium text-white p-2.5 w-full cursor-pointer"
          >
            {user ? user.name : "Login"}
          </button>
        </div>
      </div>


      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        ></div>
      )}
    </div>
  );
};

export default Header;