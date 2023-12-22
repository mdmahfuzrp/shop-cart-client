import React from "react";
import { MdOutlineDeleteForever  } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  deleteItem,
  drecreaseQuantity,
  increaseQuantity,
} from "../../redux/orebiSlice";
import { FaCheck } from "react-icons/fa";

const ItemCard = ({ item }) => {
  const dispatch = useDispatch();
  console.log("my item:", item);
  return (
    <div className="w-full grid grid-cols-7 mb-4 border py-2">
      <div className="flex col-span-7 mdl:col-span-2 items-center gap-4 ml-4">
        <MdOutlineDeleteForever 
          onClick={() => dispatch(deleteItem(item._id))}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
          size={27}
        />
        <img className="w-24 h-24 rounded-lg" src={item.image} alt="productImage"  />
        <h1 className="font-titleFont font-semibold">{item.name}</h1>
      </div>
      <div className="col-span-7 mdl:col-span-5 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="w-1/4 pl-3 flex items-center font-titleFont font-bold text-lg">
          <button
            className={`w-[20px] h-[20px] flex items-center justify-center rounded-full duration-200 transition-all cursor-auto border`}
            style={{backgroundColor: item.color}}
          >
            <FaCheck
              className={`text-white text-[12px] duration-200`}
            />
          </button>
        </div>
        <div className="flex w-1/4 pl-1 items-center text-lg font-semibold">
          {item.size}
        </div>
        <div className="w-1/4 flex items-center gap-6 text-lg">
          <span
            onClick={() => dispatch(drecreaseQuantity({ _id: item._id }))}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            -
          </span>
          <p>{item.quantity}</p>
          <span
            onClick={() => dispatch(increaseQuantity({ _id: item._id }))}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
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
