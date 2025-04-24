import React, { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaClipboardList,
  FaFileAlt,
  FaUserFriends,
  FaUtensils,
  FaUserCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./SideBar.css";
import { RiRestaurant2Line } from "react-icons/ri";

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
      });

      if (res.ok){ 
        navigate("/admin/signin");}
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  // Fermer le menu profil si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <div className="sidebar">
        <div className="flex items-center py-20 font-bold">
          <img src="/image/SmallWhiteLogoNoBg.png" className="logo" alt="Logo" />
          <Link to="/restaurant" className="text-black text-4xl">
            <span className="text-[#FD4C2A] font-extrabold">Savory</span><span className="text-[#FFFFFF]">Bites</span>
          </Link>
        </div>

        <div className="sidebar-lines">
          <Link to="/admin/TabOrders" className="sidebar-line">
            <FaClipboardList className="icon" /> Orders
          </Link>
          <Link to="/admin/TabOrdersDetails" className="sidebar-line">
            <FaFileAlt className="icon" /> Orders Details
          </Link>
          <Link to="/admin/Tabclient" className="sidebar-line">
            <FaUserFriends className="icon" /> Client
          </Link>
          <Link to="/admin/TabRestaurant" className="sidebar-line">
            <FaUtensils className="icon" /> Restaurant
          </Link>
          <Link to="/admin/Food" className="sidebar-line">
            <RiRestaurant2Line className="icon" /> Food
          </Link>
        </div>


          <div ref={menuRef} className="profile" >
            <div
              className="profile-icon"
              onClick={toggleMenu}
            >
              <FaUserCircle size={50} color="#ccc" />
            </div>

            {menuOpen && (
              <div
                className="dropdown-menu"
              >
                <button
                  className="LogoutButton"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default Sidebar;
