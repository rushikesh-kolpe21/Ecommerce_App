import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size, quantity: 1 },
          { headers: { authorization: token } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size];
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { authorization: token } }
        );
      } catch (error) {
        console.error("Error updating cart:", error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const productData = products.find((prod) => prod._id === itemId);
      if (!productData) continue;
      for (const size in cartItems[itemId]) {
        totalAmount += productData.price * cartItems[itemId][size];
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      setLoading(true);
      if (!backendUrl) {
        console.warn("Backend URL is not configured");
        setLoading(false);
        return;
      }
      const response = await axios.get(`${backendUrl}/api/products/list`);
      if (response.data?.success) {
        setProducts(response.data.productsList || []);
        console.log("Products loaded successfully:", response.data.productsList);
      } else {
        console.error("Failed to fetch products :", response.data?.message);
        toast.error(response.data?.message || "Failed to fetch products data");
      }
    } catch (error) {
      console.error("Error fetching products data:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch products data");
    } finally {
      setLoading(false);
    }
  };

  const getUserCart = async (authToken) => {
    try {
      const tokenToUse = authToken || token;
      console.log("Getting cart with token:", tokenToUse ? "Token exists" : "No token");
      
      if (!tokenToUse) {
        console.log("No token available, skipping cart fetch");
        return;
      }
    
      const response = await axios.get(backendUrl + "/api/cart/get", {
        headers: { authorization: tokenToUse },
      });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to fetch cart data");
    }
  };

  useEffect(() => {
    if (backendUrl) {
      getProductsData();
    }
  }, [backendUrl]);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  // Fetch cart when token is available
  useEffect(() => {
    if (token && backendUrl) {
      getUserCart(token);
    }
  }, [token, backendUrl]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getTotalAmount,
    navigate,
    backendUrl,
    loading,
    token,
    setToken,
    
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};