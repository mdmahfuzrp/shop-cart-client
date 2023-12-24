import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { FaCheck } from "react-icons/fa";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductInfo = ({ productInfo }) => {
  const {token, user} = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeColor, setActiveColor] = useState("#000000");
  const [selectedSize, setSelectedSize] = useState("M");

  const handleChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleAddToCart = () => {
    if (token) {
      const addToCartData = {
        useremail: user.email,
        productName: productInfo.productName,
        quantity: 1,
        img: productInfo.img,
        badge: productInfo.badge,
        price: productInfo.price,
        color: activeColor,
        size: selectedSize,
      };

      console.log(addToCartData);

      const apiUrl = "http://localhost:5000/api/add-to-cart";

      axios
        .post(apiUrl, addToCartData)
        .then((response) => {
          console.log(response);
          toast.success(response.data.message);

          dispatch(
            addToCart({
              _id: productInfo._id,
              name: productInfo.productName,
              quantity: 1,
              img: productInfo.img,
              badge: productInfo.badge,
              price: productInfo.price,
              color: productInfo.colors[0],
              size: productInfo.sizes[0],
            })
          );
        })
        .catch((error) => {
          console.error("Failed to add item to cart:", error);
          toast.success(error.response.data.message);
        });
    } else {
      navigate("/signin");
    }
  };

  useEffect(() => {
    // Check if productInfo has colors and update activeColor accordingly
    if (productInfo?.colors?.length > 0) {
      setActiveColor(productInfo.colors[0]);
    }

    if (productInfo?.sizes?.length > 0) {
      setSelectedSize(productInfo.sizes[0]);
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
          <span className="font-normal bg-primeColor text-white px-[6px] rounded-[4px]">
            Colors:
          </span>
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
          <span className="font-normal bg-primeColor text-white px-[6px] rounded-[4px]">
            Size:
          </span>
          <select
            id="sizeSelect"
            value={selectedSize}
            className="border pl-[2px] pr-[6px] cursor-pointer rounded-md bg-transparent outline-none"
            onChange={handleChange}
          >
            {productInfo?.sizes?.length > 0
              ? productInfo?.sizes.map((size) => (
                  <option
                    key={size}
                    value={size}
                    className="px-3 cursor-pointer"
                  >
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
