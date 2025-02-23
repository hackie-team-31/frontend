import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DynamicShoppingList from "./pages/DynamicShoppingList";
import BNPLRankings from "./pages/BNPLRankings";
import DisposableCard from "./pages/DisposableCard";
// import StripePayment from "./pages/StripePayment";
import PointsPage from "./pages/PointsPage";
import RewardsPage from "./pages/RewardsPage"; // New rewards page
import BottomNav from "./components/BottomNav";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<DynamicShoppingList />} />
        <Route path="/bnpl" element={<BNPLRankings />} />
        <Route path="/card" element={<DisposableCard />} />
        {/* <Route path="/pay/:providerId" element={<StripePayment />} /> */}
        <Route path="/points" element={<PointsPage />} />
        <Route path="/rewards" element={<RewardsPage />} />{" "}
        {/* Add this route */}
      </Routes>
      <BottomNav />
    </>
  );
}

export default App;
