import React, { useState } from "react";
import styles from "../styles/DisposableCard.module.css";
import { FaCopy } from "react-icons/fa"; // Importing the copy icon

const DisposableCard: React.FC = () => {
  const [showCardDetails, setShowCardDetails] = useState(false);

  const cardDetails = {
    number: "1234 5678 9876 5432", // Replace with actual Stripe-generated card number
    cvv: "123",
    expiry: "12/25",
  };

  const toggleCardDetails = () => setShowCardDetails(!showCardDetails);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      alert(`${value} copied to clipboard!`);
    });
  };

  const maskCardNumber = (number: string) => {
    const masked = number.slice(0, 4) + " **** **** " + number.slice(-4);
    return masked;
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.bankLogo}></div>
          <div className={styles.cardType}>Credit Card</div>
        </div>
        <div className={styles.cardNumber}>
          {showCardDetails
            ? cardDetails.number
            : maskCardNumber(cardDetails.number)}
          <FaCopy
            onClick={() => copyToClipboard(cardDetails.number)}
            className={styles.copyIcon}
          />
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.cardExpiry}>Exp: {cardDetails.expiry}</div>
          <div className={styles.cardCvv}>
            {showCardDetails ? cardDetails.cvv : "***"}
            <FaCopy
              onClick={() => copyToClipboard(cardDetails.cvv)}
              className={styles.copyIcon}
            />
          </div>
        </div>
        <button onClick={toggleCardDetails} className={styles.toggleButton}>
          {showCardDetails ? "Hide Details" : "Show Details"}
        </button>
      </div>
    </div>
  );
};

export default DisposableCard;
