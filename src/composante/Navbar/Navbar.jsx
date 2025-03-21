import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingBag } from "react-icons/fa";
import logo from "../../image/favicon.png";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const userMenuRef = useRef(null);
  const categoriesRef = useRef(null);

  // ✅ Ferme les menus si on clique en dehors
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userMenuRef.current && !userMenuRef.current.contains(event.target)
      ) {
        setUserMenuOpen(false);
      }
      if (
        categoriesRef.current && !categoriesRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="font-bold flex items-center space-x-2">
        <img src={logo} className="w-10 h-10" alt="Logo" />
        <Link to="/home" className="text-black text-lg">
          <span className="text-[#FD4C2A] font-extrabold">Savory</span>Bites
        </Link>
      </div>

      {/* Menu */}
      <ul className="flex space-x-6 text-gray-700 font-medium">
        <li>
          <Link to="/home" className="relative px-4 py-2 text-black hover:text-[#FD4C2A]">Home</Link>
        </li>

        {/* Categories Dropdown */}
        <li className="relative" ref={categoriesRef}>
          <button
            className="relative px-4 text-black hover:text-[#FD4C2A] flex items-center"
            onClick={(e) => {
              e.stopPropagation(); // ✅ Évite la fermeture immédiate
              setDropdownOpen((prev) => !prev);
            }}
          >
            Categories <span className="ml-1">▼</span>
          </button>
          {dropdownOpen && (
            <ul
              className="absolute left-0 mt-2 w-40 bg-white border border-orange-400 shadow-lg rounded-md"
              onClick={(e) => e.stopPropagation()} // ✅ Garde le menu ouvert au clic
            >
              <li className="px-4 py-2 hover:bg-[#FD4C2A] hover:text-white rounded">
                <Link to="/category1">Category 1</Link>
              </li>
              <li className="px-4 py-2 hover:bg-[#FD4C2A] hover:text-white rounded">
                <Link to="/category2">Category 2</Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link to="/menu" className="relative px-4 py-2 text-black hover:text-[#FD4C2A]">Menu</Link>
        </li>
        <li>
          <Link to="/contact" className="relative px-4 py-2 text-black hover:text-[#FD4C2A]">Contact Us</Link>
        </li>
      </ul>

      {/* Icons */}
      <div className="flex items-center space-x-4 text-[#FD4C2A] relative">
        {/* 🔥 User Dropdown */}
        <div ref={userMenuRef} className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation(); // ✅ Évite la fermeture immédiate
              setUserMenuOpen((prev) => !prev);
            }}
            className="p-2 rounded-full bg-orange-200 hover:bg-orange-300 transition"
          >
            <FaUser className="text-xl cursor-pointer text-orange-700" />
          </button>
          {userMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-orange-400"
              onClick={(e) => e.stopPropagation()} // ✅ Garde le menu ouvert au clic
            >
              <div className="p-2">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-[#FD4C2A] hover:text-white rounded"
                >
                  Profile
                </Link>
                <Link
                  to="/account"
                  className="block px-4 py-2 text-gray-800 hover:bg-[#FD4C2A] hover:text-white rounded"
                >
                  Settings
                </Link>
                <Link
                  to="/"
                  className="block px-4 py-2 text-gray-800 hover:bg-[#FD4C2A] hover:text-white rounded"
                >
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 🔥 Shopping Cart Icon */}
        <Link to="/CartPage">
          <FaShoppingBag className="text-xl cursor-pointer text-orange-700 hover:text-orange-500 transition" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
