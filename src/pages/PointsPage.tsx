import React, { useState, useEffect } from "react";
import styles from "../styles/PointsPage.module.css";

// Sample reward options (gift cards for vendors)
const rewards = [
  { name: "Starbucks Gift Card ($50)", cost: 300 },
  { name: "Sports Direct Gift Card ($50)", cost: 500 },
  { name: "One4All Gift Card ($50)", cost: 500 },
];

const PointsPage: React.FC = () => {
  const [points, setPoints] = useState<number>(0);
  const [redeemedReward, setRedeemedReward] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [availableRewards, setAvailableRewards] = useState(rewards); // Track available rewards

  // Fetch points from the backend
  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await fetch("http://localhost:8000/user/5/points");
        if (response.ok) {
          const data = await response.json();
          setPoints(data.points);
        } else {
          console.error("Failed to fetch points.");
        }
      } catch (error) {
        console.error("Error fetching points:", error);
      }
    };

    fetchPoints();
  }, []);

  const handleRedeemReward = async (rewardName: string, cost: number) => {
    if (points >= cost) {
      setPoints(points - cost);
      setRedeemedReward(rewardName);
      setShowPopup(true);

      // Remove redeemed reward from available rewards
      setAvailableRewards((prevRewards) =>
        prevRewards.filter((r) => r.name !== rewardName)
      );

      // Post redemption request to backend
      try {
        const userId = 5; // Replace with actual user ID
        const response = await fetch(
          `http://localhost:8000/rewards/${userId}/redeemed-rewards`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              reward_name: rewardName,
              reward_amount: 50, // Adjust as needed
              needed_points: cost,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data.message);
        } else {
          console.error("Failed to redeem reward:", response);
          alert("Something went wrong, please try again.");
        }
      } catch (error) {
        console.error("Error redeeming reward:", error);
        alert("Failed to redeem the reward.");
      }

      // Hide popup after 5 seconds
      setTimeout(() => setShowPopup(false), 5000);
    } else {
      alert("Not enough points for this reward.");
    }
  };

  return (
    <div className={styles.rewardContainer}>
      <div className={styles.points}>
        <h2>Points: {points}</h2>
      </div>
      <div className={styles.rewardsList}>
        {availableRewards.length > 0 ? (
          availableRewards.map((reward) => (
            <div key={reward.name} className={styles.rewardItem}>
              <div className={styles.rewardName}>{reward.name}</div>
              <div className={styles.rewardCost}>{reward.cost} points</div>
              <button
                className={styles.redeemButton}
                onClick={() => handleRedeemReward(reward.name, reward.cost)}
              >
                Redeem
              </button>
            </div>
          ))
        ) : (
          <p>No rewards available.</p>
        )}
      </div>

      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3 className={styles.successMessage}>
              🎉 You've redeemed {redeemedReward}!
            </h3>
            <button
              className={styles.closePopupButton}
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PointsPage;
