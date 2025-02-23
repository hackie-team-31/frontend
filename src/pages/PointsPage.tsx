import React, { useState, useEffect } from "react";
import styles from "../styles/PointsPage.module.css";

// Sample reward options (gift cards for vendors)
const rewards = [
  { name: "Starbucks Gift Card ($50)", cost: 3000 },
  { name: "Sports Direct Gift Card ($50)", cost: 3000 },
  { name: "One4All Gift Card ($50)", cost: 3000 },
];

const PointsPage: React.FC = () => {
  const [points, setPoints] = useState(3000); // Hardcoded points for now
  const [redeemedReward, setRedeemedReward] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleRedeemReward = (reward: string, cost: number) => {
    if (points >= cost) {
      setPoints(points - cost);
      setRedeemedReward(reward);
      setShowPopup(true);
      // Show celebratory animation
      setTimeout(() => setShowPopup(false), 5000); // Hide popup after 3 seconds
      //   alert(`You have successfully redeemed the ${reward} Gift Card!`);
    } else {
      alert("Not enough points for this reward.");
    }
  };

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.get(
        ["redeemedReward", "remainingPoints"],
        (result) => {
          if (result.remainingPoints !== undefined) {
            setPoints(result.remainingPoints);
          }
          if (result.redeemedReward) {
            setRedeemedReward(result.redeemedReward);
          }
        }
      );
    } else {
      console.error("chrome.storage.local is not available.");
    }
  }, []);

  return (
    <div className={styles.rewardContainer}>
      <div className={styles.points}>
        <h2>Points: {points}</h2>
      </div>
      <div className={styles.rewardsList}>
        {rewards.map((reward) => (
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
        ))}
      </div>

      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3 className={styles.successMessage}>
              Congratulations! 🎉 You've redeemed your {redeemedReward} Gift
              Card. 🎆
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
