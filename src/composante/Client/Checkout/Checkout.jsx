import React, {useState, useEffect, useContext} from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";
import { FaCheckCircle } from "react-icons/fa";
import "./Checkout.css";
export default function Checkout(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [accountDetailsFilled, setAccountDetailsFilled] = useState(false);
    const {orderID} =useParams();
    const location = useLocation();
    const [newAddress, setNewAddress] = useState(null); // holds newly submitted address
    const [savedAddresses, setSavedAddresses] = useState([]); // fetched from backend
    const [selectedAddress, setSelectedAddress] = useState(null); 
    
    const { cart, AddToCart, orderDetails,incrementItem,decrementItem ,updateQuantity, removeItem, clearCart } = useContext(CartContext);
    const [formData, setFormData] = useState({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          oldPassword: "",
          newPassword: "",
        });

        useEffect(() => {
          if (newAddress) {
            // If user submitted a new address, use it for checkout
            setSelectedAddress(newAddress);
          } else if (savedAddresses.length > 0) {
            // If no new address, fallback to default saved address
            const defaultAddress = savedAddresses.find(addr => addr.isDefault);
            if (defaultAddress) {
              setSelectedAddress(defaultAddress);
            } else {
              // Fallback to first address if no default is set
              setSelectedAddress(savedAddresses[0]);
            }
          }
        }, [newAddress, savedAddresses]);
        const hasDefaultAddress = async () => {
          const token = localStorage.getItem("authToken");
          if (!token) return navigate("/client/signin");
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
        
          return hasDefault; // true if exists, false otherwise
        };


        useEffect(() => {
          const fetchDataAndCheckout = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) return navigate("/client/signin");
        
            const skipValidation = location.state?.fromPersOrderDetails;
        
            try {
              const [accountResponse, addressResponse] = await Promise.all([
                fetch("http://localhost:8080/user/accountDetails", {
                  method: "GET",
                  headers: { Authorization: `Bearer ${token}` },
                }),
                fetch("http://localhost:8080/user/address/", {
                  method: "GET",
                  headers: { Authorization: `Bearer ${token}` },
                }),
              ]);
        
              const accountData = await accountResponse.json();
              const addressList = await addressResponse.json();
        
              const defaultAddress = addressList.find((addr) => addr.isDefault);
        
              if (!skipValidation) {
                const isAccountIncomplete = !accountData.firstName || !accountData.lastName || !accountData.email || !accountData.phone;
                if (isAccountIncomplete || !defaultAddress) {
                  return navigate(`/client/PersOrderDetails/${orderID}`);
                }
              }
        
              setSelectedAddress(defaultAddress || addressList[0]);
              setAccountDetailsFilled(true);
        
              const res1 = await fetch(
                `http://localhost:8080/user/orders/placedOrders/${orderID}/checkout?addressID=${(defaultAddress||addressList[0]).id}`,
                {
                  method: "PUT",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );
        
              if (res1.ok) {
                const text1 = await res1.text();
                console.log("Your orders have been confirmed", text1);
                clearCart();
                localStorage.removeItem("selectedAddress");
              } else {
                console.error("Failed to confirm your order");
              }
            } catch (err) {
              console.error("Error fetching account or address data:", err);
              navigate(`/client/PersOrderDetails/${orderID}`);
            } finally {
              setLoading(false);
            }
          };
        
          fetchDataAndCheckout();
        }, [navigate, orderID]);


    if(loading){
        return <div>Loading...</div>
    }
    if(!accountDetailsFilled){
        return null;
    }
    return(
        <div className="CheckoutWrapper">
            <div className="CheckoutContent">
            <FaCheckCircle className="VerifyIcon" />

                <h2 className="h2content7">Thank You!</h2>
                <p>Your order has been confirmed & it is on the way. Check your email <br/>for the details</p>
                <div className="buttonCheckoutContent">
                    <button onClick={() => navigate("/client/home")} className="NavigateHome">Go to Homepage</button>
                    <button onClick={() => navigate("/client/CartPage")} className="NavigateOrder">Check Order Details</button>
                </div>
            </div>
        </div>
    );
}