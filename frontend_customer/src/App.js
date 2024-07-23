import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Book, Payment, MoreHoriz } from '@mui/icons-material/';
import LoginScreen from './screens/LoginScreen';
import WIPScreen from './screens/WIPScreen';
import PaymentScreen from './screens/PaymentScreen';
import TempOldPaymentScreen from "./screens/TempOldPaymentScreen"
import PaymentReview from './components/payment/PaymentReview';
import PaymentSuccess from './components/payment/PaymentSuccess';
import AuthProvider from './context/AuthContext';
import RegisterScreen from './screens/RegisterScreen';
import PrivateRoute from './components/PrivateRoute';
import HistoryScreen from './screens/HistoryScreen';
import RequestRefund from './screens/RequestRefund';

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
        navigate("/history");
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

  return (location.pathname !== '/' && location.pathname !== '/register' && location.pathname !== '/payment' && location.pathname !== '/payment' && location.pathname !== '/payment/review' && location.pathname !== '/payment/success') ? <Navigation /> : null;
}

function App() {
  return (
    <div className="App">
      <div className="dimensionsWarning">
        <h1>Please view the application in mobile mode</h1>
      </div>
      <BrowserRouter className="content">
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            
            <Route element={<PrivateRoute />}>
              <Route path="/WIP" element={<WIPScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/testpayment" element={<TempOldPaymentScreen />} />
              <Route path="/payment/review" element={<PaymentReview />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/history" element={<HistoryScreen />} />
              <Route path="/refunds/request" element={<RequestRefund />} />
            </Route>

          </Routes>
          <ConditionalNavigation />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;