import React, { createContext, useState, useEffect } from "react";

// Créer le contexte
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [orderDetails, setOrderDetails] = useState({ total: 0 });
  const [currentItemName, setCurrentItemName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [authError, setAuthError] = useState(null);
  
  const getToken = () => localStorage.getItem("authToken");
    
  useEffect(() => {
    if (showAlert && currentItemName) {
      console.log("Alerte affichée avec l'élément :", currentItemName);
    }
  }, [currentItemName, showAlert]);

  const fetchCartDetails = async () => {
    const token = getToken();
    if (!token) {
      setAuthError("Please log in to view cart");
      return;
    }
    
    try {
      // Fetch total du panier
      const totalResponse = await fetch("http://localhost:8080/user/cart/total", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if(totalResponse.status === 403) {
        setAuthError("Access denied - invalid token");
        return;
      }
      
      const total = await totalResponse.json();

      // Fetch items du panier
      const cartResponse = await fetch("http://localhost:8080/user/cart/", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if(cartResponse.status === 403) {
        setAuthError("Access denied - invalid token");
        return;
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

  const AddToCart = async (item) => {
    if (isAdding) return;
    setIsAdding(true);
    
    const token = getToken();
    if (!token) {
      setCurrentItemName("Please log in to add items");
      setShowAlert(true);
      setIsAdding(false);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    
    try {
      console.log("Adding item:", item.title);
      setCurrentItemName(item.title);
      setShowAlert(true);

      const existingItem = cart.find((i) => i.food?.id === item.id);
      
      if (existingItem) {
        await updateQuantity(existingItem.itemID, 1);
      } else {
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

        await fetchCartDetails();
      }

      setTimeout(() => {
        setShowAlert(false);
        setCurrentItemName("");
      }, 3000);
    } catch (error) {
      console.error("Add to cart failed ", error);
      setAuthError(error.message);
      setShowAlert(false);
    } finally {
      setIsAdding(false);
    }
  };

  const updateQuantity = async (itemId, change) => {
    const token = getToken();
    if (!token) {
      setAuthError("Please log in to update cart");
      return;
    }
    
    try {
      const endpoint = change > 0
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

      await fetchCartDetails();
    } catch (error) {
      console.error("Failed to update item quantity:", error);
      setAuthError(error.message);
    }
  };

  const removeItem = async (itemId) => {
    const token = getToken();
    if (!token) {
      setAuthError("Please log in to remove items");
      return;
    }
  
    try {
      const removeResponse = await fetch(`http://localhost:8080/user/cart/${itemId}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });
  
      if (!removeResponse.ok) {
        const res = await removeResponse.text();
        console.log("Failed to delete item from cart", res);
        throw new Error("Failed to delete item");
      } else {
        await fetchCartDetails();
      }
    } catch (error) {
      console.log("Delete from cart failed", error);
      setAuthError(error.message);
    }
  };
  
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