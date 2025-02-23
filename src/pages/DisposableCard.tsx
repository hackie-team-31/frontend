import React, { useState } from "react";
import styles from "../styles/DisposableCard.module.css";
import { FaCopy } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const DisposableCard: React.FC = () => {
  const location = useLocation();
  const [showCardDetails, setShowCardDetails] = useState(false);
  const { cardDetails } = location.state || {};

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
            ? cardDetails.card_number
            : maskCardNumber(cardDetails.card_number)}
          <FaCopy
            onClick={() => copyToClipboard(cardDetails.card_number)}
            className={styles.copyIcon}
          />
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.cardExpiry}>Exp: {cardDetails.exp_date}</div>
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
