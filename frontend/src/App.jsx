import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CarDetailPage from "./pages/CarDetailPage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignUpPage"; // Import Signup page
import CarPostingPage from "./pages/CarPostingPage";
import Profile from "./pages/ProfilePage";
import Chat from "./pages/ChatPage";
import ShoppingCart from "./pages/ShoppingCart";
import Navbar from "./Components/Navbar";
import CarPaymentPage from "./pages/CarPaymentPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cardetail/:carId" element={<CarDetailPage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post-car" element={<CarPostingPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/cardetail/:carId/payment" element={<CarPaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;

