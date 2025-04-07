import React, { createContext, useState, useEffect } from "react";

// Create the context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [currentItemName, setCurrentItemName] = useState(""); // Nouvel état pour le nom de l'item

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    setCart(savedCart);
  }, [userId]);

  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
  };

  const AddToCart = (item) => {
    const existingItem = cart.find((i) => i.id === item.id);

    if (existingItem) {
      UpdateQuantity(item.id, 1);
      setCurrentItemName(item.name); // Mettez à jour le nom de l'item
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } else {
      const updatedCart = [...cart, { ...item, quantity: 1, price: item.newPrice }];
      saveCart(updatedCart);
      setCurrentItemName(item.name); // Mettez à jour le nom de l'item
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const UpdateQuantity = (itemId, change) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + change } : item
    );
    saveCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, AddToCart, UpdateQuantity,showAlert,currentItemName }}>
      {children}
    </CartContext.Provider>
  );
};
