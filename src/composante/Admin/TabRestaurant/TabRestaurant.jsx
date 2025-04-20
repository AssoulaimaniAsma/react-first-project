import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TabRestaurant.css";
import {FaTrash} from "react-icons/fa";
import {Link,useNavigate} from "react-router-dom";

function TabRestaurant() {
  const [restaurants, setRestaurant] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery]=useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
          const fetchRestaurants = async () => {
              const token = localStorage.getItem("authToken");
      
              if (!token) return navigate("/admin/login");
      
              try {
                  const res = await fetch(`http://localhost:8080/admin/restaurants/`, {
                      method: "GET",
                      headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json",
                      },
                  });
      
                  if (res.ok) {
                      const data = await res.json();
                      setRestaurant(data);
                  } else {
                      const errorData = await res.json();
                      console.error("Erreur server :", errorData);
                  }
              } catch (error) {
                  console.error("erreur reseau ou parsing", error);
              }
          };
      
          fetchRestaurants();
      }, [navigate]);
      
  
  
      
  
    // Handle search input change
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

      // Filter restaurants based on the search query, with safeguards for undefined values
    const filteredRestaurants = restaurants.filter((restaurant) =>
        (restaurant.firstName ? restaurant.firstName.toLowerCase() : "")
        .includes(searchQuery.toLowerCase()) ||
        (restaurant.lastName ? restaurant.lastName.toLowerCase() : "")
        .includes(searchQuery.toLowerCase()) ||
        (restaurant.email ? restaurant.email.toLowerCase() : "")
        .includes(searchQuery.toLowerCase()) ||
        (restaurant.phone ? restaurant.phone.toLowerCase() : "")
        .includes(searchQuery.toLowerCase()) ||
        (restaurant.status ? restaurant.status.toLowerCase() : "")
        .includes(searchQuery.toLowerCase()) 
    );

    const handleDelete = async (restaurantID) => {
        const token = localStorage.getItem("authToken");

    if (!token) return navigate("/admin/login");
        const confirmDelete = window.confirm("Are you sure you want to delete this restaurant?");
        if (!confirmDelete) return;
    
        try {
            const res = await fetch(`http://localhost:8080/admin/restaurants/${restaurantID}`, {
                method: "DELETE",
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                console.log("Client deleted successfully");
                setRestaurant((prev) => {
                    console.log(prev); // Vérifie l'état précédent
                    return prev.filter((restaurant) => restaurant.id !== restaurantID);
                });
            } else {
                console.error(`Failed to delete the restaurant. Status: ${res.status}`);
                const errorText =  await res.text();
                console.error("Error message:", errorText);
            }
        } catch (error) {
            console.error("Error deleting restaurant:", error);
        }
    };
    const handleBan = async (restaurantID) => {
        const token = localStorage.getItem("authToken");
        if(!token) return navigate("/admin/login");

        const confirmBan = window.confirm("Are you sure you want to ban this restaurant?");
        if (!confirmBan) return;

        try{
            const res = await fetch(`http://localhost:8080/admin/restaurants/${restaurantID}/ban`,{
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if(res.ok){
                const updatedRestaurant = restaurants.find(restarant => restarant.id === restaurantID);
            if (updatedRestaurant?.status === "BANNED") {
                setPopupMessage("User is already banned.");
                setShowPopup(true);
            } else {
                setRestaurant((prev) => prev.filter((restaurant) => restaurant.id !== restaurantID));
                setPopupMessage("User has been banned successfully.");
            }
            }else{
                const errorText =  await res.text();
                console.error("Error message:", errorText);
            }
        }catch(error){
            console.error("Error Banning restaurant :",error);
        }
        };

        const approveRestaurant = async (restaurantID) => {
          const token = localStorage.getItem("authToken");
        if(!token) return navigate("/admin/login");

        try{
            const res = await fetch(`http://localhost:8080/admin/restaurants/${restaurantID}/approve`,{
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if(res.ok){
                const updatedRestaurant = restaurants.find(restarant => restarant.id === restaurantID);
            if (updatedRestaurant?.Approve === "APPROVED") {
                setPopupMessage("User is already approved.");
                setShowPopup(true);
            } else if(updatedRestaurant?.Approve === "REJECTED") {
              setPopupMessage("User is already rejected.");
              setShowPopup(true);
          }
            else {
                setRestaurant((prev) => prev.filter((restaurant) => restaurant.id !== restaurantID));
                setPopupMessage("User has been approved successfully.");
            }
            }else{
                const errorText =  await res.text();
                console.error("Error message:", errorText);
            }
        }catch(error){
            console.error("Error approving restaurant :",error);
        }
        };
      
  return (
    <div className="DivTableRestaurant">
      <h1 className="restaurants">Restaurants</h1>
      <table className="TableRestaurant">
        <thead>
          <tr className="trTableRestaurant">
            <th>ID</th>
            <th>Restaurant Name</th>
            <th>Email </th>
            <th>Phone</th>
            <th>Title</th>
            <th>Street</th>
            <th>RegionID</th>
            <th>CommuneID</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>IsDefault</th>
            <th>Is Coordination Activated</th>
            <th>Shipped Fees</th>
            <th>PayPal Email</th>
            <th>Contact Email</th>
            <th>Approve</th>
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
              {/* <td className="tdTableRestaurant">
                {restaurant.isApproved === null && (
                  // <button onClick={() => approveRestaurant(restaurant.id)}>
                  //   Approve
                  // </button>
                )}
              </td> */}
              {/* <td><Link className="DeleteRestaurant" onClick={()=> HandleDelete(restaurant.id)}><FaTrash/>Delete</Link></td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabRestaurant;
