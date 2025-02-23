import { useState, useEffect } from "react";
import styles from "../styles/BNPLRankings.module.css";
import { useNavigate, useLocation } from "react-router-dom";

interface Provider {
  id: number;
  name: string;
  highlightSummary: string;
  fullDescription: string;
}

const BNPLRanking = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);
  const [providerDetails, setProviderDetails] = useState<string | null>(null);
  const navigate = useNavigate();

  // Retrieve the totalCost passed via the Link state
  const location = useLocation();
  const totalCost = location.state?.totalCost; // Using optional chaining in case the state is not available

  // Function to format AI suggestions
  const formatAiSuggestions = (ai_suggestion: string): Provider[] => {
    const formattedProviders: Provider[] = [];
    const regex = /(\d+)\.\s\*\*(.*?)\*\*\s*;\s*(.*?);/g;
    let match;
    let id = 1;

    while ((match = regex.exec(ai_suggestion)) !== null) {
      const name = match[2];
      const highlightSummary = match[3].split(";")[0];
      const fullDescription = match[3].split(";").slice(1).join(";");

      formattedProviders.push({
        id: id++,
        name,
        highlightSummary,
        fullDescription,
      });
    }

    return formattedProviders;
  };

  useEffect(() => {
    if (totalCost === undefined) {
      // Handle the case where totalCost is not passed
      console.error("Total cost is missing!");
      return;
    }

    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8000/profile/5?product_price=${totalCost}`
      );
      const data = await response.json();

      // Process AI suggestions into a structured format
      const formattedProviders = formatAiSuggestions(data.ai_suggestion);
      setProviders(formattedProviders);
    };

    fetchData();
  }, [totalCost]);

  const handleProviderSelection = (id: number) => {
    setSelectedProvider(id);
    setProviderDetails(null);
  };

  const handleMoreInfo = (fullExplanation: string) => {
    setProviderDetails(fullExplanation);
    console.log(fullExplanation);
  };
  const handleGetCardDetails = async () => {
    if (selectedProvider !== null) {
      try {
        const payload = {
          cardholder_id: "user_123",
          purchase_amount: 1000, // Example: $10.00
          currency: "usd",
          merchant_id: "merch_456",
          allowed_categories: ["merchandise"],
          blocked_categories: ["gambling"],
          expiration_seconds: 3600
        };

        const response = await fetch("http://localhost:8000/cards", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to create card.");
        }

        const cardDetails = await response.json();
        console.log("Card Details:", cardDetails);

        navigate(`/card`, { state: { cardDetails } });

      } catch (error) {

        console.error("Error fetching card details:", error);
        alert("Failed to get card details. Please try again.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Top 3 Buy Now Pay Later Providers</h3>
      <div className={styles.rankingContainer}>
        {providers.map((provider, index) => (
          <div
            key={provider.id}
            className={`${styles.providerCard} ${selectedProvider === provider.id ? styles.selected : ""
              } ${index === 0
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
              <p className={styles.providerSummary}>
                {provider.highlightSummary}
              </p>
            </label>
            <button
              className={styles.moreInfoButton}
              onClick={() => handleMoreInfo(provider.fullDescription)}
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
