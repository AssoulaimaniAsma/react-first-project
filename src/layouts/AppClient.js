import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRef } from "react";
import Signin from "../composante/Client/Signin/signin";
import Signup from "../composante/Client/Signup/signup";
import Navbar from "../composante/Client/Navbar/Navbar";
import ContactForm from "../composante/Client/feed_back/feed_back";
import Home from "../composante/Client/home/Home";
import Our_Menu from "../composante/Client/Our_Menu/Our_Menu";
import AccountSettings from "../composante/Client/Account_Setting/Account_Setting";
import CartPage from "../composante/Client/CartPage/CartPage";
import History from "../composante/Client/History/History";
import Checkout from "../composante/Client/Checkout/Checkout";
import ItemCard from "../composante/Client/Test_item_card/ItemCard";
import VerifyAccount from "../composante/Client/VerifyAccount/VerifyAccount";
import { CartProvider } from "../composante/Client/CartContext/CartContext";
import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();
  const signinRef = useRef(null);
  const signupRef = useRef(null);
  const contactRef = useRef(null);
  const homeRef = useRef(null);
  const accountRef = useRef(null);
  const cartePageRef= useRef(null);
  const ourmenuRef= useRef(null);
  const itemCardRef=useRef(null);
  const historyRef= useRef(null);
  const checkoutRef=useRef(null);
  const verifyRef=useRef(null);
  return (
    <TransitionGroup>
      <CSSTransition 
        key={location.pathname} 
        classNames="fade" 
        timeout={500} 
        nodeRef={
          location.pathname === "/signup" ? signupRef :  
          location.pathname === "/contact" ? contactRef : 
          location.pathname === "/signin" ? signinRef :
          location.pathname === "/account" ? accountRef :
          location.pathname === "/CartPage" ? cartePageRef : 
          location.pathname ==="/Our_Menu"  ? ourmenuRef:
          location.pathname === "/History" ? historyRef : 
          location.pathname ==="/SideBar"  ? ourmenuRef:
          location.pathname ==="/Checkout"  ? checkoutRef:
          location.pathname ==="/ItemCard"  ? itemCardRef:
          location.pathname==="/VerifyAccount" ? verifyRef:
          homeRef
          
        }
      >
        <div ref={
          location.pathname === "/signup" ? signupRef :  
          location.pathname === "/contact" ? contactRef : 
          location.pathname === "/signin" ? signinRef :
          location.pathname === "/account" ? accountRef :
          location.pathname === "/CartPage" ? cartePageRef : 
          location.pathname ==="/Our_Menu"  ? ourmenuRef:
          location.pathname === "/History" ? historyRef :
          location.pathname ==="/SideBar"  ? ourmenuRef:
          location.pathname ==="/Checkout"  ? checkoutRef:
          location.pathname ==="/ItemCard"  ? itemCardRef:
          location.pathname==="/VerifyAccount" ? verifyRef:
          homeRef
        }>
          <Routes location={location}>
          <Route path="/client" element={<Home />} />
<Route path="/client/signin" element={<Signin />} />
<Route path="/client/signup" element={<Signup />} />
            <Route path="/client/contact" element={<ContactForm />} />
            <Route path="/client/CartPage" element={<CartPage />} />
            <Route path="/client/account" element={<AccountSettings />} />
            <Route path="/client/Our_Menu" element={<Our_Menu />} />
            <Route path="/client/ItemCard" element={<ItemCard />} />
            <Route path="/client/history/:userId" element={<History />} />
            <Route path="/client/Checkout" element={<Checkout />}/>
            <Route path="/client/verifyAccount" element={<VerifyAccount />}/>

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
      {location.pathname !== "/signin" && location.pathname !== "/signup"&& <Navbar />}
      <AnimatedRoutes />
    </>
  );
}

function AppClient() {
  return (
      <CartProvider>
          <Main />
      </CartProvider>
  );
}

export default AppClient;