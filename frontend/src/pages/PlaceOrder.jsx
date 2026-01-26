import React, { useContext, useState } from "react";
import { Title } from "../components/Title";
import { CartTotal } from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

export const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
 const {navigate,backendUrl, token, cartItems, setCartItems, getTotalAmount, delivery_fee, products} = useContext(ShopContext);


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Handle form submission logic here

  try {
    // Create an empty array to store final order items
    const orderItems = [];

    // Loop through each itemId in cartItems
    for (let itemId in cartItems) {

      // Get all sizes for the current item
      const sizes = cartItems[itemId];

      // Loop through each size for this item
      for (let size in sizes) {

        // Get quantity of the current item with this size
        const quantity = sizes[size];

        // Check if quantity is greater than 0
        if (quantity > 0) {

          // Find product details from products array using itemId
          const product = products.find(p => p._id === itemId);

          // Check if product exists
          if (product) {

            // Add product info, size, and quantity to orderItems array
            orderItems.push({
              ...product,     // copy all product details
              size: size,     // add selected size
              quantity: quantity // add item quantity
            });
          }
        }
      }
    }
    
    // Prepare order data to be sent to backend
    const orderData = {
      items: orderItems,
   
      address: JSON.stringify(formData),
      PaymentMethod: method,
      amount: getTotalAmount() + delivery_fee
    };

    //switching to respective payment method pages
    switch (method) {
      case "cod": {
        const response = await axios.post(
          backendUrl + "/api/order/place-order-cod",
          orderData,
          { headers: { authorization: token } }
        );

        if (response.data.success) {
          setCartItems({});
          navigate("/orders");
        } else {
          console.error("Order placement failed:", response.data.message);
          toast.error(response.data.message || "Order placement failed");
        }
        break;
      }

      case "stripe": {
        const stripeResponse = await axios.post(
          backendUrl + "/api/order/place-order-stripe",
          orderData,
          { headers: { authorization: token } }
        );

        if (stripeResponse.data.success && stripeResponse.data.url) {
          // redirecting to stripe checkout page
          window.location.replace(stripeResponse.data.url);
        } else {
          const message = stripeResponse.data?.message || "Order placement failed";
          toast.error("Order placement failed: " + message);
        }
        break;
      }
    }
  } catch (error) {
    console.error("Error processing order:", error);
    toast.error(error.response?.data?.message || error.message);  
  }

  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        {/* ---------------------left side----------------- */}
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={" DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            required
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          required
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          required
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            required
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zip Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={onChangeHandler}
            required
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          required  
        />
      </div>
      {/* ------------------------------Right Side----------------------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={" PAYMENT"} text2={"METHOD"} />
          {/* ---------------------Payment Method Selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}
              ></p>
              <img className="h-6 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}
              ></p>
              <img className="h-6 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}
              ></p>
              <p className="text-sm text-gray-500 mx-4 font-semibold">
                {" "}
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
            type="submit"
             
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
