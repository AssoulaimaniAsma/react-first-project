// src/App.js
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./composante/Client/CartContext/CartContext";
import AppClient from "./layouts/AppClient";
import AppRestaurant from "./layouts/AppRestaurant";
import AppAdmin from "./layouts/AppAdmin";
import ChooseRole from "./ChooseRole"; // à créer
import { AuthProvider } from "./contexts/AuthContext";
function RoutesManager() {
  const location = useLocation();
  const path = location.pathname;

  if (path.startsWith("/restaurant")) return <AppRestaurant />;
  if (path.startsWith("/client")) return <AppClient />;
  if (path.startsWith("/admin")) return <AppAdmin />;
  
  // Page d’accueil générale
  return <ChooseRole />;
}

function App() {
  return (
    <AuthProvider>

    <CartProvider>
      <Router>
        <RoutesManager />
      </Router>
    </CartProvider>
    </AuthProvider>

  );
}

export default App;
