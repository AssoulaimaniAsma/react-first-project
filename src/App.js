import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRef } from "react";
import Signin from "./composante/Signin/signin";
import Signup from "./composante/Signup/signup";
import Navbar from "./composante/Navbar/Navbar";
import ContactForm from "./composante/feed_back/feed_back";
import Home from "./composante/home/Home";
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

  return (
    <TransitionGroup>
      <CSSTransition 
        key={location.pathname} 
        classNames="fade" 
        timeout={500} 
        nodeRef={
          location.pathname === "/signup" ? signupRef :  
          location.pathname === "/contact" ? contactRef : 
          location.pathname === "/home" ? homeRef :
          location.pathname === "/account" ? accountRef :
          location.pathname === "/CartPage" ? cartePageRef : 
          signinRef
        }
      >
        <div ref={
          location.pathname === "/signup" ? signupRef :  
          location.pathname === "/contact" ? contactRef : 
          location.pathname === "/home" ? homeRef :
          location.pathname === "/account" ? accountRef : 
          location.pathname === "/CartPage" ? cartePageRef :
          signinRef
        }>
          <Routes location={location}>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/CartPage" element={<CartPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/account" element={<AccountSettings />} />
            <Route path="/CartPage" element={<CartPage />} />
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
      {location.pathname !== "/" && location.pathname !== "/signup" && <Navbar />}
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
