import React, { useState, useEffect, useContext } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { AuthContext } from "../../../Provider/AuthProvider";

const HeaderBottom = () => {
  const { allProduct } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

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
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
