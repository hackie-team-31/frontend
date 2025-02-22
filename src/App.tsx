import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DynamicShoppingList from "./pages/DynamicShoppingList";
import BNPLRankings from "./pages/BNPLRankings";
import VirtualCard from "./pages/VirtualCard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BNPLRankings />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/cart" element={<DynamicShoppingList />} />
      <Route path="/bnpl" element={<BNPLRankings />} />
      <Route path="/virtual-card" element={<VirtualCard />} />
    </Routes>
  );
}

export default App;
