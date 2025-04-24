import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Products from "../Products/Products";
import "./CartPage.css";

function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({ total: 0, subTotal: 0, shipping: 0 });
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  // Fetch cart contents from backend
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return navigate("/client/login");

      try {
        const response = await fetch("http://localhost:8080/user/cart/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCart(data);
        } else if (response.status === 401) {
          navigate("/client/login");
        } else {
          console.error("Failed to fetch cart:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching cart contents:", error);
      }
    };

    fetchCart();
  }, [navigate]);

  // Add item to the cart
  const addItemToCart = async (foodID) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return navigate("/client/login");

      const addResponse = await fetch(`http://localhost:8080/user/cart/addItem?foodID=${foodID}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!addResponse.ok) {
        throw new Error("Failed to add item", foodID);
      }

      const addData = await addResponse.text();
      console.log("Item added:", addData);

      const cartResponse = await fetch("http://localhost:8080/user/cart/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!cartResponse.ok) {
        throw new Error("Failed to fetch updated cart");
      }

      const updatedCart = await cartResponse.json();
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const incrementItem = async (itemID) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return navigate("/client/login");

      const res = await fetch(`http://localhost:8080/user/cart/${itemID}/increment`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to increment item");
      }

      const cartResponse = await fetch("http://localhost:8080/user/cart/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!cartResponse.ok) {
        throw new Error("Failed to fetch updated cart");
      }

      const updatedCart = await cartResponse.json();
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to increment item in cart:", error);
    }
  };

  const decrementItem = async (itemID) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return navigate("/client/login");

      const res = await fetch(`http://localhost:8080/user/cart/${itemID}/decrement`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to decrement item");
      }

      const cartResponse = await fetch("http://localhost:8080/user/cart/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!cartResponse.ok) {
        throw new Error("Failed to fetch updated cart");
      }

      const updatedCart = await cartResponse.json();
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to decrement item in cart:", error);
    }
  };

  const removeItem = async (itemID) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return navigate("/client/login");

      const res = await fetch(`http://localhost:8080/user/cart/${itemID}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete item");
      }

      const cartResponse = await fetch("http://localhost:8080/user/cart/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!cartResponse.ok) {
        throw new Error("Failed to fetch updated cart");
      }

      const updatedCart = await cartResponse.json();
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to delete item from cart:", error);
    }
  };

  const fetchCartDetails = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return navigate("/client/login");

    try {
      const subtotalResponse = await fetch("http://localhost:8080/user/cart/subTotal", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const subTotal = parseFloat(await subtotalResponse.text());

      const shippingResponse = await fetch("http://localhost:8080/user/cart/shipping", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const shipping = parseFloat(await shippingResponse.text());

      const totalResponse = await fetch("http://localhost:8080/user/cart/total", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const total = parseFloat(await totalResponse.text());

      setOrderDetails({ total, subTotal, shipping });

      const cartResponse = await fetch("http://localhost:8080/user/cart/", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedCart = await cartResponse.json();
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to calculate cart details:", error);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch("http://localhost:8080/youMayAlsoLike", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendations(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch suggested food.");
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setError("Something went wrong while fetching suggestions.");
    }
  };

  useEffect(() => {
    fetchCartDetails();
    fetchRecommendations();
  }, []);

  return (
    <div className="cartContainer">
      <div className="tableContainer">
        <Products
          products={cart}
          RemoveItem={(id) => removeItem(id)}
          UpdateQuantity={(id, delta) =>
            delta > 0 ? incrementItem(id) : decrementItem(id)
          }
        />
        <table className="TotalPrice">
          <thead>
            <tr className="headTable2">
              <th>Cart Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="bodyTable2">
            <tr>
              <td>Subtotal</td>
              <td>{Number(orderDetails.subTotal).toFixed(2)} MAD</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>{Number(orderDetails.shipping).toFixed(2)} MAD</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{Number(orderDetails.total).toFixed(2)} MAD</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="SecondPart">
        <h2 id="h2content5">You May Also Like</h2>
        <div id="imageContent2">
          {recommendations.map((item) => (
            <div id="imageItem2" key={item.foodID}>
              <span id="discountBadge2">13%</span>
              <img src={item.image} alt={item.name} />
              <div id="nameImg2">{item.name}</div>
              <div id="PriceContainer2">
                <div id="oldPrice2">{item.oldPrice}DH</div>
                <div id="newPrice2">{item.newPrice}DH</div>
              </div>
              <div id="AddToCart2">
                <button id="Add2" onClick={() => addItemToCart(item.foodID)}>
                  +
                </button>
              </div>
            </div>
          ))}
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
