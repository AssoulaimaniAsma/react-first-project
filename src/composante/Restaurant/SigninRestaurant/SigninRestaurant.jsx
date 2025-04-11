import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function SigninRestaurant() {
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [reverseLayout, setReverseLayout] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleLogin = async () => {
    setLoginError(""); // Réinitialise le message d'erreur
    try {
      const response = await fetch("http://localhost:8080/auth/restaurant/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email, // Assure-toi que le backend attend 'email'
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Token reçu:", data.jwt);
        // Ici, tu peux stocker le token (localStorage, sessionStorage, Context API, etc.)
        localStorage.setItem("authToken", data.jwt); // Exemple avec localStorage
        navigate("/"); // Redirige vers la page d'accueil après la connexion
      } else {
        const errorData = await response.json();
        console.error("Erreur de connexion:", errorData);
        setLoginError(errorData.message || "Erreur de connexion. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de la requête de connexion:", error);
      setLoginError("Une erreur s'est produite lors de la connexion. Veuillez vérifier votre connexion.");
    }
  };

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="spinner">
            <img src={require("../../image/Pizza.gif")} alt="Loading..." />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen bg-white px-4">
          <div
            className={`max-w-4xl w-full bg-white grid grid-cols-1 md:grid-cols-2 shadow-lg rounded-lg overflow-hidden transition-transform duration-500 ${
              reverseLayout ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Formulaire */}
            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-black">Login</h2>
              <p className="text-gray-600 mt-5">
                Do not have an account,{" "}
                <Link
                  to="../SignupRestaurant"
                  onClick={() => setReverseLayout(!reverseLayout)}
                  className="text-[#FD4C2A] font-medium underline"
                >
                  create a new one.
                </Link>
              </p>

              {/* Champ Email ou Téléphone */}
              <div className="mt-6">
                <label className="block text-gray-700">
                  Enter Your Email Or Phone
                </label>
                <input
                  type="text" // Changed to 'text' to accept both email and phone
                  placeholder="exemple@exemple.com ou votre numéro"
                  className="w-full mt-2 p-3 focus:border-2 focus:border-[#FD4C2A] rounded-md bg-gray-50 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Mot de passe */}
              <div className="mt-4 relative">
                <label className="block text-gray-700">Enter Your Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="******"
                  className="w-full mt-2 p-3 focus:border-2 focus:border-[#FD4C2A] rounded-md bg-gray-50 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="absolute top-10 right-4 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {/* Affichage de l'erreur de connexion */}
              {loginError && (
                <p className="text-red-500 mt-4">{loginError}</p>
              )}

              {/* Bouton Login */}
              <button
                onClick={handleLogin}
                className="w-full mt-6 bg-[#FD4C2A] text-white py-3 rounded-md font-bold text-lg hover:bg-orange-600 transition"
              >
                Login
              </button>

              {/* Oublie mot de passe */}
              <p className="text-center mt-4">
                <a href="#" className="text-[#FD4C2A] font-medium underline">
                  Forgot Your Password
                </a>
              </p>
            </div>

            {/* L'image */}
            <div className=" pl-10 hidden md:block h-full">
              <img
                id="image"
                src={require("../../image/signinRes.jpg")}
                alt="Food"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SigninRestaurant;