import React from "react";

export default function HomeRestaurant() {
  return (
    <>
      
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Bienvenue dans votre espace restaurant 🍽️</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow rounded-2xl p-4">
            <h2 className="text-xl font-semibold mb-2">Commandes aujourd'hui</h2>
            <p className="text-2xl text-green-500">12</p>
          </div>
          <div className="bg-white shadow rounded-2xl p-4">
            <h2 className="text-xl font-semibold mb-2">Plats disponibles</h2>
            <p className="text-2xl text-blue-500">8</p>
          </div>
          <div className="bg-white shadow rounded-2xl p-4">
            <h2 className="text-xl font-semibold mb-2">Total ventes</h2>
            <p className="text-2xl text-purple-500">320 MAD</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <button className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition">
            Ajouter un nouveau plat
          </button>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition">
            Voir les commandes
          </button>
          <button className="bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600 transition">
            Modifier le menu
          </button>
        </div>
      </div>
    </>
  );
}
