import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingBag } from "react-icons/fa";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-[#FD4C2A] text-2xl font-bold"> 
        <Link to="/">LOGO</Link>
      </div>

      {/* Menu */}
      <ul className="flex space-x-6 text-gray-700">
        <li>
          <Link to="/" className="hover:text-[#FD4C2A]">Home</Link>
        </li>
        <li className="relative">
          <button
            className="hover:text-[#FD4C2A] flex items-center"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Categories <span className="ml-1">▼</span>
          </button>
          {dropdownOpen && (
            <ul className="absolute left-0 mt-2 w-40 bg-white border shadow-lg">
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link to="/category1">Category 1</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link to="/category2">Category 2</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/menu" className="hover:text-[#FD4C2A]">Menu</Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-[#FD4C2A]">Contact Us</Link>
        </li>
      </ul>

      {/* Icons */}
      <div className="flex items-center space-x-4 text-[#FD4C2A]">
        <FaUser className="text-xl cursor-pointer" />
        <FaShoppingBag className="text-xl cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;