import React, { useState, useEffect, useContext } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const HeaderBottom = () => {
  const { allProduct, token, user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (allProduct) {
      const filtered = allProduct.filter(
        (item) =>
          item.productName &&
          item.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, allProduct]);

  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = allProduct.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div className="flex h-14 cursor-pointer items-center gap-2 text-primeColor">
            <HiOutlineMenuAlt4 className="w-5 h-5" />
            <p className="text-[14px] font-normal">Shop by Category</p>
          </div>
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-black font-medium placeholder:font-normal bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              placeholder="Search your products here"
              value={searchQuery}
              onChange={handleSearch}
            />
            <FaSearch className="w-5 h-5" />
            {searchQuery && (
              <div
                className={`w-full mx-auto rounded-lg scrollbar-hide p-2 ${
                  filteredProducts.length > 0
                    ? "h-[300px]"
                    : "h-full flex items-center justify-center"
                } bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl cursor-pointer`}
              >
                {searchQuery && filteredProducts.length > 0
                  ? filteredProducts.map((item) => (
                      <div
                        onClick={() =>
                          navigate(
                            `/product/${item.productName
                              .toLowerCase()
                              .split(" ")
                              .join("")}`,
                            {
                              state: {
                                item: item,
                              },
                            }
                          ) &
                          setShowSearchBar(true) &
                          setSearchQuery("")
                        }
                        key={item._id}
                        className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                      >
                        <img
                          className="w-[100px] h-[80px] ml-2 rounded-lg p-1 border-2 border-primeColor object-cover"
                          src={item.img}
                          alt="productImg"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold text-lg">
                            {item.productName}
                          </p>
                          <p className="text-xs">{item.des}</p>
                          <p className="text-sm">
                            Price:{" "}
                            <span className="text-primeColor font-semibold">
                              ${item.price}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))
                  : "Product Not Available"}
              </div>
            )}
          </div>
          <div className="hidden lg:block">
            {token ? (
              <Link
                to="/profile"
                className="text-[16px] hover:shadow-lg font-medium bg-primeColor text-white py-1 rounded-[20px] px-3 flex items-center gap-1"
              >
                <FaUser size={14} /> {user?.fullName}
              </Link>
            ) : (
              <Link
                to="/signin"
                className="text-[16px] hover:shadow-lg font-medium bg-primeColor text-white py-1 rounded-md px-3"
              >
                Login
              </Link>
            )}
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
