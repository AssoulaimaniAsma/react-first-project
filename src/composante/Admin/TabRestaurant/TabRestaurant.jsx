import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TabRestaurant.css";

function TabRestaurant() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/restaurant")
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des restaurants:", error);
      });
  }, []);

  const approveRestaurant = (id) => {
    axios
      .get(`http://localhost:8080/admin/approveRestaurants/${id}`)
      .then((response) => {
        alert(response.data);
        setRestaurants((prev) =>
          prev.map((restaurant) =>
            restaurant.id === id
              ? { ...restaurant, isApproved: true }
              : restaurant
          )
        );
      })
      .catch((error) => {
        console.error("Erreur lors de l'approbation du restaurant", error);
        alert("Erreur lors de l'approbation du restaurant");
      });
  };

  return (
    <div className="DivTableRestaurant">
      <h1 className="restaurants">Restaurants</h1>
      <table className="TableRestaurant">
        <thead>
          <tr className="trTableRestaurant">
            <th>ID</th>
            <th>Title</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Contact Email</th>
            <th>PayPal Email</th>
            <th>Role</th>
            <th>Approved</th>
            <th>Verified</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((r) => (
            <tr key={r.id}>
              <td className="tdTableRestaurant">{r.id}</td>
              <td className="tdTableRestaurant">{r.title}</td>
              <td className="tdTableRestaurant">{r.address}</td>
              <td className="tdTableRestaurant">{r.phone}</td>
              <td className="tdTableRestaurant">{r.contact_Email}</td>
              <td className="tdTableRestaurant">{r.paypal_Email}</td>
              <td className="tdTableRestaurant">{r.role}</td>
              <td className="tdTableRestaurant">
                {r.isApproved === null
                  ? "Not Yet"
                  : r.isApproved
                  ? "Approved"
                  : "Rejected"}
              </td>
              <td className="tdTableRestaurant">
                {r.isVerified ? "Yes" : "No"}
              </td>
              <td className="tdTableRestaurant">
                {r.isApproved === null && (
                  <button onClick={() => approveRestaurant(r.id)}>
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
