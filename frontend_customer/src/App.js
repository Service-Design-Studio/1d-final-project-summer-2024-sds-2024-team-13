import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Book, Payment, MoreHoriz } from '@mui/icons-material/';
import LoginScreen from './screens/LoginScreen';
import WIPScreen from './screens/WIPScreen';
import PaymentScreen from './screens/PaymentScreen';
import PaymentReview from './components/payment/PaymentReview';
import PaymentSuccess from './components/payment/PaymentSuccess';

function Navigation() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState("payment");

  const handleScreen = (screen) => {
    switch (screen) {
      case "home":
        navigate("/WIP");
        break;
      case "payment":
        navigate("/payment");
        break;
      case "history":
        navigate("/WIP");
        break;
      case "more":
        navigate("/WIP")
        break;
      default:
        navigate("/");
        break;
    }
    setScreen(screen);
  };

  return (
    <BottomNavigation
      showLabels
      className='bottomNav'
      value={screen}
      onChange={(event, newScreen) => handleScreen(newScreen)}>
      <BottomNavigationAction value="home" label="Home" icon={<Home />} />
      <BottomNavigationAction value="payment" label="Payment" icon={<Payment />} />
      <BottomNavigationAction value="history" label="History" icon={<Book />} />
      <BottomNavigationAction value="more" label="More" icon={<MoreHoriz />} />
    </BottomNavigation>
  );
}

function ConditionalNavigation() {
  const location = useLocation();

  return (location.pathname !== '/' && location.pathname !== '/register') ? <Navigation /> : null;
}

function App() {
  return (
    <div className="App">
      <div className="dimensionsWarning">
        <h1>Please view the application in mobile mode</h1>
      </div>
      <BrowserRouter className="content">
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/WIP" element={<WIPScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/payment/review" element={<PaymentReview />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
        </Routes>
        <ConditionalNavigation />
      </BrowserRouter>
    </div>
  );
}

export default App;