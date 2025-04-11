import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUtensils, FaClipboardList, FaChartBar } from "react-icons/fa";
import logo from "../../../image/favicon.png";

const Navbar_Restaurant = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setAlertMessage("You are not connected!");
      setShowAlert(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: authToken }),
      });

      if (response.ok) {
        localStorage.removeItem("authToken");
        navigate("/restaurant/SigninRestaurant");
      } else {
        const errorMessage = await response.text();
        setAlertMessage(errorMessage);
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Logout error:", error);
      setAlertMessage("Erreur lors de la déconnexion");
      setShowAlert(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  

  const isLoggedIn = !!localStorage.getItem("authToken"); // Vérifier si l'utilisateur est connecté

  return (
    <>
      {showAlert && (
        <div className="fixed top-20 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {alertMessage}
        </div>
      )}

      <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex flex-col">
        <div className="flex items-center py-10 space-x-2 font-bold">
          <img src={logo} className="w-10 h-10" alt="Logo" />
          <Link to="/restaurant" className="text-black text-lg">
            <span className="text-[#FD4C2A] font-extrabold">Savory</span>Bites
          </Link>
        </div>

        <div className="h-full px-3 py-10 overflow-y-auto bg-white dark:bg-gray-800 flex-grow">
          <ul className="space-y-5 font-semibold">
            <li>
              <Link to="/restaurant/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                <FaHome className="text-xl" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/restaurant/menus" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                <FaUtensils className="text-xl" />
                <span className="ms-3">Menus</span>
              </Link>
            </li>
            <li>
              <Link to="/restaurant/commandes" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                <FaClipboardList className="text-xl" />
                <span className="ms-3">Commandes</span>
              </Link>
            </li>
            <li>
              <Link to="/restaurant/statistiques" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                <FaChartBar className="text-xl" />
                <span className="ms-3">Statistiques</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Profil et déconnexion */}
        <div className="mt-auto p-2 border-[#ca3c21] border- dark:border-neutral-700">
          {!isLoggedIn ? (
            <div className="space-y-2">
              <Link
                to="/restaurant/login"
                className="w-full inline-flex items-center gap-x-2 p-1 text-start font-semibold text-xl text-[#ca3c21] rounded-md hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              >
                Login
              </Link>
              <Link
                to="/restaurant/register"
                className="w-full inline-flex items-center gap-x-2 p-1 text-start font-semibold text-xl text-[#ca3c21] rounded-md hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
 onClick={() => {
    console.log('Profil clicked'); // Vérifie si ce log s'affiche dans la console
    setUserMenuOpen(!userMenuOpen);
    console.log("User Menu Open:", !userMenuOpen);
  }}                className="w-full inline-flex shrink-0 items-center gap-x-2 p-2 text-start text-sm text-gray-800 rounded-md hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              >
                <img
                  className="shrink-0 size-5 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="User Avatar"
                />
                Restaurant User
                <svg className="shrink-0 size-3.5 ms-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>
                </svg>
              </button>

              {userMenuOpen && (
  <div
    ref={userMenuRef}
    onClick={(e) => e.stopPropagation()}
    className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-md shadow-lg py-1 z-[9999] dark:bg-gray-700"
    style={{ border: "2px solid red", backgroundColor: "white" }}
  >
    <div className="px-4 py-2 border-b dark:border-gray-600">
      <p className="text-sm text-gray-700 dark:text-white">Restaurant User</p>
      <p className="text-xs text-gray-500 dark:text-gray-300">user@example.com</p>
    </div>
    <Link
      to="/restaurant/settings"
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
    >
      Paramètres
    </Link>
    <Link
      to="/restaurant/profil"
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
    >
      Profil
    </Link>
    <button
      onClick={handleLogout}
      className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-600"
    >
      Logout
    </button>
  </div>
)}



            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Navbar_Restaurant;
