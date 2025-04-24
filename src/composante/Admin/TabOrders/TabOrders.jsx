import React , {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./TabOrders.css";

function TabOrders(){
    const [orders, setOrders]= useState([]);
    
    //return(
        // <div className="divContentOrder">
        // <h1 className="CustomerOrder">Customer Order</h1>
        // <table className="TableOrders">
        //     <thead className="thOrders">
        //         <tr>
        //             <th>Order ID</th>
        //             <th>Client ID</th>
        //             <th>Items</th>
        //             <th>Restaurant</th>
        //             <th>Delivery Address</th>
        //             <th>Total</th>
        //             <th>Order Date</th>
        //             <th>Payment Date</th>
        //             <th>Is Paid</th>
        //             <th>Status</th>
        //             <th>Details</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {orders.map(order=>(
        //             <tr className="trOrders" key={order.id}>
        //                 <td>{order.id}</td>
        //                 <td>{order.userId}</td>
        //                 <td>{order.items.map(item => item.name).join(", ")}</td>
        //                 <td>{order.restaurant.name}</td>
        //                 <td>{order.deliveryAddress.city}, {order.deliveryAddress.street}</td>
        //                 <td>{order.totalPrice}DH</td>
        //                 <td>{new Date(order.orderDate).toLocaleString()}</td>
        //                 <td>{order.paymentDate ? new Date(order.paymentDate).toLocaleString() : "N/A"}</td>
        //                 <td>{order.isPaid ? "Yes" : "No"}</td>
        //                 <td>{order.status}</td>
        //                 <td><Link to={`/admin/Orders/${order.id}`}>Click For Details</Link></td>
        //             </tr>
        //         ))}
        //     </tbody>
        // </table>
        // </div>
    //);
}
export default TabOrders ;