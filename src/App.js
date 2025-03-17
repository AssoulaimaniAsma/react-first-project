import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRef } from "react";
import Signin from "./composante/signin";
import Signup from "./composante/signup";
import Navbar from "./composante/Navbar";
import ContactForm from "./composante/feed_back";
import Home from "./composante/Home";
import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();

  // 🔥 Crée des refs pour éviter findDOMNode()
  const signinRef = useRef(null);
  const signupRef = useRef(null);
  const contactRef = useRef(null);
  const homeRef = useRef(null);

  return (
    <TransitionGroup>
      <CSSTransition 
        key={location.pathname} 
        classNames="fade" 
        timeout={500} 
        nodeRef={location.pathname === "/signup" ? signupRef :  location.pathname === "/contact" ? contactRef : 
          location.pathname === "/home" ? homeRef :
          signinRef}
      >
        <div ref={location.pathname === "/signup" ? signupRef : location.pathname === "/contact" ? contactRef :
        location.pathname === "/home" ? homeRef : 
          signinRef}>
          <Routes location={location}>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
      
    </Router>
  );
}

export default App;
