import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRef } from "react";
import { CartProvider } from "../composante/Client/CartContext/CartContext";
import SigninRestaurant from "../composante/Restaurant/SigninRestaurant/SigninRestaurant";
import SignupRestaurant from "../composante/Restaurant/SignupRestaurant/SignupRestaurant";
import VerifyAccountRestaurant from "../composante/Restaurant/VerifyAccountRestaurant/VerifyAccountRestaurant";
import Navbar_Restaurant from "../composante/Restaurant/Navbar_Restaurant/Navbar_Restaurant";
import HomeRestaurant from "../composante/Restaurant/Home_Restaurant/Home_Restaurant";
import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();
  const signinRestRef=useRef(null);
  const signupRestRef=useRef(null);
  const verifyResRef=useRef(null);
  const homeRestaurantRef = useRef(null);
  return (
    <TransitionGroup>
      <CSSTransition 
        key={location.pathname} 
        classNames="fade" 
        timeout={500} 
        nodeRef={
          location.pathname==="/restaurant/VerifyAccountRestaurant" ? verifyResRef:
          location.pathname==="/restaurant/SigninRestaurant" ? signinRestRef:
          location.pathname==="/restaurant/SignupRestaurant" ? signupRestRef:
          homeRestaurantRef
          
        }
      >
        <div ref={
          location.pathname==="/restaurant/VerifyAccountRestaurant" ? verifyResRef:
          location.pathname==="/restaurant/SigninRestaurant" ? signinRestRef:
          location.pathname==="/restaurant/SignupRestaurant" ? signupRestRef:
          homeRestaurantRef
        }>
          <Routes location={location}>
            <Route path="/restaurant" element={<HomeRestaurant />} />
            <Route path="/restaurant/SigninRestaurant" element={<SigninRestaurant />} />
            <Route path="/restaurant/SignupRestaurant" element={<SignupRestaurant />} />
            <Route path="/restaurant/VerifyAccountRestaurant" element={<VerifyAccountRestaurant />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

function Main() {
  const location = useLocation(); 
  return (
    <>
      {location.pathname !== "/restaurant/SigninRestaurant" && location.pathname !== "/restaurant/SignupRestaurant"&& <Navbar_Restaurant />}
      <AnimatedRoutes />
    </>
  );
}

function AppRestaurant() {
  return (
      <CartProvider>
          <Main />
      </CartProvider>
  );
}

export default AppRestaurant;