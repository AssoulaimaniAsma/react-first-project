import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRef } from "react";
import { CartProvider } from "../composante/Client/CartContext/CartContext";
import SigninRestaurant from "../composante/Restaurant/SigninRestaurant/SigninRestaurant";
import SignupRestaurant from "../composante/Restaurant/SignupRestaurant/SignupRestaurant";
import VerifyAccountRestaurant from "../composante/Restaurant/VerifyAccountRestaurant/VerifyAccountRestaurant";
import Navbar_Restaurant from "../composante/Restaurant/Navbar_Restaurant/Navbar_Restaurant";
import Menu_Restaurant from "../composante/Restaurant/Menu_Restaurant/Menu_Restaurant";
import AccountSettings from "../composante/Restaurant/Account_settings/account_settings";
import "./App.css";

// Layout avec Navbar fixe
const RestaurantLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 fixed top-0 left-0 h-full z-10">
        <Navbar_Restaurant />
      </div>
      <div className="flex-1 ml-64 p-4">
        {children}
      </div>
    </div>
  );
};

// Gestion des routes avec animation
function AnimatedRoutes() {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        classNames="fade"
        timeout={300}
        nodeRef={nodeRef}
      >
        <div ref={nodeRef}>
          <Routes location={location}>
            {/* Pages sans layout (pas de sidebar) */}
            <Route
              path="/restaurant/SigninRestaurant"
              element={<SigninRestaurant />}
            />
            <Route
              path="/restaurant/SignupRestaurant"
              element={<SignupRestaurant />}
            />
            <Route
              path="/restaurant/VerifyAccountRestaurant"
              element={<VerifyAccountRestaurant />}
            />

            {/* Pages avec layout/sidebar */}
            <Route
              path="/restaurant"
              element={
                <RestaurantLayout>
                  <Menu_Restaurant />
                </RestaurantLayout>
              }
            />
            <Route
              path="/restaurant/account_settings"
              element={
                <RestaurantLayout>
                  <AccountSettings />
                </RestaurantLayout>
              }
            />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

// Main
function Main() {
  return <AnimatedRoutes />;
}

// App parent
function AppRestaurant() {
  return (
    <CartProvider>
      <AnimatedRoutes />
    </CartProvider>
  );
}

export default AppRestaurant;
