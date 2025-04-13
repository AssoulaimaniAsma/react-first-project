import React , {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import "./TabOrders.css";

function TabOrders(){
    const [orders, setOrders]= useState([]);
    useEffect(() => {
        // Récupérer les données depuis le serveur
        axios
        .get("http://localhost:3006/orders")
        .then((response) => {
            setOrders(response.data); // Met à jour l'état avec les données reçues
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des produits:", error);
        });
    }, []);
    return(
        <div className="divContentOrder">
        <h1 className="CustomerOrder">Customer Order</h1>
        <table className="TableOrders">
            <thead className="thOrders">
                <tr>
                    <th>Order ID</th>
                    <th>Client Name</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order=>(
                    <tr className="trOrders" key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.clientName}</td>
                        <td>{order.items.map(item => item.name).join(", ")}</td>
                        <td>{order.total}DH</td>
                        <td>{order.status}</td>
                        <td>{order.date}</td>
                        <td><Link to={`/admin/Orders/${order.id}`}>Click For Details</Link></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}
export default TabOrders ;