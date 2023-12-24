import React from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ItemCard = ({ item }) => {
  console.log("my item:", item);

  const handleDeleteCartItem = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/cart/${item?._id}`
      );
      // console.log("Item removed from cart:", response);
      if(response.status === 200){
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };
  return (
    <div className="w-full grid grid-cols-7 mb-4 border py-2">
      <Toaster toastOptions={{
        style: {
          boxShadow: '0 1px 0px #a5a1a161',
          borderBottom: "0px",
        }
      }} />
      <div className="flex col-span-7 mdl:col-span-2 items-center gap-4 ml-4">
        <MdOutlineDeleteForever
          onClick={handleDeleteCartItem}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
          size={27}
        />
        <img
          className="w-24 h-24 rounded-lg object-cover border-[3px] p-1 bg-gray-300 border-primeColor"
          src={item.img}
          alt="productImage"
        />
        <h1 className="font-titleFont font-semibold">{item.productName}</h1>
      </div>
      <div className="col-span-7 mdl:col-span-5 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="w-1/4 pl-3 flex items-center font-titleFont font-bold text-lg">
          <button
            className={`w-[20px] h-[20px] flex items-center justify-center rounded-full duration-200 transition-all cursor-auto border`}
            style={{ backgroundColor: item.color }}
          >
            <FaCheck className={`text-white text-[12px] duration-200`} />
          </button>
        </div>
        <div className="flex w-1/4 pl-1 items-center text-lg font-semibold">
          {item.size}
        </div>
        <div className="w-1/4 flex items-center gap-6 text-lg">
          <span className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300">
            -
          </span>
          <p>{item.quantity}</p>
          <span className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300">
            +
          </span>
        </div>
        <div className="flex w-1/4 items-center text-lg font-semibold">
          ${item.price}
        </div>
        <div className="w-1/4 flex items-center font-titleFont font-bold text-lg">
          <p>${item.quantity * item.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
