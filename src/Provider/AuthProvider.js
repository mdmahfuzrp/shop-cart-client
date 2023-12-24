import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("shopCartUserData"));
  // console.log('id:::', user._id);
  const token = localStorage.getItem("shopCartUserToken");

  const [cartItems, setCartItems] = useState([]);
  const [allProduct, setAllProduct] = useState([]);

  // Get All Product
  const getProductData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");

      if (response.status === 200) {
        setAllProduct(response?.data?.products);
      }
    } catch (error) {
      console.error("There was a problem fetching the data:", error);
    }
  };

  // Get User Cart Items
  const userCartItems = async () => {
    if (user) {
      const apiUrl = `http://localhost:5000/api/user/${user._id}/cart-items`;
      try {
        const response = await axios.get(apiUrl);
        setCartItems(response?.data?.cartItems);
      } catch (error) {
        console.error("Failed to fetch user cart items:", error);
      }
    }
  };
  
  useEffect(() => {
    getProductData();
  }, []);

  // Logout Function
  function logout() {
    localStorage.removeItem("shopCartUserData");
    localStorage.removeItem("shopCartUserToken");
    window.location.href = "/";
  }



  const userInfo = {
    user,
    token,
    allProduct,
    setGlobalLoading,
    globalLoading,
    logout,
    cartItems,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
