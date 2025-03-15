import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./composante/Navbar";
import Signin from './composante/signin';
function App() {
  return (
    <Router>
    <Navbar />
    <div>
      <Signin />
    </div>
  </Router>
  );
}

export default App;
