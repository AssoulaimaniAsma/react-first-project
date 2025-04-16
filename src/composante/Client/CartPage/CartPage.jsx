import React, { useState } from "react";
//import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Products from "../Products/Products";
//import { CartContext } from "../CartContext/CartContext";
import "./CartPage.css";
import axios from "axios";
import { useEffect } from "react";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  // Fetch cart contents from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/user/cart/", { withCredentials: true });
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart contents:", error);
      }
    };
    fetchCart();
  }, []);

  // Fetch total whenever cart updates
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get("/user/cart/total", { withCredentials: true });
        setOrderDetails({
          subTotal: response.data, // Assuming only one total is returned
          shipping: 10, // Add static shipping if needed
          total: response.data + 10,
        });
      } catch (error) {
        console.error("Error calculating total:", error);
      }
    };

    if (cart.length > 0) {
      fetchOrderDetails();
    }
  }, [cart]);

  const addToCart = async (foodId) => {
    try {
      const res = await axios.post("/user/cart/addItem", null, {
        params: { foodID: foodId },
        withCredentials: true,
      });
  
      console.log("Add response:", res.data);
      
      // Refresh cart
      const refreshedCart = await axios.get("/user/cart/", { withCredentials: true });
      setCart(refreshedCart.data);
    } catch (error) {
      console.error("Error adding to cart", error);
  
      if (error.response) {
        alert("Failed to add item: " + error.response.data);
      } else {
        alert("Failed to add item: " + error.message);
      }
    }
  };
  

  const incrementItem = async (itemID) => {
    try {
      await axios.put(`/user/cart/${itemID}/increment`, null, { withCredentials: true });
      const res = await axios.get("/user/cart/", { withCredentials: true });
      setCart(res.data);
    } catch (err) {
      console.error("Error incrementing item", err);
    }
  };

  const decrementItem = async (itemID) => {
    try {
      await axios.put(`/user/cart/${itemID}/decrement`, null, { withCredentials: true });
      const res = await axios.get("/user/cart/", { withCredentials: true });
      setCart(res.data);
    } catch (err) {
      console.error("Error decrementing item", err);
    }
  };

  const removeItem = async (itemID) => {
    try {
      await axios.delete(`/user/cart/${itemID}/delete`, { withCredentials: true });
      const res = await axios.get("/user/cart/", { withCredentials: true });
      setCart(res.data);
    } catch (error) {
      console.error("Error removing item", error);
    }
  };

  const recommendations = [
    {
      id: 1,
      image: require("../../../image/pizza.png"),
      name: "item x",
      oldPrice: 200,
      newPrice: 140,
    },
    {
      id: 2,
      image: require("../../../image/pizza.png"),
      name: "item y",
      oldPrice: 230,
      newPrice: 200,
    },
    {
      id: 3,
      image: require("../../../image/pizza.png"),
      name: "item z",
      oldPrice: 200,
      newPrice: 140,
    },
    {
      id: 4,
      image: require("../../../image/pizza.png"),
      name: "item a",
      oldPrice: 200,
      newPrice: 140,
    },
    {
      id: 5,
      image: require("../../../image/pizza.png"),
      name: "item b",
      oldPrice: 200,
      newPrice: 140,
    },
  ];


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
          <tbody className="bodyTab">
            <tr>
              <th>SUBTOTAL</th>
              <td className="tdContent">
                {orderDetails?.subTotal?.toFixed(2)} DH
              </td>
            </tr>
            <tr>
              <th>SHIPPING</th>
              <td className="tdContent">
                {orderDetails?.shipping?.toFixed(2)} DH
              </td>
            </tr>
            <tr>
              <th>TOTAL</th>
              <td className="tdContent">
                {orderDetails?.total?.toFixed(2)} DH
              </td>
            </tr>
            <tr className="fotter">
              <th>
                <button onClick={() => navigate("/Checkout")}>
                  Proceed To Checkout
                </button>
              </th>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="SecondPart">
        <h2 id="h2content5">You May Also Like</h2>
        <div id="imageContent2">
          {recommendations.map((item) => (
            <div id="imageItem2" key={item.id}>
              <span id="discountBadge2">13%</span>
              <img src={item.image} />
              <div id="nameImg2">{item.name}</div>
              <div id="PriceContainer2">
                <div id="oldPrice2">{item.oldPrice}DH</div>
                <div id="newPrice2">{item.newPrice}DH</div>
              </div>
              <div id="AddToCart2">
                <button id="Add2" onClick={() => addToCart(item.id)}>
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CartPage;