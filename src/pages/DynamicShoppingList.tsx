import React, { useState } from "react";
import styles from "../styles/DynamicShoppingList.module.css";
import { Link } from "react-router-dom";

const DynamicShoppingList: React.FC = () => {
  const [item, setItem] = useState({ name: "", price: "", quantity: "" });
  const [cart, setCart] = useState<
    { id: number; name: string; price: number; quantity: number }[]
  >([]);
  const [idCounter, setIdCounter] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    if (item.name && item.price && item.quantity) {
      setCart([
        ...cart,
        {
          id: idCounter,
          name: item.name,
          price: parseFloat(item.price),
          quantity: parseInt(item.quantity),
        },
      ]);
      setIdCounter(idCounter + 1);
      setItem({ name: "", price: "", quantity: "" });
    }
  };

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalCost = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Checkout completed! Total: $" + totalCost.toFixed(2));
    setCart([]);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Shopping List</h2>

      <div className={styles.inputGroup}>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={item.name}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={item.price}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Qty"
          value={item.quantity}
          onChange={handleChange}
          className={styles.input}
        />
        <button onClick={addItem} className={styles.button}>
          ➕ Add
        </button>
      </div>

      <div className={styles.cart}>
        <h3>Cart</h3>
        {cart.length === 0 ? (
          <p>No items added</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                {item.quantity}x {item.name} - ${item.price.toFixed(2)} each
                <button
                  onClick={() => removeItem(item.id)}
                  className={styles.removeButton}
                >
                  ❌ Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3 className={styles.total}>Total: ${totalCost.toFixed(2)}</h3>

      <Link to="/bnpl" state={{ totalCost }}>
        <button onClick={handleCheckout} className={styles.checkoutButton}>
          🚀 Proceed to BNPL Analyzer
        </button>
      </Link>
    </div>
  );
};

export default DynamicShoppingList;
