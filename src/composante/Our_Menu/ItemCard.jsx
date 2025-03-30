import React from "react";

const ItemCard = ({ image, name, oldPrice, newPrice, discount }) => {
  return (
    <div className="bg-gray-200 rounded-lg p-4 shadow-md relative w-64">
      {/* Badge de réduction */}
      {discount && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          -{discount}%
        </span>
      )}

      {/* Image du produit */}
      <img src={`http://localhost:5000${image}`} alt={name} className="w-full h-40 object-cover rounded-md" />

      {/* Nom du produit */}
      <h3 className="text-lg font-semibold mt-2">{name}</h3>

      {/* Prix */}
      <div className="flex items-center space-x-2">
        <span className="text-gray-500 line-through">${oldPrice}</span>
        <span className="text-black font-bold">${newPrice}</span>
      </div>

      {/* Bouton d'ajout */}
      <button className="mt-2 w-full flex justify-center items-center border-2 border-red-500 text-red-500 py-1 rounded hover:bg-red-500 hover:text-white transition">
        +
      </button>
    </div>
  );
};

export default ItemCard;
