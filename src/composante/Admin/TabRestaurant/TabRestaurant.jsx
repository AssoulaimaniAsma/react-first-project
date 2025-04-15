import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TabRestaurant.css";
import {FaTrash} from "react-icons/fa";
import {Link} from "react-router-dom";

function TabRestaurant() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3004/restaurant")
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des restaurants:", error);
      });
  }, []);

  const approveRestaurant = (id) => {
    axios
      .get(`http://localhost:3004/restaurant`)
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

  const HandleDelete = async (id) =>{
    const confirm=window.confirm("Are you sure you want to delete this restaurant")
    if(!confirm) return;

    try{
      const res= await fetch ("http://localhost:/3004/restaurant",{
        method : "DELETE",
      });

      if(res.ok){
        setRestaurants((prev) => prev.filter((user) => user.id !== id));
      }
      else{
        console.error("Failed to delete the user");
      }
    }catch(error){
      console.error("Error deleting user",error);
    }
  }
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
            <th>Approved</th>
            <th>Verified</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => (
            <tr key={restaurant.id}>
              <td className="tdTableRestaurant">{restaurant.id}</td>
              <td className="tdTableRestaurant">{restaurant.title}</td>
              <td className="tdTableRestaurant">{restaurant.address}</td>
              <td className="tdTableRestaurant">{restaurant.phone}</td>
              <td className="tdTableRestaurant">{restaurant.contact_Email}</td>
              <td className="tdTableRestaurant">{restaurant.paypal_Email}</td>
              <td className="tdTableRestaurant">
                {restaurant.isApproved === null? "Not Yet"
                  : restaurant.isApproved? "Approved"
                  : "Rejected"}
              </td>
              <td className="tdTableRestaurant">
                {restaurant.isVerified ? "Yes" : "No"}
              </td>
              <td className="tdTableRestaurant">
                {restaurant.isApproved === null && (
                  <button onClick={() => approveRestaurant(restaurant.id)}>
                    Approve
                  </button>
                )}
              </td>
              <td><Link className="DeleteRestaurant" onClick={()=> HandleDelete(restaurant.id)}><FaTrash/>Delete</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabRestaurant;
