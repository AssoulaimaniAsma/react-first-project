import React, { createContext, useState, useEffect } from "react";

// Créer le contexte
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [orderDetails, setOrderDetails] = useState({ total: 0 });
  const [currentItemName, setCurrentItemName] = useState("test"); // Nom de l'item
  const [isAdding, setIsAdding] = useState(false); // Nouveau state pour contrôler les ajouts
  const [authError, setAuthError] = useState(null);
  const getToken =()=> localStorage.getItem("authToken");
    
  // UseEffect pour afficher l'alerte une seule fois
  useEffect(() => {
    if (showAlert && currentItemName !== "test") {
      console.log("Alerte affichée avec l'élément :", currentItemName);
      // L'alerte peut être affichée ici, ou gérer d'autres actions
    }
  }, [currentItemName, showAlert]); // Dépend de currentItemName et showAlert

  const fetchCartDetails = async () => {
    const token = getToken();
      if (!token){
      setAuthError("Please log in to view cart");
       return;
    }
    try {
      // Fetch total du panier
      const totalResponse = await fetch("http://localhost:8080/user/cart/total", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if(totalResponse.status ===403){
        setAuthError("Acces denied - invalid token");
        return ;
      }
      const total = await totalResponse.json();

      // Fetch items du panier
      const cartResponse = await fetch("http://localhost:8080/user/cart/", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if(cartResponse.status ===403){
        setAuthError("Acces denied - invalid token");
        return ;
      }
      const cartData = await cartResponse.json();
      setOrderDetails({ total });
      setCart(cartData);
      setAuthError(null);
    } catch (error) {
      console.error("Failed to fetch cart details:", error);
      setAuthError("Failed to load cart");
    }
  };

  // Fonction d'ajout au panier
  const AddToCart = async (item) => {
    if (isAdding) return;
    setIsAdding(true);
    const token = getToken();
    if (!token){
      console.log("Please log in to add items");
      setIsAdding(false);
       return;
    }
    try {
      console.log("Adding item:", item.title);
  
      // Mettre à jour le nom de l'item et afficher l'alerte
      setCurrentItemName(item.title);
      setShowAlert(true);
  
      // Trouver l'élément existant dans le panier
      const existingItem = cart.find((i) => i.food?.id === item.id);
      console.log("Existing item in cart:", existingItem);
        if (existingItem) {
          // Si l'élément existe déjà, mettre à jour la quantité
          await updateQuantity(existingItem.itemID, 1);
        } else {
          // Sinon, ajouter le nouvel élément
          const res = await fetch(`http://localhost:8080/user/cart/addItem?foodID=${item.id}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          if (res.status === 403) {
            throw new Error("Access denied - invalid token");
          }
  
          if (!res.ok) {
            const errorMsg = await res.text();
            throw new Error(`Failed to add item to cart: ${errorMsg}`);
          }
  
          // Actualiser les détails du panier
          await fetchCartDetails();
        }
  
      // Cacher l'alerte après 3 secondes
      setTimeout(() => {
        setShowAlert(false);
        setCurrentItemName("");
      }, 3000);
  
    } catch (error) {
      console.error("Add to cart failed ", error);
      setAuthError(error.message);
    } finally {
      setIsAdding(false);
    }
  };
  // Update cart item quantity
  const updateQuantity = async (itemId, change) => {
    const token = getToken();
    if (!token){
      setAuthError("Please log in to update cart");
       return;
    }
    try {
      const endpoint =
        change > 0
          ? `http://localhost:8080/user/cart/${itemId}/increment`
          : `http://localhost:8080/user/cart/${itemId}/decrement`;

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 403) {
        throw new Error("Access denied - invalid token");
      }

      if (!res.ok) throw new Error("Failed to update item quantity");

      // Re-fetch cart details après la mise à jour
      await fetchCartDetails();
    } catch (error) {
      console.error("Failed to update item quantity:", error);
      setAuthError(error.message);
    }
  };

  const removeItem = async (itemId) => {
    const token = localStorage.getItem("authToken");
    if (!token) return;
  
    try {
      const removeResponse = await fetch(`http://localhost:8080/user/cart/${itemId}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });
  
      if (!removeResponse.ok) {
        // Await the text to get the actual error message
        const res = await removeResponse.text();
        console.log("Failed to delete item from cart", res);
      } else {
        // Handle the successful deletion
        console.log("Item deleted successfully");
        fetchCartDetails();
      }
    } catch (error) {
      console.log("Delete from cart failed", error);
    }
  };
  
  // Fetch cart details au montage du composant
  useEffect(() => {
    if(getToken()) fetchCartDetails();
  }, []);

  return (
    <CartContext.Provider value={{
      cart,
      orderDetails,
      AddToCart,
      updateQuantity,
      removeItem,
      showAlert,           
      currentItemName,
      authError,   
    }}>
      {children}
    </CartContext.Provider>
  );
};