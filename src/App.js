// src/App.js
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./composante/Client/CartContext/CartContext";
import AppClient from "./layouts/AppClient";
import AppRestaurant from "./layouts/AppRestaurant";
import ChooseRole from "./ChooseRole"; // à créer

function RoutesManager() {
  const location = useLocation();
  const path = location.pathname;

  if (path.startsWith("/restaurant")) return <AppRestaurant />;
  if (path.startsWith("/client")) return <AppClient />;
  
  // Page d’accueil générale
  return <ChooseRole />;
}

function App() {
  return (
    <CartProvider>
      <Router>
        <RoutesManager />
      </Router>
    </CartProvider>
  );
}

export default App;
