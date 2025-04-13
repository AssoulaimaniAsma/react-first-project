import { Link } from "react-router-dom";

function ChooseRole() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenue sur notre plateforme</h1>
      <p>Veuillez choisir votre espace :</p>
      <Link to="/client" style={{ marginRight: "20px" , fontSize: "20px" }}>Espace Client</Link>
      <Link to="/restaurant" style={{ marginRight: "20px" , fontSize: "20px" }}>Espace Restaurant</Link>
      <Link to="/admin" style={{ fontSize: "20px" }}>Espace Admin</Link>
    </div>
  );
}

export default ChooseRole;
