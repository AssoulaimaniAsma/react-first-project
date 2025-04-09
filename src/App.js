import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRef } from "react";
import Signin from "./composante/Signin/signin";
import Signup from "./composante/Signup/signup";
import Navbar from "./composante/Navbar/Navbar";
import ContactForm from "./composante/feed_back/feed_back";
import Home from "./composante/home/Home";
import Our_Menu from "./composante/Our_Menu/Our_Menu";
import AccountSettings from "./composante/Account_Setting/Account_Setting";
import CartPage from "./composante/CartPage/CartPage";
import History from "./composante/History/History";
import Checkout from "./composante/Checkout/Checkout";
import ItemCard from "./composante/Test_item_card/ItemCard";
import VerifyAccount from "./composante/VerifyAccount/VerifyAccount";
import { CartProvider } from "./composante/CartContext/CartContext";
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
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/CartPage" element={<CartPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<AccountSettings />} />
            <Route path="/Our_Menu" element={<Our_Menu />} />
            <Route path="/ItemCard" element={<ItemCard />} />
            <Route path="/history/:userId" element={<History />} />
            <Route path="/Checkout" element={<Checkout />}/>
            <Route path="/verifyAccount" element={<VerifyAccount />}/>

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
      {location.pathname !== "/signin" && location.pathname !== "/signup" && <Navbar />}
      <AnimatedRoutes />
    </>
  );
}

function App() {
  return (
      <CartProvider>
        <Router>
          <Main />
        </Router>
      </CartProvider>
  );
}

export default App;