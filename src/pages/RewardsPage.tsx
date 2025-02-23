import { useState, useEffect } from "react";
import { FaGift, FaCheckCircle } from "react-icons/fa";
import styles from "../styles/RewardsPage.module.css";

interface Reward {
  id: number;
  name: string;
  date: string;
  status: "Redeemed" | "Pending";
}

// Hardcoded redeemed rewards data
const hardcodedRewards: Reward[] = [
  {
    id: 1,
    name: "Starbucks Gift Card",
    date: "2025-02-20",
    status: "Redeemed",
  },
  { id: 2, name: "Amazon Voucher $10", date: "2025-02-18", status: "Redeemed" },
  {
    id: 3,
    name: "Sports Direct Gift Card",
    date: "2025-02-15",
    status: "Redeemed",
  },
  {
    id: 4,
    name: "One4All €25 Gift Card",
    date: "2025-02-10",
    status: "Pending",
  },
];

const RewardsPage = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);

  useEffect(() => {
    // Load redemption history from local storage
    const savedRewards = localStorage.getItem("redeemedRewards");
    if (savedRewards) {
      setRewards(JSON.parse(savedRewards));
    } else {
      // If no saved rewards, use the hardcoded ones
      setRewards(hardcodedRewards);
    }
  }, []);

  return (
    <div className={styles.rewardsContainer}>
      <h2 className={styles.title}>Your Rewards History</h2>

      {rewards.length === 0 ? (
        <p className={styles.noRewards}>No rewards redeemed yet.</p>
      ) : (
        <div className={styles.rewardsList}>
          {rewards.map((reward) => (
            <div key={reward.id} className={styles.rewardCard}>
              <div className={styles.rewardIcon}>
                <FaGift />
              </div>
              <div className={styles.rewardDetails}>
                <h3 className={styles.rewardName}>{reward.name}</h3>
                <p className={styles.rewardDate}>Redeemed on: {reward.date}</p>
              </div>
              <div
                className={`${styles.rewardStatus} ${
                  reward.status === "Redeemed"
                    ? styles.redeemed
                    : styles.pending
                }`}
              >
                <FaCheckCircle style={{ marginRight: 3 }} /> {reward.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RewardsPage;
