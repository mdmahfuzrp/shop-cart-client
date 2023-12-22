import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { FaCheck } from "react-icons/fa";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  const [activeColor, setActiveColor] = useState("No color available");
  const [selectedSize, setSelectedSize] = useState("No Size Available");

  const handleChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: productInfo.id,
        name: productInfo.productName,
        quantity: 1,
        image: productInfo.img,
        badge: productInfo.badge,
        price: productInfo.price,
        color: activeColor,
        size: selectedSize,
      })
    );
  };

  useEffect(() => {
    // Check if productInfo has colors and update activeColor accordingly
    if (productInfo?.colors?.length > 0) {
      setActiveColor(productInfo.colors[0]);
    }

    if(productInfo?.sizes?.length > 0){
      setSelectedSize(productInfo.sizes[0])
    }
  }, [productInfo]);

  console.log(activeColor);
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
      <p className="text-xl font-semibold">${productInfo.price}</p>
      <p className="text-base text-gray-600">{productInfo.des}</p>
      <p className="text-sm">Be the first to leave a review.</p>
      <div className="flex items-center gap-7">
        <p className="font-medium text-lg flex items-center gap-4">
          <span className="font-normal bg-primeColor text-white px-[6px] rounded-[4px]">Colors:</span>
          <span className="flex items-center gap-[6px]">
            {productInfo?.colors?.length > 0 ? (
              productInfo?.colors.map((curColor, index) => {
                return (
                  <button
                    key={index}
                    style={{ background: curColor }}
                    onClick={() => setActiveColor(curColor)}
                    className={`w-[20px] h-[20px] flex items-center justify-center rounded-full duration-200 transition-all ${
                      activeColor === curColor ? "opacity-100" : "opacity-[.7]"
                    } hover:opacity-100`}
                  >
                    <FaCheck
                      className={`text-white text-[12px] duration-200 ${
                        activeColor === curColor ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>
                );
              })
            ) : (
              <span>Only one color</span>
            )}
          </span>
        </p>
        <p className="font-medium text-lg flex items-center gap-4">
          <span className="font-normal bg-primeColor text-white px-[6px] rounded-[4px]">Size:</span>
          <select
            id="sizeSelect"
            value={selectedSize}
            className="border pl-[2px] pr-[6px] cursor-pointer rounded-md bg-transparent outline-none"
            onChange={handleChange}
          >
            {productInfo?.sizes?.length > 0
              ? productInfo?.sizes.map((size) => (
                  <option key={size} value={size} className="px-3 cursor-pointer">
                    {size}
                  </option>
                ))
              : "No Size Available"}
          </select>
        </p>
      </div>
      <button
        onClick={handleAddToCart}
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Categories:</span> Spring
        collection, Streetwear, Women Tags: featured SKU: N/A
      </p>
    </div>
  );
};

export default ProductInfo;
