import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Product = (props) => {
  const { token, user } = useContext(AuthContext);
  console.log("product props:", props);
  console.log(props.img);
  const dispatch = useDispatch();
  const _id = props.productName;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const navigate = useNavigate();
  const productItem = props;
  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };
  const handleAddToCart = () => {
    if (token) {
      const addToCartData = {
        useremail: user.email,
        productName: props.productName,
        quantity: 1,
        img: props.img,
        badge: props.badge,
        price: props.price,
        color: props.colors[0],
        size: props.sizes[0],
      };

      console.log(addToCartData);

      const apiUrl = "https://shopcart-server-five.vercel.app/api/add-to-cart";

      axios
        .post(apiUrl, addToCartData)
        .then((response) => {
          console.log(response);
          toast.success(response.data.message);

          dispatch(
            addToCart({
              _id: props._id,
              name: props.productName,
              quantity: 1,
              img: props.img,
              badge: props.badge,
              price: props.price,
              color: props.colors[0],
              size: props.sizes[0],
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
  return (
    <div className="w-full relative group">
      <Toaster toastOptions={
        {
          style: {
            boxShadow: '0 1px 0px #a5a1a161',
            borderBottom: "0px",
          },
        }
      }/>
      <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
        <div>
          <img className="w-full h-[300px] object-cover" src={props.img} alt="a" />
        </div>
        <div className="absolute top-6 left-8">
          {props.badge && <Badge text="New" />}
        </div>
        <div className="w-full h-20 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li
              onClick={handleAddToCart}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              View Details
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {props.productName}
          </h2>
          <p className="text-[#767676] text-[14px]">${props.price}</p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]"></p>
        </div>
      </div>
    </div>
  );
};

export default Product;
