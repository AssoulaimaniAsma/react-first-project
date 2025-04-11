// Navbar.js
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingBag } from "react-icons/fa";
import logo from "../../../image/favicon.png";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);
  const categoriesRef = useRef(null);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }

    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
        setActiveSubmenu(null);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const categories = [
    { name: "All", icon: "🍽️", path: "/Our_Menu?category=All" },
    { name: "Burger", icon: "🍔", path: "/Our_Menu?category=Burger" },
    { name: "Plate", icon: "🍛", path: "/Our_Menu?category=Plate" },
    { name: "Dessert", icon: "🍰", path: "/Our_Menu?category=Dessert" },
    { name: "Pasta", icon: "🍝", path: "/Our_Menu?category=Pasta" },
    {
      name: "Moroccan Food",
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg" alt="Maroc" className="w-6 h-6" />,
      path: "/Our_Menu?category=Moroccan Food",
    },
  ];

  const handleCategoryClick = (path) => {
    navigate(path);
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("Aucun token d'authentification trouvé.");
      setAlertMessage("Vous n'êtes pas connecté.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: authToken }), // Envoie le token dans le corps de la requête
      });

      if (response.ok) {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        navigate("/signin");
      } else {
        const errorMessage = await response.text();
        console.error("Erreur de déconnexion:", errorMessage);
        setAlertMessage(errorMessage || "Erreur lors de la déconnexion. Veuillez réessayer.");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
      }
    } catch (error) {
      console.error("Erreur lors de la requête de déconnexion:", error);
      setAlertMessage("Une erreur s'est produite lors de la déconnexion. Veuillez vérifier votre connexion.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      {showAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex items-center p-4 text-sm text-black rounded-lg bg-[#f0b9ae] dark:bg-gray-800 dark:text-blue-400" role="alert">
            <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Erreur de déconnexion!</span> {alertMessage}
            </div>
          </div>
        </div>
      )}

      <div className="font-bold flex items-center space-x-2">
        <img src={logo} className="w-10 h-10" alt="Logo" />
        <Link to="/" className="text-black text-lg">
          <span className="text-[#FD4C2A] font-extrabold">Savory</span>Bites
        </Link>
      </div>

      <ul className="flex space-x-6 text-gray-700 font-medium">
        <li>
          <Link to="/" className="relative px-4 py-2 text-black hover:text-[#FD4C2A]">Home</Link>
        </li>

        <li className="relative" ref={dropdownRef}>
          <button
            className="relative px-4 text-black hover:text-[#FD4C2A] flex items-center"
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen((prev) => !prev);
            }}
          >
            Categories
            <kbd className="inline-flex items-center px-1 py-1 text-[#FD4C2A]">
              <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 10">
                <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
              </svg>
              <span className="sr-only">Arrow key down</span>
            </kbd>
          </button>

          {dropdownOpen && (
            <ul
              className="absolute left-0 mt-2 w-48 bg-white border border-orange-400 shadow-lg rounded-md z-10"
              style={{ left: "-50px" }}
              onClick={(e) => e.stopPropagation()}
            >
              {categories.map((category, index) => (
                <li key={index} className="px-4 py-2 hover:bg-[#FD4C2A] hover:text-white rounded flex items-center gap-2">
                  <span>{category.icon}</span>
                  <button onClick={() => handleCategoryClick(category.path)} className="w-full text-left">
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li>
          <Link to="/Our_Menu" className="relative px-4 py-2 text-black hover:text-[#FD4C2A]">Menu
          </Link>
        </li>
        <li>
          <Link to="/contact" className="relative px-4 py-2 text-black hover:text-[#FD4C2A]">Contact Us</Link>
        </li>
      </ul>

      <div className="flex items-center space-x-4 text-[#FD4C2A] relative">
        <div ref={userMenuRef} className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setUserMenuOpen((prev) => !prev);
              setActiveSubmenu(null);
            }}
            className="p-2 rounded-full bg-orange-200 hover:bg-orange-300 transition"
          >
            <FaUser className="text-xl cursor-pointer text-orange-700" />
          </button>
          {userMenuOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-orange-400" style={{ left: '-120px' }}>
              <div className="p-2">
                {isAuthenticated ? (
                  <>
                    <Link to="/account" className="block px-4 py-2 hover:bg-[#FD4C2A] hover:text-white" onClick={() => setUserMenuOpen(false)}>Profile</Link>
                    <button onClick={handleLogout} className="block px-4 py-2 text-left hover:bg-[#FD4C2A] hover:text-white w-full">Logout</button>
                  </>
                ) : (
                  <>
                    <div className="relative group">
                      <button
                        className="flex justify-between items-center px-4 py-2 w-full text-left hover:bg-gray-100 hover:text-gray-900"
                      >
                        <span>Login as</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className="absolute left-0 mt-1 w-40 bg-white border border-gray-200 shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300" style={{ left: '-100px' }}>
                        <Link to="/signin" className="block px-4 py-2 hover:bg-gray-100 hover:text-gray-900" onClick={() => setUserMenuOpen(false)}>Client</Link>
                        <Link to="/SigninRestaurant" className="block px-4 py-2 hover:bg-gray-100 hover:text-gray-900" onClick={() => setUserMenuOpen(false)}>Restaurant</Link>
                      </div>
                    </div>

                    <div className="relative group">
                      <button
                        className="flex justify-between items-center px-4 py-2 w-full text-left hover:bg-gray-100 hover:text-gray-900"
                      >
                        <span>Register as</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className="absolute left-0 mt-1 w-40 bg-white border border-gray-200 shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300" style={{ left: '-100px' }}>
                        <Link to="/signup" className="block px-4 py-2 hover:bg-gray-100 hover:text-gray-900" onClick={() => setUserMenuOpen(false)}>Client</Link>
                        <Link to="/SignupRestaurant" className="block px-4 py-2 hover:bg-gray-100 hover:text-gray-900" onClick={() => setUserMenuOpen(false)}>Restaurant</Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        <Link to="/CartPage">
          <FaShoppingBag className="text-xl cursor-pointer text-orange-700 hover:text-orange-500 transition" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;