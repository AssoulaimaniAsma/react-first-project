/*import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import axios from "axios";
import { ChevronDown, ChevronRight } from "lucide-react";
const itemsPerPage = 6; // Nombre d'items par page


const categories = [
  { name: "Lorem ipsum", count: 3 },
  { name: "Dolor sit amet", count: 5 },
  { name: "Consectetur", count: 2 },
  { name: "Adipiscing elit", count: 4 },
  { name: "Sed do eiusmod", count: 6 }
];
const Menu = () => {
  const [products, setProducts] = useState([]); // Stocker les produits
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Récupérer les données depuis le backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erreur de récupération des produits :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Gestion de la pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProducts = products.slice(startIndex, startIndex + itemsPerPage);
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-red-500">Our Menu</h2>
      <div className="w-64 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold text-red-500 flex items-center gap-2">
        <span className="border-l-4 border-red-500 pl-2">Categories</span>
      </h2>
      <ul className="mt-4">
        {categories.map((category, index) => (
          <li key={index} className="border-b last:border-b-0">
            <button
              className="w-full flex justify-between items-center py-2 text-gray-700 hover:text-red-500"
              onClick={() => toggleCategory(index)}
            >
              {category.name} ({category.count})
              {openCategory === index ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
            {openCategory === index && (
              <ul className="pl-4 text-gray-500 text-sm">
                <li>Sub-item 1</li>
                <li>Sub-item 2</li>
                <li>Sub-item 3</li>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
      {loading ? (
        <p className="text-center">Chargement en cours...</p>
      ) : (
        <>
    
          <div className="flex flex-wrap gap-6 justify-center mt-4">
            {selectedProducts.map((product) => (
              <ItemCard key={product.id} {...product} />
            ))}
          </div>


          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Précédent
            </button>

            <span className="px-4 py-2 border rounded">{currentPage} / {totalPages}</span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;
*/
/*import { useEffect, useState } from "react";
import axios from "axios";

const Our_Menu = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Erreur :", error));
  }, []);

  // Liste des catégories (si elles ne sont pas dans le backend, on peut les définir ici)
  const categories = ["All", "Burger", "Dessert", "Moroccan Food", "Pasta"];

  // Filtrer les produits en fonction du terme recherché et de la catégorie
  const filteredProducts = products.filter(product =>
    (selectedCategory === "All" || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-orange-500">Our Menu</h1>

      {/* Barre de recherche *
      <input
        type="text"
        placeholder="Search an item..."
        className="border-2 border-orange-500 p-2 rounded-md w-full my-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filtres par catégorie *
      <div className="flex gap-2 my-4">
        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded-md border ${
              selectedCategory === category ? "bg-orange-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Affichage des plats filtrés *
      <div className="grid grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="border p-4 rounded-md shadow-md">
<img 
   src={`http://localhost:5000${product.image}`} 
   alt={product.name} 
   className="w-full h-auto max-h-64 object-contain rounded-md"
/>            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-600"><del>${product.oldPrice}</del> <span className="text-red-500 font-bold">${product.newPrice}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Our_Menu;
*/
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import axios from "axios";

const popularFilters = [
  { name: "All", icon: "🍽️" },
  { name: "Burger", icon: "🍔" },
  { name: "Plate", icon: "🍛" },
  { name: "Dessert", icon: "🍰" },
  { name: "Pasta", icon: "🍝" },
  { name: "Moroccan Food", icon: <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg" alt="Maroc" className="w-6 h-6" /> }
];

const moreFilters = ["American", "Asian", "Bakery & Pastry", "Shawarma"];

export default function Our_Menu() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openMoreFilters, setOpenMoreFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    axios.get("http://localhost:5001/api/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Erreur :", error));
  }, []);

  // Vérifier si la catégorie sélectionnée est bien une des catégories du backend
  const validCategories = ["All", ...popularFilters.map(filter => filter.name)];
  
  // Filtrage des produits par catégorie et recherche
  const filteredProducts = products.filter(product =>
    (selectedCategory === "All" || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalItems = filteredProducts.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
  const currentItems = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="mx-auto p-5">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-3 md:gap-1">
        
        {/* Categories Section */}
        <div className="md:w-2/3">
          <div className="ml-10 mt-20 border border-gray-200 rounded-lg p-4 w-full max-w-xs">
            <h2 className="text-xl font-bold mb-3">
              <span className="text-[#FD4C2A] font-extrabold">|</span> Categories
            </h2>
            <ul className="space-y-2">
              {popularFilters.map((filter, index) => (
                <li key={index}>
                  <button
                    className={`w-full flex items-center gap-3 p-2 rounded-lg ${
                      selectedCategory === filter.name ? "bg-yellow-100 text-yellow-700 font-semibold" : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedCategory(filter.name)}
                  >
                    <span className="text-xl">{filter.icon}</span> {filter.name}
                  </button>
                </li>
              ))}
            </ul>
            
            {/* More Filters */}
            <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Plus de filtres</h2>
            <button
              className="w-full flex justify-between items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setOpenMoreFilters(!openMoreFilters)}
            >
              Plus de filtres
              {openMoreFilters ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
            {openMoreFilters && (
              <ul className="mt-2 space-y-2 pl-4 text-gray-700 text-sm">
                {moreFilters.map((filter, index) => (
                  <li key={index}>
                    <button
                      className={`w-full text-left ${
                        selectedCategory === filter ? "font-bold text-orange-600" : ""
                      }`}
                      onClick={() => setSelectedCategory(filter)}
                    >
                      {filter}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Menu Section */}
        <div className="md:pl-2">
          <h2 className="mt-16 text-xl md:text-4xl font-bold mb-7">Our Menu</h2>

          {/* Search Bar */}
          <div className="relative mb-6 w-full">
            <input
              type="text"
              placeholder="Search An Item"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-500 focus:border-orange-500 rounded-full py-2 pl-4 pr-12 outline-none"
            />
            <button className="absolute right-0 top-0 h-full px-3 hover:text-orange-600">
              <FiSearch className="text-xl" />
            </button>
          </div>

          <p className="font-bold text-gray-600 mb-4">
            Showing {startIndex + 1}–{endIndex} of {totalItems} item(s)
          </p>
          <p className="text-gray-700 mb-6">
            Explore our selection of delicious dishes made with fresh, high-quality ingredients.😋 Whether you're looking for a quick bite or a gourmet feast, our menu has something to satisfy every craving.
          </p>

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {currentItems.map(item => (
              <div key={item.id} className="relative border border-gray-200 rounded-lg p-4">
                {item.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {item.discount}
                  </div>
                )}
                <img 
                  src={`http://localhost:5000${item.image}`} 
                  alt={item.name} 
                  className="h-40 w-full object-cover rounded-lg mb-3"
                />
                <div className="mt-2">
                  <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-500 line-through">${item.oldPrice.toFixed(2)}</span>
                    <span className="text-lg font-bold text-red-500">${item.newPrice.toFixed(2)}</span>
                  </div>
                </div>
                <button className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <FaPlus className="text-sm" />
                  <span>Ajouter</span>
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
            >
              Précédent
            </button>
            <button
              disabled={endIndex >= totalItems}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:opacity-50"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
