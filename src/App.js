import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRef } from "react";
<<<<<<< HEAD
import Signin from "./composante/signin";
import Signup from "./composante/signup";
import Navbar from "./composante/Navbar";
import CartPage from "./composante/CartePage";
import ContactForm from "./composante/feed_back";
import Home from "./composante/Home";
=======
import Signin from "./composante/Signin/signin";
import Signup from "./composante/Signup/signup";
import Navbar from "./composante/Navbar/Navbar";
import ContactForm from "./composante/feed_back/feed_back";
import Home from "./composante/home/Home";
import AccountSettings from "./composante/Account_Setting/Account_Setting";
>>>>>>> 5723639 (Account settings)
import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();

  // 🔥 Crée des refs pour éviter findDOMNode()
  const signinRef = useRef(null);
  const signupRef = useRef(null);
  const contactRef = useRef(null);
  const homeRef = useRef(null);
  const accountRef = useRef(null);

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
          signinRef
        }
      >
        <div  ref={
          location.pathname === "/signup" ? signupRef :  
          location.pathname === "/contact" ? contactRef : 
          location.pathname === "/home" ? homeRef :
          location.pathname === "/account" ? accountRef : 
          signinRef
        }>
          <Routes location={location}>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/CartPage" element={<CartPage/>} />
            <Route path="/home" element={<Home />} />
            <Route path="/account" element={<AccountSettings />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}
function Main() {
  const location = useLocation(); // Utilisez useLocation ici

  return (
    <>
      {/* Affichez Navbar uniquement si le chemin n'est ni "/" ni "/signup" */}
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
