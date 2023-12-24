import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import { logo, logoLight } from "../../../assets/images";
import Image from "../../designLayouts/Image";
import { navBarList } from "../../../constants";
import Flex from "../../designLayouts/Flex";
import { FaCaretDown, FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const Header = () => {
  const { token, logout, cartItems } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);

  const [showUser, setShowUser] = useState(false);
  const [brand, setBrand] = useState(false);
  const location = useLocation();

  const handleLogOut = () => {
    logout();
  };

  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
  }, []);

  return (
    <div className="w-full h-20 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200">
      <Toaster toastOptions={{
        style: {
          boxShadow: '0 1px 0px #a5a1a161',
          borderBottom: "0px",
        }
      }} />
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <Flex className="flex items-center justify-between h-full">
          <Link to="/">
            <div className="font-bold text-[19px]">
              Shop<span className="text-[#DB4444]">Cart</span>
            </div>
          </Link>
          <div>
            {showMenu && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center w-auto z-50 p-0 gap-2"
              >
                <>
                  {navBarList.map(({ _id, title, link }) => (
                    <NavLink
                      key={_id}
                      className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#DB4444] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                      to={link}
                      state={{ data: location.pathname.split("/")[1] }}
                    >
                      <li>{title}</li>
                    </NavLink>
                  ))}
                  <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
                    <div
                      onClick={() => setShowUser(!showUser)}
                      className="flex"
                    >
                      <FaUser className="text-[#DB4444]" />
                      <FaCaretDown className="text-[#DB4444]" />
                    </div>
                    {showUser && (
                      <motion.ul
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="absolute top-6 right-[50px] cursor-default rounded-md z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
                      >
                        {token ? (
                          <>
                            <Link to="/profile">
                              <li className="text-[#d6d5d5] px-4 py-1 border-b-[1px] border-b-[#fff]  hover:text-white duration-300 cursor-pointer">
                                Profile
                              </li>
                            </Link>
                            <li
                              onClick={handleLogOut}
                              className="text-[#d6d5d5] px-4 py-1 hover:text-white duration-300 cursor-pointer"
                            >
                              Logout
                            </li>
                          </>
                        ) : (
                          <>
                            <Link to="/signin">
                              <li className="text-[#d6d5d5] px-4 py-1 border-b-[1px] border-b-[#fff]  hover:text-white duration-300 cursor-pointer">
                                Login
                              </li>
                            </Link>
                            <Link to="/signup">
                              <li className="text-[#d6d5d5] px-4 py-1 hover:text-white duration-300 cursor-pointer">
                                Registration
                              </li>
                            </Link>
                          </>
                        )}
                      </motion.ul>
                    )}

                    <Link to="/cart" className="">
                      <div className="relative">
                        <FaShoppingCart className="text-primeColor" />
                        <span className="absolute font-titleFont top-[-10px] left-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                          {cartItems.length > 0 ? cartItems.length : 0}
                        </span>
                      </div>
                    </Link>
                  </div>
                </>
              </motion.ul>
            )}
            <HiMenuAlt2
              onClick={() => setSidenav(!sidenav)}
              className="inline-block md:hidden cursor-pointer w-8 h-6 absolute top-6 right-4"
            />
            {sidenav && (
              <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-[80%] h-full relative"
                >
                  <div className="w-full h-full bg-primeColor p-6">
                    <img
                      className="w-28 mb-6"
                      src={logoLight}
                      alt="logoLight"
                    />
                    <ul className="text-gray-200 flex flex-col gap-2">
                      {navBarList.map((item) => (
                        <>
                          <li
                            className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                            key={item._id}
                          >
                            <NavLink
                              to={item.link}
                              state={{ data: location.pathname.split("/")[1] }}
                              onClick={() => setSidenav(false)}
                            >
                              {item.title}
                            </NavLink>
                          </li>
                        </>
                      ))}

                      <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
                        <div
                          onClick={() => setShowUser(!showUser)}
                          className="flex"
                        >
                          <FaUser />
                          <FaCaretDown />
                        </div>
                        {showUser && (
                          <motion.ul
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="absolute top-6 left-0 z-50 rounded-md bg-black w-44 h-auto p-4 pb-6"
                          >
                            {token ? (
                              <>
                                <Link to="/profile">
                                  <li className="text-[#d6d5d5] px-4 py-1 border-b-[1px] border-b-[#fff]  hover:text-white duration-300 cursor-pointer">
                                    Profile
                                  </li>
                                </Link>
                                <li
                                  onClick={handleLogOut}
                                  className="text-[#d6d5d5] px-4 py-1 hover:text-white duration-300 cursor-pointer"
                                >
                                  Logout
                                </li>
                              </>
                            ) : (
                              <>
                                <Link to="/signin">
                                  <li className="text-[#d6d5d5] px-4 py-1 border-b-[1px] border-b-[#fff]  hover:text-white duration-300 cursor-pointer">
                                    Login
                                  </li>
                                </Link>
                                <Link to="/signup">
                                  <li className="text-[#d6d5d5] px-4 py-1 hover:text-white duration-300 cursor-pointer">
                                    Registration
                                  </li>
                                </Link>
                              </>
                            )}
                          </motion.ul>
                        )}

                        <Link
                          to="/cart"
                          className="mt-[3px]"
                          onClick={() => setSidenav(false)}
                        >
                          <div className="relative">
                            <FaShoppingCart />
                            <span className="absolute font-titleFont top-[-10px] left-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-lightText text-white">
                              {cartItems.length > 0 ? cartItems.length : 0}
                            </span>
                          </div>
                        </Link>
                      </div>
                    </ul>
                  </div>

                  <span
                    onClick={() => setSidenav(false)}
                    className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                  >
                    <MdClose />
                  </span>
                </motion.div>
              </div>
            )}
          </div>
        </Flex>
      </nav>
    </div>
  );
};

export default Header;
