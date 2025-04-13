import React, { useState } from "react";
import {
  FaBars,
  FaClipboardList,
  FaFileAlt,
  FaUserFriends,
  FaUtensils,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./SideBar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Burger icon */}
      <FaBars
        className={`SIDE ${isOpen ? "white" : ""}`}
        onClick={toggleSidebar}
      />

      {/* Sidebar content */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <Link
          to="/admin/TabOrders"
          id="idSidebar-line"
          className="sidebar-line"
        >
          <FaClipboardList className="icon" /> Tab Orders
        </Link>
        <Link to="/admin/Orders/1" className="sidebar-line">
          <FaFileAlt className="icon" /> Tab Orders Details
        </Link>
        <Link to="/admin/Tabclient" className="sidebar-line">
          <FaUserFriends className="icon" /> Tab Client
        </Link>
        <Link to="/admin/TabRestaurant" className="sidebar-line">
          <FaUtensils className="icon" /> Tab Restaurant
        </Link>
      <div className="profile-icon">
        <FaUserCircle size={50} color="#ccc" />
      </div>
      </div>
    </div>
  );
};

export default Sidebar;
