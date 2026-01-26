import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Title} from '../components/Title';
import axios from 'axios';

export const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);

  const [ordersData, setOrdersData] = useState([]);

  const loadOrderData = async () => {
    try {
      
      if(!token){
        return null
      }
      const response = await axios.get(backendUrl + '/api/order/user-orders', {headers: {authorization: token}});
      console.log("Order response:", response.data);
      if(response.data.success){
        
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.PaymentMethod;
            allOrdersItem.push(item);
          })
      })
      console.log(allOrdersItem);
      setOrdersData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  }

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">

      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {
          ordersData.map((item, index) => (
            <div key={index} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] gap-4 items-center">
              <div className="flex items-start gap-6">
                <img  src={item?.image?.[0] || ''} alt="" className="w-16 sm:w-20 h-20 object-cover" />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{item.name}</p> 
                  <div className="flex items-center gap-5 mt-2">
                    <p className="text-xs sm:text-lg font-medium">{currency}{item.price}</p>
                      <p className="text-xs sm:text-lg font-medium">Quantity:{item.quantity}</p>
                    <p className="text-sm sm:text-lg font-medium"> Size:{item.sizes}</p>
                  </div>  
                  <p className='mt-1'>Date: <span className='text-gray-400'>  {new Date().toLocaleDateString()}</span></p>
                    <p className='mt-1'>Payment: <span className='text-gray-400'>  {item.paymentMethod}</span></p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  item.status === 'Order Placed' ? 'bg-blue-500' :
                  item.status === 'Packing' ? 'bg-yellow-500' :
                  item.status === 'Shipped' ? 'bg-purple-500' :
                  item.status === 'Out for delivery' ? 'bg-orange-500' :
                  item.status === 'Delivered' ? 'bg-green-500' :
                  'bg-gray-400'
                }`}></div>
                <p className="text-sm sm:text-base font-medium">{item.status}</p>
              </div> 
              <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-black hover:text-white transition-all duration-300 whitespace-nowrap">Track Order</button>

            </div>
          ))
        }
      </div>
    </div>
  )
}