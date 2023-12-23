import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("shopCartUserData"));
  const token = localStorage.getItem("shopCartUserToken");

  const [allProduct, setAllProduct] = useState([]);

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

  useEffect(() => {
    getProductData();
  }, []);

  const userInfo = {
    user,
    token,
    allProduct,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
