// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import styles from "../styles/StripePayment.module.css";

// const StripePayment = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const { providerId } = useParams<{ providerId: string }>();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [cardNumber, setCardNumber] = useState<string>("•••• •••• •••• ••••");
//   const [showCardNumber, setShowCardNumber] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [selectedProvider, setSelectedProvider] = useState<string>("");

//   const providers = {
//     1: "Klarna",
//     2: "Affirm",
//     3: "Clearpay",
//   };

//   const [providerName, setProviderName] = useState<string>("");

//   useEffect(() => {
//     // Dynamically set provider name based on providerId from URL
//     if (providerId) {
//       setProviderName(providers[parseInt(providerId)]);
//       setSelectedProvider(providers[parseInt(providerId)]); // Set initial provider
//     }
//   }, [providerId]);

//   const handleCardInputChange = (event: any) => {
//     if (event.complete) {
//       setCardNumber("Valid Card Entered");
//     } else {
//       const { value = "" } = event;
//       let formattedNumber = value.replace(/\D/g, "").slice(0, 16);
//       formattedNumber = formattedNumber
//         ? formattedNumber.match(/.{1,4}/g)?.join(" ") ?? "•••• •••• •••• ••••"
//         : "•••• •••• •••• ••••";

//       setCardNumber(formattedNumber);
//     }
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);
//     const cardElement = elements.getElement(CardElement);

//     // Handle Klarna or other providers here
//     if (selectedProvider === "Klarna") {
//       // Call your FastAPI backend to create a Klarna payment session
//       const { sessionId } = await fetch(
//         `/create-klarna-payment-session/${providerId}`,
//         {
//           method: "POST",
//         }
//       ).then((res) => res.json());

//       if (!sessionId) {
//         setError("Failed to create payment session");
//         setLoading(false);
//         return;
//       }

//       // Use the sessionId to confirm Klarna payment
//       const { error, paymentIntent } = await stripe.confirmCardPayment(
//         sessionId,
//         {
//           payment_method: { card: cardElement! },
//         }
//       );

//       if (error) {
//         setError(error.message || "Payment failed");
//       } else if (paymentIntent?.status === "succeeded") {
//         setPaymentSuccess(true);
//       } else {
//         setError("Payment failed");
//       }
//     } else {
//       // Handle other providers like Affirm or Clearpay
//       setError("Currently only Klarna is supported.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className={styles.paymentContainer}>
//       <h2 className={styles.title}>
//         Complete Your Payment with {providerName}
//       </h2>

//       {/* Payment Provider Selection */}
//       <div className={styles.providerSelection}>
//         <label>
//           <input
//             type="radio"
//             value="Klarna"
//             checked={selectedProvider === "Klarna"}
//             onChange={() => setSelectedProvider("Klarna")}
//           />
//           Klarna
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="Affirm"
//             checked={selectedProvider === "Affirm"}
//             onChange={() => setSelectedProvider("Affirm")}
//           />
//           Affirm
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="Clearpay"
//             checked={selectedProvider === "Clearpay"}
//             onChange={() => setSelectedProvider("Clearpay")}
//           />
//           Clearpay
//         </label>
//       </div>

//       {/* Card Details Section */}
//       {selectedProvider === "Klarna" && (
//         <div className={styles.cardContainer}>
//           <div className={styles.card}>
//             <div className={styles.cardFront}>
//               <div className={styles.cardNumber}>
//                 {showCardNumber ? cardNumber : "•••• •••• •••• ••••"}
//               </div>
//             </div>
//           </div>
//           <button
//             onClick={() => setShowCardNumber(!showCardNumber)}
//             className={styles.eyeIcon}
//           >
//             {showCardNumber ? (
//               <FaRegEyeSlash size={20} />
//             ) : (
//               <FaRegEye size={20} />
//             )}
//           </button>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className={styles.paymentForm}>
//         <div className={styles.formGroup}>
//           <CardElement
//             options={{
//               hidePostalCode: true,
//               style: { base: { fontSize: "16px", color: "#32325d" } },
//             }}
//             onChange={handleCardInputChange}
//           />
//         </div>

//         {error && <div className={styles.error}>{error}</div>}
//         {paymentSuccess && (
//           <div className={styles.success}>Payment successful!</div>
//         )}

//         <button
//           type="submit"
//           className={styles.submitButton}
//           disabled={loading || !stripe}
//         >
//           {loading ? "Processing..." : "Pay Now"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default StripePayment;
