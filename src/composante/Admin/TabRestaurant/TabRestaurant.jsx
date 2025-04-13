import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TabRestaurant.css";

function TabRestaurant() {
  const [restaurants, setRestaurant] = useState([]);
  useEffect(() => {
    // Récupérer les données depuis le serveur
    axios
      .get("http://localhost:8080/api/restaurant")
      .then((response) => {
        setRestaurant(response.data); // Met à jour l'état avec les données reçues
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des restaurant:", error);
      });
  }, []);

  // Function to handle approving a restaurant
  const approveRestaurant = (id) => {
    axios
      .get(`http://localhost:8080/admin/approveRestaurants/${id}`)
      .then((response) => {
        alert(response.data); // You can show a success message
        // Optionally, re-fetch the restaurant data to update the UI
        setRestaurant((prevRestaurants) =>
          prevRestaurants.map((restaurant) =>
            restaurant.id === id
              ? { ...restaurant, approved: true }
              : restaurant
          )
        );
      })
      .catch((error) => {
        console.error("Error approving restaurant", error);
        alert("Error approving the restaurant");
      });
  };
  return (
    <div className="DivTableRestaurant">
      <h1 className="restaurants">Restaurant</h1>
      <table className="TableRestaurant">
        <thead>
          <tr className="trTableRestaurant">
            <th>UserID</th>
            <th>Restaurant Name</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Approved</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => (
            <tr key={restaurant.id}>
              <td className="tdTableRestaurant">{restaurant.id}</td>
              <td className="tdTableRestaurant">{restaurant.RestaurantName}</td>
              <td className="tdTableRestaurant">{restaurant.phone}</td>
              <td className="tdTableRestaurant">{restaurant.mail}</td>
              <td className="tdTableRestaurant">
                {restaurant.isApproved === null
                  ? "Not Yet Approved"
                  : restaurant.isApproved === true
                  ? "Approved"
                  : "Not Approved"}
              </td>
              <td>
                {restaurant.isApproved === null && (
                  <button onClick={() => approveRestaurant(restaurant.id)}>
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TabRestaurant;
