import React, { useState } from "react";
import styles from "../styles/BNPLRankings.module.css";

const BNPLRanking = () => {
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);
  const [providerDetails, setProviderDetails] = useState<string | null>(null);

  const providers = [
    {
      id: 1,
      name: "Klarna",
      summary:
        "Top for ease of use and wide retailer support - 80% customer satisfaction rate",
      fullExplanation:
        "Klarna offers one of the largest networks of supported retailers, and its customer satisfaction rate is among the highest in the industry.",
    },
    {
      id: 2,
      name: "AfterPay",
      summary: "Best for flexible payment options - 75% user approval rate",
      fullExplanation:
        "AfterPay gives users the flexibility of splitting payments into 4 easy installments, and it is known for quick and transparent approval processes.",
    },
    {
      id: 3,
      name: "Sezzle",
      summary: "Top for interest-free payments - 72% customer loyalty",
      fullExplanation:
        "Sezzle offers interest-free payment plans and is known for its excellent customer service and flexible repayment terms.",
    },
  ];

  const handleProviderSelection = (id: number) => {
    setSelectedProvider(id);
    setProviderDetails(null); // Reset provider details when selecting a new provider
  };

  const handleMoreInfo = (fullExplanation: string) => {
    setProviderDetails(fullExplanation); // Show details when More Info is clicked
  };

  const handleGetCardDetails = () => {
    if (selectedProvider !== null) {
      alert(
        `Proceeding with the selected BNPL provider: ${
          providers[selectedProvider - 1].name
        }`
      );
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Top 3 Buy Now Pay Later Providers</h3>
      <div className={styles.rankingContainer}>
        {providers.map((provider, index) => (
          <div
            key={provider.id}
            className={`${styles.providerCard} ${
              selectedProvider === provider.id ? styles.selected : ""
            } ${
              index === 0
                ? styles.rank1
                : index === 1
                ? styles.rank2
                : styles.rank3
            }`}
          >
            <input
              type="radio"
              id={`provider-${provider.id}`}
              name="bnpl-provider"
              checked={selectedProvider === provider.id}
              onChange={() => handleProviderSelection(provider.id)}
            />
            <label
              htmlFor={`provider-${provider.id}`}
              className={styles.providerLabel}
            >
              <h4 className={styles.providerName}>{provider.name}</h4>
              <p className={styles.providerSummary}>{provider.summary}</p>
            </label>
            <button
              className={styles.moreInfoButton}
              onClick={() => handleMoreInfo(provider.fullExplanation)}
            >
              More Info
            </button>
          </div>
        ))}
      </div>

      {providerDetails && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h4>Why is it the best?</h4>
            <p>{providerDetails}</p>
            <button
              className={styles.closePopupButton}
              onClick={() => setProviderDetails(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className={styles.buttonContainer}>
        <button
          className={styles.getCardDetailsButton}
          onClick={handleGetCardDetails}
          disabled={selectedProvider === null}
        >
          Get Card Details
        </button>
      </div>
    </div>
  );
};

export default BNPLRanking;
