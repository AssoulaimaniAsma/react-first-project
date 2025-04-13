import { Route, Routes, useLocation } from "react-router-dom";
import TabOrders from "../composante/Admin/TabOrders/TabOrders";
import TabOrdersDetails from "../composante/Admin/TabOrders/TabOrdersDetails";
import TabClient from "../composante/Admin/TabClient/TabClient";
import TabRestaurant from "../composante/Admin/TabRestaurant/TabRestaurant";
import SideBar from "../composante/Admin/SideBar/SideBar";

function AppAdmin() {
  const location = useLocation();
  const path = location.pathname;

  // Si le chemin commence par "/admin", afficher la sidebar
  const showSidebar = path.startsWith("/admin");

  return (
    <div style={{ display: "flex" }}>
      {showSidebar && <SideBar />}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/admin" element={<TabOrders />} />
          <Route path="/admin/Orders/:id" element={<TabOrdersDetails />} />
          <Route path="/admin/Tabclient" element={<TabClient />} />
          <Route path="/admin/TabRestaurant" element={<TabRestaurant />} />
        </Routes>
      </div>
    </div>
  );
}

export default AppAdmin;
