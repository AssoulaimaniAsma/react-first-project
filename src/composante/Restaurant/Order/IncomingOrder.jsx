import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

export default function IncomingNotifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New order received: Burger Menu x2",
      status: "pending",
    },
    {
      id: 2,
      message: "Order #ORD002: Pizza Margherita",
      status: "pending",
    },
  ]);

  const handleAction = (id, action) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, status: action } : notif
      )
    );

    // Simule une API
    console.log(`Order ${id} has been ${action}`);
  };

  const handleDismiss = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl text-[#FD4C2A] font-bold mb-6">Incoming Order Notifications</h1>

      {notifications.length === 0 ? (
        <div className="text-gray-500 text-sm text-center mt-20">No new notifications.</div>
      ) : (
        notifications.map((notif) => (
          <div
            key={notif.id}
            className="bg-white flex p-4 m-4 gap-4 items-center justify-between rounded-2xl border border-[#FD4C2A] shadow-sm"
          >
            <div className="flex items-center gap-3">
              <FaBell className="text-[#FD4C2A] text-lg" />
              <div className=" text-sm font-medium">{notif.message}</div>
            </div>

            {notif.status === "pending" ? (
              <div className="flex gap-3">
                <button
                  onClick={() => handleAction(notif.id, "approved")}
                  className="px-3 py-1 text-sm text-white bg-green-500 hover:bg-green-600 rounded-full"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(notif.id, "rejected")}
                  className="px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded-full"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleDismiss(notif.id)}
                  className="text-[#FD4C2A] border border-blue-600 rounded-full w-5 h-5 text-xs flex items-center justify-center"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="flex gap-4 items-center">
                <span
                  className={`text-sm font-semibold capitalize ${
                    notif.status === "approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {notif.status}
                </span>
                <button
                  onClick={() => handleDismiss(notif.id)}
                  className="text-blue-600 border border-blue-600 rounded-full w-5 h-5 text-xs flex items-center justify-center"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
