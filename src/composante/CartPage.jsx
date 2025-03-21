import React, { useState } from "react";
import "../css/CartPage.css";
function CartPage(){
    const Products =[
        {id: 1 , image: "URL1", name: "item1" , price: 180, quantity : 1 },
        {id: 2 , image: "URL1", name: "item2" , price: 40, quantity : 1 },
        {id: 3 , image: "URL1", name: "item3" , price: 80, quantity : 1 }
    ];
    //initialiser l etat cart avec la valeur de products
    //cart stocke la liste actuelle des produits ajoutes au panier
    //setCart est fct qui permet de mettre a jour l etat cart
    const [cart, setCart]=useState(Products);
    const UpdateQuantity = (id,amount) => {
        setCart(cart.map(item =>
            //...item copie toutes les proprietes de item
            //Math.max(1, ...) ➝ Empêche la quantité de descendre sous 1.
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
        ));
    };
    const RemoveItem =(id) =>{
        //cart.filter(...) Crée un nouveau tableau contenant seulement les produits dont l'id est différent de id.
        setCart(cart.filter(item => item.id !== id));
    };    
    return(
        <div className="cartContainer">
            <table>
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
                        <td class="quantityContent">
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
        </div>
    );
}
export default CartPage;
