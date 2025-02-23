import { useState, useEffect } from "react";
import { FaGift, FaCheckCircle } from "react-icons/fa";
import styles from "../styles/RewardsPage.module.css";

interface Reward {
  reward_name: string;
  reward_amount: number;
  redeemed_at: string; // Using ISO string for timestamp
  status: "Redeemed" | "Pending";
}

const RewardsPage = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const userId = 5;
        const response = await fetch(
          `http://localhost:8000/rewards/${userId}/redeemed-rewards`
        );

        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch rewards data");
        }

        const data = await response.json();

        // Format the date if necessary (e.g., from ISO string to date format)
        const formattedRewards = data.map((reward: any) => ({
          ...reward,
          redeemed_at: new Date(reward.redeemed_at).toLocaleDateString("en-US"), // Convert timestamp to readable date
          status: "Redeemed", // You can adjust this as needed based on your backend data
        }));

        setRewards(formattedRewards);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  return (
    <div className={styles.rewardsContainer}>
      <h2 className={styles.title}>Your Rewards History</h2>

      {loading ? (
        <p className={styles.loading}>Loading rewards...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : rewards.length === 0 ? (
        <p className={styles.noRewards}>No rewards redeemed yet.</p>
      ) : (
        <div className={styles.rewardsList}>
          {rewards.map((reward, index) => (
            <div key={index} className={styles.rewardCard}>
              <div className={styles.rewardIcon}>
                <FaGift />
              </div>
              <div className={styles.rewardDetails}>
                <h3 className={styles.rewardName}>{reward.reward_name}</h3>
                <p className={styles.rewardDate}>
                  Redeemed on: {reward.redeemed_at}
                </p>
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
