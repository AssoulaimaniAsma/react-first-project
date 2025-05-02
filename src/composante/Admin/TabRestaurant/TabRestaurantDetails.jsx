import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function TabRestaurantDetails() {
    const { id } = useParams();  // Get the restaurant ID from the URL
    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const [restaurantRegistration, setRestaurantRegistration] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Fetch restaurant details from endpoint 1 (restaurant profile)
    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            const token = localStorage.getItem("authToken");

            if (!token) return navigate("/admin/login");

            try {
                const res = await fetch(`http://localhost:8080/admin/restaurants/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    setRestaurantDetails(data);  // Store restaurant details
                } else {
                    const errorData = await res.json();
                    console.error("Server Error:", errorData);
                }
            } catch (error) {
                console.error("Network or Parsing Error", error);
            }
        };

        fetchRestaurantDetails();
    }, [id, navigate]);

    return (
        <div className="divContentRestaurantDetails">
            <h2 className="RestaurantDetails">Restaurant Details</h2>
            {restaurantDetails  ? (
                <div>
                    <table className="TableRestaurantDetails">
                        <thead>
                            <tr className="trRestaurantDetails">
                                <th>Restaurant ID</th>
                                <th>Profile Image</th>
                                <th>Restaurant Name</th>
                                <th>Shipping Fees</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="tdRestaurantDetails">{restaurantDetails.id}</td>
                                <td className="tdRestaurantDetails">{restaurantDetails.profileImg}</td>
                                <td className="tdRestaurantDetails">{restaurantDetails.title}</td>
                                <td className="tdRestaurantDetails">{restaurantDetails.shippingFees}</td>
                                <td className="tdRestaurantDetails">
                                    {restaurantDetails.addressShortDTO?.title} /
                                    {restaurantDetails.addressShortDTO?.commune} /
                                    {restaurantDetails.addressShortDTO?.province} /
                                    {restaurantDetails.addressShortDTO?.region}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Loading restaurant details...</p>
            )}
        </div>
    );
}

export default TabRestaurantDetails;
