import { useState, useEffect } from "react";
import styles from "../styles/BNPLRankings.module.css";
import { useNavigate, useLocation } from "react-router-dom";

interface Provider {
  rank: number;
  provider: string;
  highlight: string;
  reasoning: string;
}

const BNPLRanking = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);
  const [providerDetails, setProviderDetails] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Retrieve the totalCost passed via the Link state
  const location = useLocation();
  const totalCost = location.state?.totalCost;

  useEffect(() => {
    if (totalCost === undefined) {
      console.error("Total cost is missing!");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true); // Show spinner while loading
      try {
        const response = await fetch(
          `http://localhost:8000/profile/5?product_price=${totalCost}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch BNPL providers.");
        }

        const data = await response.json();

        // Set providers directly from the structured JSON response
        setProviders(data.rankings);
      } catch (error) {
        console.error("Error fetching BNPL providers:", error);
        alert("Failed to load BNPL providers. Please try again.");
      } finally {
        setIsLoading(false); // Hide spinner after loading completes
      }
    };

    fetchData();
  }, [totalCost]);

  const handleProviderSelection = (rank: number) => {
    setSelectedProvider(rank);
    setProviderDetails(null);
  };

  const handleMoreInfo = (reasoning: string) => {
    setProviderDetails(reasoning);
    console.log(reasoning);
  };

  const handleGetCardDetails = async () => {
    if (selectedProvider !== null) {
      try {
        const payload = {
          cardholder_id: "user_123",
          purchase_amount: 1000,
          currency: "usd",
          merchant_id: "merch_456",
          allowed_categories: ["merchandise"],
          blocked_categories: ["gambling"],
          expiration_seconds: 3600,
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
      <h3 className={styles.heading}>Top BNPL Providers</h3>

      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <>
          <div className={styles.rankingContainer}>
            {providers.map((provider, index) => (
              <div
                key={provider.rank}
                className={`${styles.providerCard} ${selectedProvider === provider.rank ? styles.selected : ""
                  } ${index === 0
                    ? styles.rank1
                    : index === 1
                      ? styles.rank2
                      : styles.rank3
                  }`}
              >
                <input
                  type="radio"
                  id={`provider-${provider.rank}`}
                  name="bnpl-provider"
                  checked={selectedProvider === provider.rank}
                  onChange={() => handleProviderSelection(provider.rank)}
                />
                <label
                  htmlFor={`provider-${provider.rank}`}
                  className={styles.providerLabel}
                >
                  <h4 className={styles.providerName}>{provider.provider}</h4>
                  <p className={styles.providerSummary}>
                    {provider.highlight}
                  </p>
                </label>
                <button
                  className={styles.moreInfoButton}
                  onClick={() => handleMoreInfo(provider.reasoning)}
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
                <br />
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
        </>
      )}
    </div>
  );
};

export default BNPLRanking;
