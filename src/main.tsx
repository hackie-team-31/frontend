import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import { HashRouter } from "react-router-dom";

// // Load your public Stripe key
// const stripePromise = loadStripe("your-public-key-here");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      {/* <Elements stripe={stripePromise}> */}
      <App />
      {/* </Elements> */}
    </HashRouter>
  </StrictMode>
);
