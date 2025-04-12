import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash, FaInfoCircle, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Menu_Restaurant() {
  const [foodItems, setFoodItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Nombre d'éléments par page

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log(token); // Vérifie le token ici
    if (token) {
      // Si le token existe, faire la requête.
      axios.get('http://localhost:8080/restaurant/foodItem/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFoodItems(res.data);
      })
      .catch((err) => {
        console.error("Erreur lors du fetch des données:", err);
      });
    }
  }, []);

  // Calculer les éléments à afficher en fonction de la page actuelle
  const filteredItems = foodItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Changer la page active
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculer le nombre total de pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="flex justify-between items-center mt-10">
              {/* Search */}
              <div className="relative text-[#FD4C2A] focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                  <FaSearch className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-64 h-9 pl-8 pr-3 text-sm bg-white border border-[#FD4C2A] rounded-full placeholder-[#FD4C2A] focus:outline-none focus:ring-1 focus:ring-gray-300"
                  placeholder="Search food"
                />
              </div>

              {/* Add button */}
              <Link to="/restaurant/addfood">
                <button className="group flex items-center gap-2 p-2 text-sm font-medium text-white bg-[#FD4C2A] hover:bg-[#FD4C2A] rounded-full transition-all duration-300 hover:px-4">
                  <FaPlus className="text-lg" />
                  <span className="opacity-0 w-0 overflow-hidden group-hover:opacity-100 group-hover:w-auto transition-all duration-300 whitespace-nowrap">
                    Add item
                  </span>
                </button>
              </Link>
            </div>

            {/* Table */}
            <div className="overflow-hidden mt-10">
              <table className="min-w-full rounded-xl">
                <thead>
                  <tr className="bg-[#FD4C2A]">
                    <th className="p-5 text-left text-white text-sm font-semibold rounded-tl-lg">Image</th>
                    <th className="p-5 text-left text-white text-sm font-semibold">Title</th>
                    <th className="p-5 text-left text-white text-sm font-semibold">Price</th>
                    <th className="p-5 text-left text-white text-sm font-semibold">Category</th>
                    <th className="p-5 text-left text-white text-sm font-semibold rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 border">
                  {currentItems.map((item) => (
                    <tr key={item.id} className="bg-white hover:bg-gray-50 transition-all">
                      {/* Image */}
                      <td className="p-5">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 rounded-full object-cover"
                          onError={(e) => { e.target.src = "/fallback.png" }} // optional fallback image
                        />
                      </td>
                      {/* Title */}
                      <td className="p-5 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {item.title}
                      </td>
                      {/* Price */}
                      <td className="p-5 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {item.price} DA
                      </td>
                      {/* Category */}
                      <td className="p-5 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {item.categoryList.map((cat) => (
                          <span key={cat.id}>
                            {cat.title}
                          </span>
                        ))}
                      </td>
                      {/* Actions */}
                      <td className="p-5">
                        <div className="flex gap-4">
                          <button className="text-blue-500 hover:text-blue-700 flex items-center gap-1">
                            <FaEdit /> Edit
                          </button>
                          <button className="text-red-500 hover:text-red-700 flex items-center gap-1">
                            <FaTrash /> Delete
                          </button>
                          <button className="text-green-500 hover:text-green-700 flex items-center gap-1">
                            <FaInfoCircle /> Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {currentItems.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-5 text-center text-gray-500">
                        No food items found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-5">
              <ul className="flex gap-3">
                {pageNumbers.map((number) => (
                  <li key={number}>
                    <button
                      onClick={() => paginate(number)}
                      className={`px-3 py-1 rounded-lg ${
                        currentPage === number
                          ? 'bg-[#FD4C2A] text-white'
                          : 'bg-gray-200 text-gray-700'
                      } hover:bg-[#FD4C2A] hover:text-white`}
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
