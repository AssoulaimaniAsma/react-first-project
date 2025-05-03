import React, { useState, useEffect } from "react";
import "./TabRestaurant.css";
import {FaTrash, FaBan, FaCheck, FaTimes} from "react-icons/fa";
import {Link,useNavigate} from "react-router-dom";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

function TabRestaurant() {
  const [restaurants, setRestaurant] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery]=useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage] = useState(8);
  // Filter restaurants based on the search query, with safeguards for undefined values
  const filteredRestaurants = restaurants.filter((restaurant) =>
    (restaurant.title ? restaurant.title.toLowerCase() : "")
    .includes(searchQuery.toLowerCase()) ||
    (restaurant.contactEmail ? restaurant.contactEmail.toLowerCase() : "")
    .includes(searchQuery.toLowerCase()) ||
    (restaurant.phone ? restaurant.phone.toLowerCase() : "")
    .includes(searchQuery.toLowerCase()) ||
    (restaurant.status ? restaurant.status.toLowerCase() : "")
    .includes(searchQuery.toLowerCase()) 
);
    const indexOfLastRestaurant = currentPage * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;

    // Obtenez les commandes pour la page actuelle (en combinant avec le filtre de recherche)
    const currentRestaurants = filteredRestaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

    // Fonction pour changer de page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredRestaurants.length / restaurantsPerPage)) {
          setCurrentPage(currentPage + 1);
        }
      };
      
      const prevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
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
        setCurrentPage(1);
    };

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
    const fetchRestaurantDetails = async (restaurantID) => {
      const token = localStorage.getItem("authToken");
      if (!token) return navigate("/admin/login");
    
      try {
        const res = await fetch(`http://localhost:8080/admin/restaurants/${restaurantID}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
    
        if (res.ok) {
          const data = await res.json();
          setRestaurantDetails(data);
        } else {
          const errorData = await res.json();
          console.error("Server Error:", errorData);
        }
      } catch (error) {
        console.error("Network or Parsing Error", error);
      }
    };
    
    const handleBan = async (restaurantID) => {
      const token = localStorage.getItem("authToken");
      if (!token) return navigate("/admin/login");
      
      const confirmBan = window.confirm("Are you sure you want to ban this restaurant?");
      if (!confirmBan) return;
      
      try {
        const res = await fetch(`http://localhost:8080/admin/restaurants/${restaurantID}/ban`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });
        
        const text = await res.text(); // log even if not ok
        console.log("Raw response from /ban:", text);
        
        if(res.ok){
          const updatedRestaurant = restaurants.find(restaurant => restaurant.id === restaurantID);
      if (updatedRestaurant?.status === "BANNED") {
          setPopupMessage("User is unbanned.");
          setShowPopup(true);
      } else {
          setRestaurant((prev) => prev.filter((restaurant) => restaurant.id !== restaurantID));
          setPopupMessage("User has been banned successfully.");
      }
      }else{
          const errorText =  await res.text();
          console.error("Error message:", errorText);
      }
      } catch (error) {
          console.error("Error banning restaurant:", error);
          setPopupMessage("An error occurred.");
          setShowPopup(true);
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

        const rejectRestaurant = async (restaurantID) => {
          const token = localStorage.getItem("authToken");
          if (!token) return navigate("/admin/login");
        
          try {
            const res = await fetch(`http://localhost:8080/admin/restaurants/${restaurantID}/decline`, {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
        
            if (res.ok) {
              setRestaurant((prev) =>
                prev.map((restaurant) =>
                  restaurant.id === restaurantID
                    ? { ...restaurant, status: "DECLINED" }
                    : restaurant
                )
              );
              setPopupMessage("User has been declined successfully.");
              setShowPopup(true);
            } else {
              const errorText = await res.text();
              console.error("Error message:", errorText);
            }
          } catch (error) {
            console.error("Error declining restaurant:", error);
            setPopupMessage("An error occurred.");
            setShowPopup(true);
          }
        };
        
        useEffect(() => {
                Modal.setAppElement('#root'); // Set the app element for accessibility
              }, []);

        const openModal = async (restaurant) => {
          console.log("Opening modal for restaurant:", restaurant); // Check if this is logged when clicking
          setSelectedRestaurant(restaurant);
          await fetchRestaurantDetails(restaurant.id);
          setIsModalOpen(true);
        };
        
        const closeModal = () => {
          console.log("Closing modal");
          setIsModalOpen(false);
          setSelectedRestaurant(null);
        };
        
      
  return (
    <div className="DivTableRestaurant">
      <h1 className="restaurants">Restaurants</h1>
      <input 
          type="text" 
          placeholder="Search For Client" 
          value={searchQuery}
          onChange={handleSearch} 
          className="searchBar"
      />
      <table className="TableRestaurant">
        <thead>
          <tr className="trTableRestaurant">
            <th>ID</th>
            <th>Restaurant Name</th>
            <th>Phone</th>
            <th>Contact Email</th>
            <th>Ban Status</th>
            <th>Action</th>
            <th>Delete</th>
            <th>Ban</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredRestaurants.map((restaurant) => (
            <tr key={restaurant.id}>
              <td className="tdTableRestaurant">{restaurant.id}</td>
              <td className="tdTableRestaurant">{restaurant.title}</td>
              <td className="tdTableRestaurant">{restaurant.phone}</td>
              <td className="tdTableRestaurant">{restaurant.contactEmail}</td>
              <td className="tdTableRestaurant">{restaurant.status}</td>
              <td className="tdTableRestaurant">
                {restaurant.status === "PENDING_APPROVAL" && (
                  <>
                    <button 
                      className="btn-approve" 
                      onClick={() => approveRestaurant(restaurant.id)} 
                      title="Approve"
                    >
                      <FaCheck />
                    </button>
                    <button 
                      className="btn-decline" 
                      onClick={() => rejectRestaurant(restaurant.id)} 
                      title="Reject"
                    >
                      <FaTimes />
                    </button>
                  </>
                )}
              </td>

              <td><Link className="DeleteRestaurant" onClick={()=> handleDelete(restaurant.id)}><FaTrash/>Delete</Link></td> 
              <td><Link className="BanRestaurant" onClick={()=> handleBan(restaurant.id)}><FaBan/>Ban</Link></td> 
              <td><button onClick={() => openModal(restaurant)} className="DetailsRestaurant"> More Details</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
            &laquo; Précédent
        </button>
        
        {Array.from({ length: Math.ceil(filteredRestaurants.length / restaurantsPerPage) }).map((_, index) => (
            <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
            >
            {index + 1}
            </button>
        ))}
        
        <button 
            onClick={nextPage} 
            disabled={currentPage === Math.ceil(filteredRestaurants.length / restaurantsPerPage)}
        >
            Suivant &raquo;
        </button>
        </div>
      {selectedRestaurant && (
                <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
              contentLabel="restaurant Details"
              style={{
                  content: {
                    border: '1px solid #ccc',          // thinner, subtle border
                    padding: '2rem',
                    borderRadius: '10px',
                    marginLeft:'10%',
                    background: '#fff',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    width: '70%',  
                    height: 'auto',                    // adjust based on content
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    transform: 'translate(-50%, -50%)', // perfect centering
                  },
                  overlay: {
                    backgroundColor: 'rgba(228, 228, 228, 0.5)'
                  }
              }}
                
            >
              <div className="RestaurantDetails">
              <button className="Close" onClick={closeModal}><AiOutlineClose/></button>
              <br/><br/>
                <h2 className="RestaurantDetailsh2" >Restaurant Details</h2>
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
          {restaurantDetails ? (
            <tr>
              <td className="tdRestaurantDetails">{restaurantDetails.id}</td>
              <td className="tdRestaurantDetails">
                <img 
                  src={restaurantDetails.profileImg} 
                  alt="Restaurant Profile" 
                  className="restaurant-profile-img" 
                />
              </td>
              <td className="tdRestaurantDetails">{restaurantDetails.title}</td>
              <td className="tdRestaurantDetails">{restaurantDetails.shippingFees}</td>
              <td className="tdRestaurantDetails">
                {restaurantDetails.addressShortDTO?.title} /
                {restaurantDetails.addressShortDTO?.commune} /
                {restaurantDetails.addressShortDTO?.province} /
                {restaurantDetails.addressShortDTO?.region}
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan="5">No details available</td>
            </tr>
          )}
        </tbody>
                </table>
                
            </div>
              </Modal>
            )}
      {showPopup && (
            <div className="popup-overlay">
                <div className="popup-content">
                <p>{popupMessage}</p>
                <button onClick={() => setShowPopup(false)}>OK</button>
                </div>
            </div>
            )}
    </div>
  );
}

export default TabRestaurant;
