import React from "react";

export default function Products({ products, UpdateQuantity, RemoveItem }) {
  return (
    <table className="Product">
      <thead>
        <tr className="headTable">
          {RemoveItem && <th></th>}
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody className="bodyTab2">
        {products.map((item) => (
          <tr key={item.id}>
            {RemoveItem && (
              <td>
                <button onClick={async () => await RemoveItem(item.id)}>X</button>
              </td>
            )}
            <td className="picProd">
              <img src={item.image} alt={item.name} width="50" height="50" />
              <span>{item.name}</span>
            </td>
            <td>{Number(item.discountedPrice).toFixed(2)}DH</td>
            <td className="quantityContent">
              <button
                className="DecQuantity"
                onClick={() => UpdateQuantity(item.id, -1)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="IncQuantity"
                onClick={() => UpdateQuantity(item.id, 1)}
              >
                +
              </button>
            </td>
            <td>{Number((item.discountedPrice).toFixed(2) * item.quantity).toFixed(2)} DH</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
