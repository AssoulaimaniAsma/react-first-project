import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRef } from "react";
import Signin from "./composante/Signin/signin";
import Signup from "./composante/Signup/signup";
import Navbar from "./composante/Navbar/Navbar";
import ContactForm from "./composante/feed_back/feed_back";
import Home from "./composante/home/Home";
import Our_Menu from "./composante/Our_Menu/Our_Menu";
import Sidebar from "./composante/SideBar/Sidebar";
import ItemCard from "./composante/Test_item_card/ItemCard";
import AccountSettings from "./composante/Account_Setting/Account_Setting";
import CartPage from "./composante/CartPage/CartPage";  // Garder cette ligne si elle est nécessaire
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
  const itemcardRef=useRef(null);

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
          location.pathname ==="/ItemCard"  ? itemcardRef:
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
          location.pathname ==="/ItemCard"  ? itemcardRef:
          homeRef
        }>
          <Routes location={location}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/CartPage" element={<CartPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<AccountSettings />} />
            <Route path="/CartPage" element={<CartPage />} />
            <Route path="/Our_Menu" element={<Our_Menu />} />
            <Route path="/ItemCard" element={<ItemCard />} />
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
    {/******** 
      {location.pathname !== "/" && location.pathname !== "/signup" && <Navbar />}*/}
      <Navbar />
      <AnimatedRoutes />
    </>
  );
}

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

export default App;
