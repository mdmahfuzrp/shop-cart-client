import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("shopCartUserData"));
  // console.log('id:::', user._id);
  const token = localStorage.getItem("shopCartUserToken");
  const [allProduct, setAllProduct] = useState([]);

  // Get All Product
  const getProductData = async () => {
    try {
      const response = await axios.get("https://shopcart-server-five.vercel.app/api/products");

      if (response.status === 200) {
        setAllProduct(response?.data?.products);
      }
    } catch (error) {
      console.error("There was a problem fetching the data:", error);
    }
  };

  // Get User Cart Items
  const { data: respondData = {}, isLoading, isError, error } = useQuery(
    ["/api/user/:userId/cart-items"],
    async () => {
      try {
        const res = await fetch(
          `https://shopcart-server-five.vercel.app/api/user/${user._id}/cart-items`
        );
        // console.log(res);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      } catch (error) {
        console.log(error);
        throw new Error('Error fetching data');
      }
    },
    {
      refetchInterval: 1000,
      refetchOnMount: true,
    }
  );

  const cartItems = respondData.cartItems || [];
  
  if (isError) {
    console.error('Error fetching data:', error);
  }

  // Logout Function
  function logout() {
    localStorage.removeItem("shopCartUserData");
    localStorage.removeItem("shopCartUserToken");
    window.location.href = "/";
  }

  useEffect(() => {
    getProductData();
  }, []);

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
