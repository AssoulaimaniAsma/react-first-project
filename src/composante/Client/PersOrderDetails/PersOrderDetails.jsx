import React, { useState, useEffect } from "react";
import {useNavigate,useParams} from "react-router-dom";
import axios from "axios";
import "./PersOrderDetails.css";

function PersOrderDetails() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        title: "",
        region: "",
        province: "",
        commune: "",
        street: "",
        isDefault: false,
        oldPassword: "",
        newPassword: "",
      });
      const navigate = useNavigate();
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(true);
      const [Foods,setFoods] = useState([]);
      const [regions, setRegions] = useState([]);
      const [provinces, setProvinces] = useState([]);
      const [communes, setCommunes] = useState([]);
      const [showPopup, setShowPopup] = useState(false);
      const [popupMessage, setPopupMessage] = useState("");
      const {orderID} =useParams();
      const [hasDefault, setHasDefault] = useState(false);


      const checkHasDefaultAddress = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) return navigate("/client/signin");
        try{
        const response = await fetch('http://localhost:8080/user/address/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      
        if (!response.ok) {
          throw new Error("Failed to check default address");
        }
      
        const addresses = await response.json();
      
        // Check if any address has isDefault === true
        const hasDefault = addresses.some(address => address.isDefault === true);
        setHasDefault(hasDefault);
      }catch(error){
        console.error("Error checking default address", error);
      }
      };

      
      // Fetch cart when the component mounts
        const fetchCart = async () => {
          const token = localStorage.getItem("authToken");
          if (!token) return navigate("/client/signin");
      
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
          fetchCart(); // Fetch cart data when component mounts
          checkHasDefaultAddress();
        }, []);

        useEffect(() => {
          const fetchAccountDetails = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) return navigate("/client/signin");
        
            try {
              const response = await axios.get("http://localhost:8080/user/accountDetails", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
        
              const accountData = response.data;
              console.log("Account data:", accountData);
        
              // Update formData with fetched email (and optionally other fields if you want)
              setFormData(prev => ({
                ...prev,
                email: accountData.email,  // assuming the API returns { email: "user@example.com", ... }
              }));
        
            } catch (error) {
              console.error("Failed to fetch account details:", error);
            }
          };
        
          fetchAccountDetails();
        }, []);
        

      useEffect(() => {
        axios.get("http://localhost:8080/public/addressDetails/Regions")
          .then(res => setRegions(res.data))
          .catch(err => console.error("Regions loading error", err));
      }, []);
    
      useEffect(() => {
        if (formData.region) {
          axios.get(`http://localhost:8080/public/addressDetails/Provinces?regionID=${formData.region}`)
            .then(res => setProvinces(res.data))
            .catch(err => console.error("Provinces loading error", err));
        }
      }, [formData.region]);
    
      useEffect(() => {
        if (formData.province) {
          axios.get(`http://localhost:8080/public/addressDetails/Communes?provinceID=${formData.province}`)
            .then(res => setCommunes(res.data))
            .catch(err => console.error("Communes loading error", err));
        }
      }, [formData.province]);
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
        }));
      };

      const hasDefaultAddress = async (token) => {
        const response = await fetch('http://localhost:8080/user/address/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      
        if (!response.ok) {
          throw new Error("Failed to check default address");
        }
      
        const addresses = await response.json();
        return addresses.some(address => address.isDefault === true);
      };
      
      
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("authToken");
        if (!token) return navigate("/client/signin");
      
        const formDataToSend = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          oldPassword: "", 
          newPassword: "",
        };
        
        const formDataToSend1 = {
          title: formData.title,
          street: formData.street,
          regionID: Number(formData.region),
          provinceID: Number(formData.province),
          communeID: Number(formData.commune),
          isDefault: !hasDefault ? formData.isDefault : false,
        };
      
        if (
          !formData.firstName || !formData.lastName || !formData.phone ||
          !formData.title || !formData.street || !formData.region ||
          !formData.province || !formData.commune
        ) {
          alert("Please fill all the fields!");
          return;
        }
      
        let res, res1;
      
        try {
          console.log("Sending this to updateAccountDetails:", formDataToSend);
          res = await fetch('http://localhost:8080/user/updateAccountDetails', {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataToSend),
          });
      
          if (res.ok) {
            const text = await res.text();
            console.log("Account updated successfully:", text);
          } else {
            console.error("Failed to update account details");
            return;
          }
      
        } catch (error) {
          console.error("Error updating account", error);
          return;
        }
      
        try {
          res1 = await fetch('http://localhost:8080/user/address/addAddress', {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataToSend1),
          });
      
          if (res1.ok) {
            await checkHasDefaultAddress();
            const text1 = await res1.text();
            console.log("Address updated successfully:", text1);
          } else {
            console.error("Failed to add address");
            return;
          }
      
        } catch (error) {
          console.error("Error adding address", error);
          return;
        }
      
     
        if (res.ok && res1.ok) {
          console.log("Navigating to checkout with Order ID:", orderID);
          localStorage.setItem("selectedAddress", JSON.stringify(formDataToSend1));
          navigate(`/client/checkout/${orderID}`, {
            state: {
              fromPersOrderDetails: true
            }
          });
        }
      };
      
    
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
    <div className="tablesContainer">
      <form onSubmit={handleSubmit} >
        <table className="table1">
          <thead>
            <tr>
              <th colSpan={2}>Personal Information</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td colSpan={2}>
                <div className="flex-container">
                    <div className="input-group">
                    <label className="addressInfo">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} 
                        pattern="^[A-Za-zÀ-ÿ -]+$"
                        title="First name should only contain letters"
                        required />
                    </div>
                    <div className="input-group">
                    <label className="addressInfo">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName}
                        onChange={handleChange} 
                        pattern="^[A-Za-zÀ-ÿ -]+$"
                        title="Last name should only contain letters"
                        required />
                    </div>
                    <div className="input-group">
                    <label className="addressInfo">Phone Number</label>
                    <input type="text" name="phone" value={formData.phone}
                        onChange={handleChange} 
                        pattern="^(\+2126\d{8}|06\d{8}|+2127\d{8}|07\d{8})$"
                        title="Phone number must start with +2126 or 06 or +2127 or 07followed by 8 digits"
                        required />
                    </div>
                    <div className="input-group">
                    <label className="addressInfo">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Home, Office"
                        required
                    />
                    </div>
                    <div className="input-group">
                    <label className="addressInfo" >Street</label>
                    <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        placeholder="Street, building number, etc."
                        required
                    />
                    </div>
                </div>
                </td>
            </tr>

            {/* Centered Region, Province, Commune */}
            <tr>
                <td colSpan={2}>
                <div className="center-container">
                    <div className="input-group">
                    <label className="addressInfo">Region</label>
                    <select
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        >
                        <option value="">Select Region</option>
                        {regions.map(r => (
                        <option key={r.id} value={r.id}>{r.regionName}</option>
                        ))}
                    </select>
                    </div>

                    <div className="input-group">
                    <label className="addressInfo">Province</label>
                    <select
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                    >
                        <option value="">Select Province</option>
                        {provinces.map(p => (
                        <option key={p.id} value={p.id}>{p.provinceName}</option>
                        ))}
                    </select>
                    </div>

                    <div className="input-group">
                    <label className="addressInfo">Commune</label>
                    <select
                        name="commune"
                        value={formData.commune}
                        onChange={handleChange}
                        >
                        <option value="">Select Commune</option>
                        {communes.map(c => (
                          <option key={c.id} value={c.id}>{c.communeName}</option>
                        ))}
                    </select>
                    </div>
                </div>
                </td>
            </tr>

            {!hasDefault && (
              <tr>
                <td colSpan={2} style={{ textAlign: 'center' }}>
                  <label>
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={formData.isDefault}
                      onChange={handleChange}
                    />
                    Make this my default address
                  </label>
                </td>
              </tr>
            )}
            {/* Submit Button */}
            <tr>
                <td colSpan={2} style={{ textAlign: 'center' }}>
                <button type="submit" className="mt-4">
                    Submit
                </button>
                </td>
            </tr>
            </tbody>

        </table>
      </form>
      
      <table className="orderDetails">
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

export default PersOrderDetails;
