import React, { useState, useEffect } from "react";
import { Utensils } from 'lucide-react';

export default function AddFood() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [currentItemName, setCurrentItemName] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null, // Store the File object here
    price: '',
    discount: '',
    category: [],
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState(null); // State for image preview URL

  /*const categories = [
    { id: 1, name: "All", icon: "🍽️" },
    { id: 2, name: "Burger", icon: "🍔" },
    { id: 3, name: "Plate", icon: "🍛" },
    { id: 4, name: "Dessert", icon: "🍰" },
    { id: 5, name: "Pasta", icon: "🍝" },
    { id: 6, name: "Moroccan Food", icon: "🇲🇦" },
  ];*/
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/public/allCategories")
      .then((res) => res.json())
      .then((data) => {
        const filteredAndSorted = data
          .filter((cat) => cat.title.toLowerCase() !== 'all') // ❌ exclure 'All'
          .map((cat) => ({
            id: cat.id,
            name: cat.title,
            icon: cat.categoryIcon,
          }))
          .sort((a, b) => a.name.localeCompare(b.name)); // ✅ trier alphabétiquement
        setCategories(filteredAndSorted);
      })
      .catch((err) => console.error("Erreur de récupération :", err));
  }, []);
  
  
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
        alert('File size exceeds 10MB');
        return;
      }
    setFormData((prev) => ({
      ...prev,
      image: file, // Store the File object
    }));

    if (file) {
      setImagePreviewUrl(URL.createObjectURL(file)); // Create a preview URL
    } else {
      setImagePreviewUrl(null); // Clear preview if no file selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
  
    // Assurer que categoriesID est un tableau des catégories sélectionnées
    const selectedCategories = Array.from(e.target.category.selectedOptions).map(
      (option) => option.value
    );
  
    if (selectedCategories.length === 0) {
      alert('Please select at least one category.');
      return; // Quitter si aucune catégorie sélectionnée
    }
  
    // Si l'image est sélectionnée, il faut générer l'URL de l'image une fois l'upload terminé (généralement sur un serveur ou un stockage externe).
    const imageUrl = '/image/' + formData.image.name; // Suppose que l'image est envoyée et stockée dans le dossier /images/.
  
    // Créer l'objet JSON pour envoyer les données
    const foodItem = {
      title: formData.title,
      description: formData.description,
      image: imageUrl, // URL de l'image locale
      price: parseFloat(formData.price),
      discount: parseInt(formData.discount, 10),
      isAvailable: true,
      categoriesID: selectedCategories,
    };
  
    try {
      const response = await fetch('http://localhost:8080/restaurant/foodItem/addItem', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Spécifier l'en-tête JSON
        },
        body: JSON.stringify(foodItem), // Envoyer les données JSON sous forme de chaîne de caractères
      });
  
      if (response.ok) {
        const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    const message = await response.json();
    console.log('Success:', message);
    setAlertMessage('Food item added successfully!'); // ✅ ici

  } else {
    const message = await response.text(); // <- ici on lit la réponse texte
    console.log('Success:', message);
    setAlertMessage('Food item added successfully!'); // ✅ ici aussi


  }

  setShowAlert(true);
  setFormData({ title: '', description: '', image: null, price: '', discount: '', category: [] });
  setImagePreviewUrl(null);
  setTimeout(() => setShowAlert(false), 3000);
} else {
        const errorText = await response.text(); // Lire la réponse en texte brut
      console.error('Error:', errorText);
      alert('Erreur: ' + errorText); 
      }
    } catch (error) {
      console.error('Request failed', error);
    }
  };
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mt-8 max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {showAlert && (
        <div className="fixed-alert">
          <div
            className="flex items-center p-4 text-sm text-black rounded-lg bg-[#f0b9ae] dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
      <span className="font-medium">{alertMessage}</span>
      </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Add Food</h2>
      <p className="text-gray-500 text-sm mb-6">Fill in the details to add a new food item.</p>

      {/* Image Upload and Preview moved to the top */}
      <div className="mb-6">
        <label htmlFor="image" className="text-gray-600 block mb-1">Image</label>
        <div className="flex items-center space-x-4">
          <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full overflow-hidden">
            {imagePreviewUrl ? (
              <img
                src={imagePreviewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
<div className="flex justify-center items-center w-16 h-16 bg-gray-100 rounded-full">
  <Utensils className="w-8 h-8 text-gray-500" />
</div>
            )}
          </div>
          <div className="flex-grow">
            <label className="EditProfile">
              Upload Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {/* Food Title */}
        <div>
          <label htmlFor="title" className="text-gray-600 block mb-1">Food Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter food title"
            className="w-full p-2 border border-gray-300 rounded-lg bg-[#f6f6f6] focus:border-[#FD4C2A] focus:ring-[#FD4C2A]"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="text-gray-600 block mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            placeholder="Enter description"
            className="w-full p-2 border border-gray-300 rounded-lg bg-[#f6f6f6] focus:border-[#FD4C2A] focus:ring-[#FD4C2A]"
          />
        </div>

        {/* Price & Discount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="text-gray-600 block mb-1">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="e.g. 15.99"
              className="w-full p-2 border border-gray-300 rounded-lg bg-[#f6f6f6] focus:border-[#FD4C2A] focus:ring-[#FD4C2A]"
            />
          </div>
          <div>
            <label htmlFor="discount" className="text-gray-600 block mb-1">Discount (%)</label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              placeholder="e.g. 10"
              className="w-full p-2 border border-gray-300 rounded-lg bg-[#f6f6f6] focus:border-[#FD4C2A] focus:ring-[#FD4C2A]"
            />
          </div>
        </div>

        {/* Category Selection */}
        <div>
      <label htmlFor="category" className="text-gray-600 block mb-1">
        Category
      </label>
      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        multiple
        className="w-full p-2 border border-gray-300 rounded-lg bg-[#f6f6f6] focus:border-[#FD4C2A] focus:ring-[#FD4C2A]"
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.icon} {cat.name}
          </option>
        ))}
      </select>
    </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#FD4C2A] text-white rounded-lg hover:bg-[#fd3f1e]"
          >
            Add Food
          </button>
        </div>
      </form>
    </div>
  );
}
