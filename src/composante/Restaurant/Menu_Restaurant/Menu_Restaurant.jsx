import React from "react";
import { FaEdit, FaPlus,FaTrash, FaInfoCircle,FaSearch  } from "react-icons/fa"; // FontAwesome Icons
import { Link } from "react-router-dom";

export default function Menu_Restaurant() {
  return (
    <>
      
      <div class="flex flex-col">
      <div class=" overflow-x-auto">
        <div class="min-w-full inline-block align-middle">
        <div className="flex justify-between items-center mt-10">
  {/* Champ de recherche */}
  <div className="relative text-gray-400 focus-within:text-gray-600">
    <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
      <FaSearch className="w-4 h-4" />
    </div>
    <input
      type="text"
      className="block w-64 h-9 pl-8 pr-3 text-sm bg-white border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
      placeholder="Search for company"
    />
  </div>
  <Link to="/restaurant/addfood">
  <button className="group flex items-center gap-2 p-2 text-sm font-medium text-white bg-[#FD4C2A] hover:bg-[#FD4C2A] rounded-full transition-all duration-300 hover:px-4">
  <FaPlus className="text-lg" />
    <span className="opacity-0 w-0 overflow-hidden group-hover:opacity-100 group-hover:w-auto transition-all duration-300 whitespace-nowrap">
        Add item
    </span>
</button>
</Link>
</div>
<div className="overflow-hidden mt-10 ">
                <table className=" min-w-full rounded-xl ">
                <thead>
    <tr className="bg-[#FD4C2A]">
        <th scope="col" className="p-5 text-left text-white text-sm leading-6 font-semibold text-gray-900 capitalize rounded-tl-lg">Company</th>
        <th scope="col" className="p-5 text-left text-white text-sm leading-6 font-semibold text-gray-900 capitalize">User ID</th>
        <th scope="col" className="p-5 text-left text-white text-sm leading-6 font-semibold text-gray-900 capitalize">Type</th>
        <th scope="col" className="p-5 text-left text-white text-sm leading-6 font-semibold text-gray-900 capitalize">Industry Type</th>
        <th scope="col" className="p-5 text-left text-white text-sm leading-6 font-semibold text-gray-900 capitalize rounded-tr-lg">Actions</th>
    </tr>
</thead>
                    <tbody className="divide-y divide-gray-300 border ">
                        <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 "> Louis Vuitton</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> 20010510 </td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> Customer</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> Accessories</td>
                            <td className=" p-5 ">
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
                        <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 "> Apple</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> 20010511 </td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> Partner</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> Electronics</td>
                            <td className=" p-5 ">
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
                        <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 "> Johnson</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> 20010512 </td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> Customer</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> Telecommunications</td>
                            <td className=" p-5 ">
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
                        <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 "> Starbucks</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> 20010513 </td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> Reseller</td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> Retail</td>
                            <td className=" p-5 ">
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
                    </tbody>
                </table>
            </div>
        </div>
      </div>
      </div>
    </>
  );
}
