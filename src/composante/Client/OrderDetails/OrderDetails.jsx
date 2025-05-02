import React, { useState, useEffect, useContext } from "react";
import {useNavigate,useParams} from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";
import "./OrderDetails.css";

function OrderDetails() {
      const navigate = useNavigate();
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(true);
      const [Foods,setFoods] = useState([]);
      const [showPopup, setShowPopup] = useState(false);
      const [popupMessage, setPopupMessage] = useState("");
      const {orderID} =useParams();
      const [recommendation, setRecommandation] = useState([]);
      const token = localStorage.getItem("authToken");
      useEffect(() => {
        if (!token) return navigate("/client/signin");
        fetchCart();
      }, []);
      // Fetch cart when the component mounts
      const fetchCart = async () => {

        try {
          const res = await fetch(`http://localhost:8080/user/orders/placedOrders/${orderID}/orderItems`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          setFoods(data); // Update the foods state with cart data
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch data");
          setLoading(false);
        }
      };

      useEffect(() => {
          const fetchRecommendations = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) return navigate("/client/signin");
      
            try {
              const res = await fetch("http://localhost:8080/user/cart/youMayAlsoLike", {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              const data = await res.json();
              setRecommandation(data);
              setLoading(false);
            } catch (err) {
              setError("Failed to fetch data");
              setLoading(false);
            }
          };
      
      
          fetchRecommendations();
        }, [navigate]);

      
    
      if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const subtotal = Foods.reduce((acc, item) => acc + item.totalPrice, 0);
    const shipping = subtotal * 0.1;
    const total = subtotal + shipping;

  return (
    <div className="tableContainer">
      <table className="order">
        <thead>
            <tr>
                <th colSpan={3}>Order Details</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Product</td>
                <td>Quantity</td>
                <td>Subtotal</td>
            </tr>
            {Foods.length === 0 ? (
                <tr><td colSpan={3}>No items in the cart</td></tr>
            ) : (
                Foods.map((item) => {
                const food = item.food;
                
                if (!food || !food.title || !item.quantity || !food.price) return null;
                
                const subtotal = food.discountedPrice ? food.discountedPrice * item.quantity : food.price * item.quantity;

                return (
                    <tr key={item.itemID}>
                    <td className="tdOrderDetails">{food.title}</td>
                    <td className="tdOrderDetails">{item.quantity}</td>
                    <td className="tdOrderDetails">{subtotal}</td>
                    </tr>
                );
                })
            )}
              <tr>
              <td>Subtotal</td>
              <td className="tdOrderDetails1" colSpan={2}>{subtotal.toFixed(2)} MAD</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td className="tdOrderDetails1" colSpan={2}>{shipping.toFixed(2)} MAD</td>
            </tr>
            <tr>
              <td>Total</td>
              <td className="tdOrderDetails1" colSpan={2}>{total.toFixed(2)} MAD</td>
            </tr>
        </tbody>

      </table>
    </div>
  );
}

export default OrderDetails;
