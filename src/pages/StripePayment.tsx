import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"; // Import eye icons
import styles from "../styles/StripePayment.module.css";

const StripePayment = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState<string>("•••• •••• •••• ••••");
  const [showCardNumber, setShowCardNumber] = useState(false);

  const handleCardInputChange = (event: any) => {
    if (event.complete) {
      setCardNumber("Valid Card Entered");
    } else {
      const { value = "" } = event;
      let formattedNumber = value.replace(/\D/g, "").slice(0, 16);
      formattedNumber = formattedNumber
        ? formattedNumber.match(/.{1,4}/g)?.join(" ") ?? "•••• •••• •••• ••••"
        : "•••• •••• •••• ••••";

      setCardNumber(formattedNumber);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    const cardElement = elements.getElement(CardElement);
    const { error: backendError, clientSecret } = await fetch(
      "/your-backend-endpoint",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1000 }),
      }
    ).then((res) => res.json());

    if (backendError) {
      setError("Failed to create payment intent");
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      { payment_method: { card: cardElement! } }
    );

    if (error) {
      setError(error.message || "Payment failed");
    } else if (paymentIntent?.status === "succeeded") {
      setPaymentSuccess(true);
    } else {
      setError("Payment failed");
    }

    setLoading(false);
  };

  return (
    <div className={styles.paymentContainer}>
      <h2 className={styles.title}>Complete Your Payment</h2>

      {/* Credit Card Mock */}
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.cardFront}>
            <div className={styles.cardNumber}>
              {showCardNumber ? cardNumber : "•••• •••• •••• ••••"}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowCardNumber(!showCardNumber)}
          className={styles.eyeIcon}
        >
          {showCardNumber ? (
            <FaRegEyeSlash size={20} />
          ) : (
            <FaRegEye size={20} />
          )}
        </button>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className={styles.paymentForm}>
        <div className={styles.formGroup}>
          <CardElement
            options={{
              hidePostalCode: true,
              style: { base: { fontSize: "16px", color: "#32325d" } },
            }}
            onChange={handleCardInputChange}
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {paymentSuccess && (
          <div className={styles.success}>Payment successful!</div>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading || !stripe}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default StripePayment;
