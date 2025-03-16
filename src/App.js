import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./composante/Navbar";
import Signin from './composante/signin';
import Home from "./Home";
function App() {
  return (
    <Router>
    <Navbar />
    <div>
      <Routes>
          <Route path="/" element={<Home />} />   {/* Affiche Home uniquement sur "/" */}
          <Route path="/signin" element={<Signin />} />  {/* Page de connexion */}
        </Routes>
  
      
    </div>
  </Router>
  );
}

export default App;
