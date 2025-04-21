import React, { useState } from "react";
import { FaPlus, FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";

export default function Delivery() {
  const [deliveries, setDeliveries] = useState([]);
  const [newDelivery, setNewDelivery] = useState({ fullName: "", phone: "", imageFile: null });
  const [showModal, setShowModal] = useState(false);
  const [deliveryToDelete, setDeliveryToDelete] = useState(null);

  const handleAddDelivery = () => {
    if (!newDelivery.fullName || !newDelivery.phone || !newDelivery.imageFile) return;

    const imageURL = URL.createObjectURL(newDelivery.imageFile);

    const delivery = {
      id: Date.now(),
      fullName: newDelivery.fullName,
      phone: newDelivery.phone,
      image: imageURL,
      status: true,
    };

    setDeliveries((prev) => [...prev, delivery]);
    setNewDelivery({ fullName: "", phone: "", imageFile: null });
  };

  const handleDelete = (id) => {
    setDeliveryToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setDeliveries((prev) => prev.filter((d) => d.id !== deliveryToDelete));
    setDeliveryToDelete(null);
    setShowModal(false);
  };

  const toggleStatus = (id) => {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: !d.status } : d))
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl text-[#FD4C2A] font-bold mb-6">Courier List</h1>

      {/* Add Form */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <input
          type="text"
          placeholder="Full Name"
          value={newDelivery.fullName}
          onChange={(e) => setNewDelivery({ ...newDelivery, fullName: e.target.value })}
          className="border border-gray-300 rounded-full px-4 py-2 w-[180px] focus:border-[#FD4C2A] focus:outline-none focus:ring-1 focus:ring-[#FD4C2A]"
          />
        <input
          type="tel"
          placeholder="Phone Number"
          value={newDelivery.phone}
          onChange={(e) => setNewDelivery({ ...newDelivery, phone: e.target.value })}
          className="border border-gray-300 rounded-full px-4 py-2 w-[180px] focus:border-[#FD4C2A] focus:outline-none focus:ring-1 focus:ring-[#FD4C2A]"
        />
       <div className="flex items-center gap-2">
  <label
    htmlFor="fileInput"
    className="cursor-pointer bg-[#FD4C2A] text-white text-sm font-semibold px-3 py-2 ml-10 rounded-full dark:bg-blue-900 dark:text-blue-300"
  >
    Choose File
  </label>
  <input
    id="fileInput"
    type="file"
    accept="image/*"
    onChange={(e) =>
      setNewDelivery({ ...newDelivery, imageFile: e.target.files[0] })
    }
    className="hidden"
  />
  {newDelivery.imageFile && (
    <span className="text-sm text-gray-600">{newDelivery.imageFile.name}</span>
  )}
</div>

        <button
          onClick={handleAddDelivery}
          className="bg-[#FD4C2A] text-white px-4 py-2 ml-10 rounded-full flex items-center gap-2 hover:bg-[#e04626]"
        >
          <FaPlus /> Add
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl shadow">
        <table className="min-w-full text-left overflow-hidden">
          <thead className="bg-[#FD4C2A] text-white rounded-t-2xl">
            <tr>
              <th className="p-4 rounded-tl-2xl">Image</th>
              <th className="p-4">Full Name</th>
              <th className="p-4">Phone Number</th>
              <th className="p-4">Status</th>
              <th className="p-4 rounded-tr-2xl">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {deliveries.map((d) => (
              <tr key={d.id} className="border-b hover:bg-gray-50 transition-all">
                <td className="p-4">
                  <img
                    src={d.image}
                    alt={d.fullName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="p-4">{d.fullName}</td>
                <td className="p-4">{d.phone}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      d.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {d.status ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="p-10 flex gap-4 items-center">
                  <button onClick={() => toggleStatus(d.id)} className="text-blue-500 text-lg">
                    {d.status ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                  <button onClick={() => handleDelete(d.id)} className="text-red-500 text-lg">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {deliveries.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No delivery personnel added.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Delete Delivery Person?</h2>
            <p className="mb-6 text-sm">This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
