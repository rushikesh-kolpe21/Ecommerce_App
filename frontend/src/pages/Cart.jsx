import React, { use, useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { Title } from "../components/Title";
import { assets } from "../assets/assets";
import { CartTotal } from "../components/CartTotal";

export const Cart = () => {
  const { products, currency, cartItems,updateQuantity, navigate } = useContext(ShopContext);

  const [cartProductDetails, setCartProductDetails] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }
    setCartProductDetails(tempData);
  }, [cartItems]);
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR "} text2={"CART"} />
      </div>
      {/*  */}
      <div>
        {cartProductDetails.map((item, index) => {
          const productData = products.find((prod) => prod._id === item._id);
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] gap-4 items-center"
            >
              <div className="flex items-start gap-6">
                <img
                  src={productData?.image?.[0] || ''}
                  alt=""
                  className="w-16 sm:w-20 h-20 object-cover"
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="text-xs sm:text-lg font-medium">
                      {currency}{productData.price}
                    </p>
                    <p className="text-sm sm:text-lg font-medium">
                      {item.size}
                    </p>
                  </div>
                </div>

                
              </div>
              <input
                  onChange={(event) =>
                    updateQuantity(
                      event.target.value ==='' || event.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(event.target.value))
                    )
                  }
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                />
                <img onClick={()=>updateQuantity(item._id, item.size, 0)} className="w-4 h-4 cursor-pointer" src={assets.bin_icon} alt="" />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end"> 
            <button onClick={(event)=>navigate("/place-order")} className="bg-black text-white text-sm my-8 px-8 py-3">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};
