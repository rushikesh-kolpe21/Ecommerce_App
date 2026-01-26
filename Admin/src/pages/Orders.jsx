import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";

export const Orders = ({ token }) => {
  const [ordersData, setOrdersData] = useState([]);

  // fetch orders (silent on failure)
  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const res = await axios.get(backendUrl + "/api/order/all-list", {
        headers: { token },
      });
      if (res.data?.success) setOrdersData(res.data.orders || []);
    } catch {
      /* silent */
    }
  };

  const handleStatusChange = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/update-status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if(response.data.success){
        await fetchAllOrders(); // refresh orders
      }
    } catch (error) {
      console.error("Error updating order status:", error);
        toast.e
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  // helper: normalize items to lines like "Product Name x 1 , M"
  const getProductLines = (items) => {
    const lines = [];

    // case 1: items is an array of { name, qty, size }
    if (Array.isArray(items)) {
      items.forEach((it) => {
        const name = it.name || it.title || it.itemName || "Product";
        const qty = it.qty ?? it.quantity ?? 1;
        const size = it.size || it.variant || "";
        lines.push(`${name} x ${qty}${size ? ` , ${size}` : ""}`);
      });
      return lines;
    }

    // case 2: items is an object like { itemName: { size: qty } }
    if (items && typeof items === "object") {
      Object.entries(items).forEach(([name, sizes]) => {
        // sizes might be { M: 1, L: 2 } or could be a single number
        if (typeof sizes === "object") {
          Object.entries(sizes).forEach(([size, qty]) => {
            lines.push(`${name} x ${qty}${size ? ` , ${size}` : ""}`);
          });
        } else {
          // sizes is a number (qty)
          lines.push(`${name} x ${sizes}`);
        }
      });
    }

    return lines;
  };

  

  return (
    <div className="px-6 py-6">
      {/* keep small title like image (optional) */}
      <h3 className="text-sm text-gray-600 mb-4">Order Page</h3>

      <div className="space-y-4">
        {ordersData.map((order, idx) => {
          // safe parse address (address might be stringified)
          const address = typeof order.address === "string" ? (() => {
            try { return JSON.parse(order.address); } catch { return {}; }
          })() : (order.address || {});

          const productLines = getProductLines(order.items);
          const totalItems = productLines.reduce((sum, line) => {
            const m = line.match(/x\s*(\d+)/);
            return sum + (m ? Number(m[1]) : 0);
          }, 0);

          const fullAddress = [
            address?.street,
            address?.city,
            address?.state,
            address?.country,
            address?.zipCode,
          ].filter(Boolean).join(", ");

          const displayDate = new Date(order.date || Date.now()).toLocaleDateString("en-US");

          return (
            <div
              key={idx}
              className="flex items-start gap-6 bg-white border border-gray-200 p-4 rounded"
            >
              {/* icon */}
              <div className="w-12 flex-shrink-0">
                <img src={assets.parcel_icon} alt="" className="w-10 h-10 object-contain" />
              </div>

              {/* Column 1: products, name, address, phone */}
              <div className="flex-1 text-sm text-gray-800">
                {productLines.map((line, i) => (
                  <p key={i} className="leading-5">
                    {line}
                  </p>
                ))}

                <p className="mt-3 font-semibold">
                  {address?.firstName || ""} {address?.lastName || ""}
                </p>
                <p className="mt-1 text-gray-600">{fullAddress}</p>
                <p className="mt-1 text-gray-600">{address?.phone || ""}</p>
              </div>

              {/* Column 2: Items / Method / Payment / Date */}
              <div className="w-48 text-sm text-gray-700">
                <p>Items : {totalItems}</p>
                <p>Method : {order.method || "COD"}</p>
                <p>Payment : {order.payment ? "Paid" : "Pending"}</p>
                <p>Date : {displayDate}</p>
              </div>

              {/* Column 3: Price */}
              <div className="w-28 text-sm font-semibold">
                <p>
                  {currency}
                  {order.amount}
                </p>
              </div>

              {/* Column 4: Status */}
              <div className="w-48">
                <select
                  value={order.status || "Order Placed"}
                  onChange={(e) => handleStatusChange(event, order._id)}
                  className="w-full border rounded px-2 py-1 text-sm bg-white"
                >
                  <option>Order Placed</option>
                  <option>Packing</option>
                  <option>Shipped</option>
                  <option>Out for delivery</option>
                  <option>Delivered</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
