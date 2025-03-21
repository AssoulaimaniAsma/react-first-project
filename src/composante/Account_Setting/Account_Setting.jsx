import React, { useState } from "react";

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    firstName: "Peter",
    lastName: "Ducker",
    email: "peterducker312@gmail.com",
    phone: "+212612345678",
    password: "P@ssword1",
    confirmPassword: "P@ssword1",
    region: "",
    city: "",
    zipcode: "",
    province: "",
    shippingaddress: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({}); // Gestion des erreurs
  const [successMessage, setSuccessMessage] = useState(""); // Message de succès

  // Générer les initiales
  const userInitials = formData.firstName[0] + formData.lastName[0];

  // 🔥 Gestion du changement d'image (base64)
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfileImage(reader.result); // Stocker l'image en base64
      };
    }
  };

  // 🔥 Vérification des champs
  const validateForm = () => {
    let newErrors = {};

    // Nom et prénom : pas de chiffres
    if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      newErrors.firstName = "Le prénom ne doit pas contenir de chiffres.";
    }
    if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      newErrors.lastName = "Le nom ne doit pas contenir de chiffres.";
    }

    // Email : doit être valide avec une extension connue
    if (!/^[a-zA-Z0-9._%+-]+@(gmail|yahoo|hotmail|outlook|live|protonmail|icloud|aol|zoho|mail|yandex|gmx|fastmail)\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Adresse email invalide.";
    }

    // Téléphone : doit commencer par +2126 ou 06 suivi de 8 chiffres
    if (!/^(?:\+2126|06)\d{8}$/.test(formData.phone)) {
      newErrors.phone = "Numéro invalide. Format : +2126xxxxxxx ou 06xxxxxxx";
    }

    // Mot de passe : au moins 8 caractères, une majuscule, une minuscule, un chiffre
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)) {
      newErrors.password = "Mot de passe invalide (8+ caractères, 1 majuscule, 1 minuscule, 1 chiffre).";
    }

    // Vérification de la confirmation du mot de passe
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retourne true si pas d'erreurs
  };

  // 🔥 Gérer la mise à jour
  const handleSaveChanges = () => {
    if (validateForm()) {
      setSuccessMessage("Informations mises à jour avec succès !");
      setTimeout(() => setSuccessMessage(""), 3000); // Effacer après 3 secondes
    }
  };
const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="mt-8 max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">Account Settings</h2>
      <p className="text-gray-500 text-sm mb-6">
        Manage your profile and update your personal information.
      </p>
      {/* Affichage du message de succès */}
      {successMessage && <p className="text-green-600 font-semibold">{successMessage}</p>}

      {/* Image de profil */}
      <div className="flex items-center space-x-4">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="relative inline-flex items-center justify-center w-16 h-16 overflow-hidden bg-gray-100 rounded-full">
            <span className="text-lg font-bold text-gray-600">{userInitials.toUpperCase()}</span>
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold">{formData.firstName} {formData.lastName}</h3>
          <p className="text-gray-500">{formData.email}</p>
        </div>
        
      </div>
      <div className="mt-4">
        <label className="cursor-pointer bg-[#FD4C2A] text-white px-3 py-2 rounded-lg hover:bg-[#e82802]">
          Change Profile Picture
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </label>
        </div>
      {/* Formulaire */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-600">First Name</label>
          <input type="text" name="firstName" value={formData.firstName} 
                 onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                 className="w-full p-2 border border-gray-300 rounded-lg" />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

        <div>
          <label className="text-gray-600">Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} 
                 onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                 className="w-full p-2 border border-gray-300 rounded-lg" />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-600">Email Address</label>
          <input type="email" name="email" value={formData.email} 
                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                 className="w-full p-2 border border-gray-300 rounded-lg" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="text-gray-600">Phone Number</label>
          <input type="text" name="phone" value={formData.phone} 
                 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                 className="w-full p-2 border border-gray-300 rounded-lg" />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-600">New Password</label>
          <input type="password" name="password" value={formData.password} 
                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                 className="w-full p-2 border border-gray-300 rounded-lg" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div>
          <label className="text-gray-600">Confirm New Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} 
                 onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                 className="w-full p-2 border border-gray-300 rounded-lg" />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-600">Region</label>
          <input
            type="text"
            name="region"
            placeholder="Your region"
            value={formData.region}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="text-gray-600">City</label>
          <input
            type="text"
            name="city"
            placeholder="Your city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-600">Zip Code</label>
          <input
            type="text"
            name="zipcode"
            placeholder="Your Zip Code"
            value={formData.zipcode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="text-gray-600">Province</label>
          <input
            type="text"
            name="province"
            placeholder="Your Province"
            value={formData.province}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="text-gray-600">Shipping Address</label>
        <input
          type="text"
          name="shippingaddress"
           placeholder="Your Shipping Address"
          value={formData.shippingaddress}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mt-6 text-right">
        <button onClick={handleSaveChanges} className="bg-[#FD4C2A] text-white px-6 py-3 rounded-lg hover:bg-[#e82802]">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
