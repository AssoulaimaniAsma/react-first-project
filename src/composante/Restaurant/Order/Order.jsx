import React, { useState, useEffect } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      items: ["Pizza Margherita", "Salade César"],
      status: "preparing",
      price: 120,
    },
    {
      id: "ORD002",
      items: ["Burger", "Frites", "Coca-Cola"],
      status: "confirmed",
      price: 90,
    },
  ]);

  const statuses = [
    "confirmed",
    "rejected",
    "preparing",
    "delivered",
    "completed",
    "canceled",
  ];

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl text-[#FD4C2A] font-bold mb-6">Incoming Orders</h1>
      <div className="overflow-x-auto shadow rounded-2xl">
        <table className="min-w-full text-left">
          <thead className="bg-[#FD4C2A] text-white">
            <tr>
              <th className="p-4">No Order</th>
              <th className="p-4">Items</th>
              <th className="p-4">Status</th>
              <th className="p-4">Price Paid</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50 transition-all">
                <td className="p-4 font-medium text-gray-900">{order.id}</td>
                <td className="p-4 text-sm text-gray-700">
                  {order.items.map((item, i) => (
                    <div key={i}>• {item}</div>
                  ))}
                </td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#FD4C2A]"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-4 font-semibold text-gray-900">{order.price} Dh</td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No incoming orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
