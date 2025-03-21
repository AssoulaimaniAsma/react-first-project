import React, { useState } from "react";
import "./CartPage.css";

function CartPage(){
    const Products =[
        {id: 1 , image: "URL1", name: "item1" , price: 180, quantity : 1 },
        {id: 2 , image: "URL1", name: "item2" , price: 40, quantity : 1 },
        {id: 3 , image: "URL1", name: "item3" , price: 80, quantity : 1 }
    ];
    const recommendation=[
        {id:"x", image: require("../../image/pizza.png"), name: "item x", oldPrice:200, newPrice: 140},
        {id:"y", image: require("../../image/pizza.png"), name: "item y", oldPrice:230, newPrice: 200},
        {id:"z", image: require("../../image/pizza.png"), name: "item z", oldPrice:200, newPrice: 140},
        {id:"z", image: require("../../image/pizza.png"), name: "item z", oldPrice:200, newPrice: 140},
        {id:"z", image: require("../../image/pizza.png"), name: "item z", oldPrice:200, newPrice: 140}
    ];
    const [cart, setCart]=useState(Products);
    const UpdateQuantity = (id,amount) => {
        setCart(cart.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
        ));
    };
    const RemoveItem =(id) =>{
        setCart(cart.filter(item => item.id !== id));
    };
    
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount=subtotal*0.2;
    const total = subtotal - discount;

    return(
        <div className="cartContainer">
            <table className="Product">
                <thead>
                    <tr className="headTable">
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item=>(
                    <tr key={item.id}>
                        <td>
                            <button onClick={()=>RemoveItem(item.id)}>X</button>
                        </td>
                        <td>
                            <img src={item.image} alt={item.name} width="50" height="50"/>
                            {item.name}
                        </td>
                        <td>{item.price}DH</td>
                        <td className="quantityContent">
                            <button onClick={()=>UpdateQuantity(item.id,-1)}>-</button>
                            {item.quantity}
                            <button onClick={()=>UpdateQuantity(item.id,1)}>+</button>
                        </td>
                        <td>
                            {item.price*item.quantity}DH
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <table className="TotalPrice">
                <thead className="headTable">
                    <th>Cart Total</th>
                </thead>
                <tbody>
                    <tr>
                        <th>
                            <td>SUBTOTAL</td>
                            <td className="tdContent">{subtotal.toFixed(2)} DH</td>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <td>DISCOUNT</td>
                            <td className="tdContent">{discount.toFixed(2)} DH</td>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <td>TOTAL</td>
                            <td className="tdContent1">{total.toFixed(2)} DH</td>
                        </th>
                    </tr>
                </tbody>
            </table>
            <h2>You May Also Like</h2>
            <div className="imageContent">
                {recommendation.map(item=>(
                    <div className="imageItem" key={item.id}>
                        <span className="discountBadge">13%</span>
                        <img src={item.image} alt={item.name} width="200" height="200" />
                        <div>{item.name}</div>
                        <div className="PriceContainer">
                            <div className="oldPrice">{item.oldPrice}</div>
                            <div className="newPrice">DH{item.newPrice}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default CartPage;
