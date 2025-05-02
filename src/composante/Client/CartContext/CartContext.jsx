import React, { createContext, useState, useEffect } from "react";

// Create the context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState({ total: 0 });

  // Fetch cart details and order total from the backend
  const fetchCartDetails = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      // Fetch cart total
      const totalResponse = await fetch("http://localhost:8080/user/cart/total", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const totalText = await totalResponse.text();
      const total = Number(totalText);
      setOrderDetails({ total });

      // Fetch cart items
      const cartResponse = await fetch("http://localhost:8080/user/cart/", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const cartData = await cartResponse.json();
      setCart(cartData);
    } catch (error) {
      console.error("Failed to fetch cart details:", error);
    }
  };

  // Add item to cart
  const AddToCart = async (item) => {
    const token = localStorage.getItem("authToken");
    if (!token) return;
    
    const existingItem = cart.find((i) => i.id === item.id);


    try {
      // Check if the item already exists in the cart
      if (existingItem) {
        // If item exists, update quantity
        await updateQuantity(item.id, 1);
        setShowAlert(true);
      } else {
        // If item doesn't exist, add to the cart
        const res = await fetch(`http://localhost:8080/user/cart/addItem?foodID=${item.id}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorMsg = await res.text();
          throw new Error(`Failed to add item to cart: ${errorMsg}`);
        }else{
          console.log("item added:", item.id);
        }}
        

        // Re-fetch cart details after adding
        await fetchCartDetails();
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }finally{
      setLoading(false);
    }
  };

  // Update cart item quantity
  // Update cart item quantity using increment or decrement endpoints
const updateQuantity = async (itemId, change) => {
  const token = localStorage.getItem("authToken");
  if (!token) return;

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

    if (!res.ok) throw new Error("Failed to update item quantity");

    // Re-fetch cart details after update
    fetchCartDetails();
  } catch (error) {
    console.error("Failed to update item quantity:", error);
  }
};

// Increment item quantity
const incrementItem = async (itemId) => {
  const token = localStorage.getItem("authToken");
  if (!token) return;

  try {
    const res = await fetch(`http://localhost:8080/user/cart/${itemId}/increment`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to increment item quantity");

    fetchCartDetails();
  } catch (error) {
    console.error("Failed to increment item quantity:", error);
  }
};

// Decrement item quantity
const decrementItem = async (itemId) => {
  const token = localStorage.getItem("authToken");
  if (!token) return;

  try {
    const res = await fetch(`http://localhost:8080/user/cart/${itemId}/decrement`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to decrement item quantity");

    fetchCartDetails();
  } catch (error) {
    console.error("Failed to decrement item quantity:", error);
  }
};

  // Remove item from cart
  const removeItem = async (itemID) => {
    const token = localStorage.getItem("authToken");
    if (!token) return;
  
    // Show confirmation dialog before proceeding with the deletion
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (!isConfirmed) return; // If user cancels, do nothing
  
    try {
      const res = await fetch(`http://localhost:8080/user/cart/${itemID}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) throw new Error("Failed to delete item");
      // Re-fetch cart details after removal
      fetchCartDetails();
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };
  
  // Fetch cart details when the component mounts
  useEffect(() => {
    fetchCartDetails();
  }, []);

  const clearCart =() => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart,  AddToCart,loading, decrementItem, removeItem,incrementItem ,clearCart ,orderDetails }}>
      {children}
    </CartContext.Provider>
  );
};
