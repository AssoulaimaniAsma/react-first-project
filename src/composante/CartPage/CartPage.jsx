import React, { useState } from "react";
import Products from "../Products/Products";
import "./CartPage.css";

function CartPage() {
  const products = [
    {
      id: 1,
      image: require("../../image/pizza.png"),
      name: "item1",
      price: 180,
      quantity: 1,
    },
    {
      id: 2,
      image: require("../../image/pizza.png"),
      name: "item2",
      price: 40,
      quantity: 1,
    },
    {
      id: 3,
      image: require("../../image/pizza.png"),
      name: "item3",
      price: 80,
      quantity: 1,
    },
    {
      id: 4,
      image: require("../../image/pizza.png"),
      name: "item1",
      price: 180,
      quantity: 1,
    },
    {
      id: 5,
      image: require("../../image/pizza.png"),
      name: "item2",
      price: 40,
      quantity: 1,
    },
    {
      id: 6,
      image: require("../../image/pizza.png"),
      name: "item3",
      price: 80,
      quantity: 1,
    },
  ];
  const recommendations = [
    {
      id: "x",
      image: require("../../image/pizza.png"),
      name: "item x",
      oldPrice: 200,
      newPrice: 140,
    },
    {
      id: "y",
      image: require("../../image/pizza.png"),
      name: "item y",
      oldPrice: 230,
      newPrice: 200,
    },
    {
      id: "z",
      image: require("../../image/pizza.png"),
      name: "item z",
      oldPrice: 200,
      newPrice: 140,
    },
    {
      id: "a",
      image: require("../../image/pizza.png"),
      name: "item a",
      oldPrice: 200,
      newPrice: 140,
    },
    {
      id: "b",
      image: require("../../image/pizza.png"),
      name: "item b",
      oldPrice: 200,
      newPrice: 140,
    },
  ];
  const [cart, setCart] = useState(products);
  const UpdateQuantity = (id, amount) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };
  const RemoveItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.2;
  const total = subtotal - discount;

  return (
    <div className="cartContainer">
      <div className="tableContainer">
        {/* <table className="Product">
                <thead>
                    <tr className="headTable">
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody className="bodyTab2">
                    {cart.map(item=>(
                    <tr key={item.id}>
                        <td>
                            <button onClick={()=>RemoveItem(item.id)}>X</button>
                        </td>
                        <td className="picProd">
                            <img src={item.image} alt={item.name} width="50" height="50"/>
                            {item.name}
                        </td>
                        <td>{item.price}DH</td>
                        <td className="quantityContent">
                            <button className="DecQuantity" onClick={()=>UpdateQuantity(item.id,-1)}>-</button>
                            {item.quantity}
                            <button className="IncQuantity" onClick={()=>UpdateQuantity(item.id,1)}>+</button>
                        </td>
                        <td>
                            {item.price*item.quantity}DH
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>*/}
        <Products
          products={cart}
          RemoveItem={RemoveItem}
          UpdateQuantity={UpdateQuantity}
        ></Products>
        <table className="TotalPrice">
          <thead>
            <tr className="headTable2">
              <th>Cart Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="bodyTab">
            <tr>
              <th>SUBTOTAL</th>
              <td className="tdContent">{subtotal.toFixed(2)} DH</td>
            </tr>
            <tr>
              <th>DISCOUNT</th>
              <td className="tdContent">{discount.toFixed(2)} DH</td>
            </tr>
            <tr>
              <th>TOTAL</th>
              <td className="tdContent">{total.toFixed(2)} DH</td>
            </tr>
            <tr className="fotter">
              <th>
                <button>Proceed To Checkout</button>
              </th>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="SecondPart">
        <h2 id="h2content5">You May Also Like</h2>
        <div id="imageContent2">
          {recommendations.map((item) => (
            <div id="imageItem2" key={item.id}>
              <span id="discountBadge2">13%</span>
              <img src={item.image} />
              <div id="nameImg2">{item.name}</div>
              <div id="PriceContainer2">
                <div id="oldPrice2">{item.oldPrice}DH</div>
                <div id="newPrice2">{item.newPrice}DH</div>
              </div>
              <div id="AddToCart2">
                <button id="Add2">+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default CartPage;