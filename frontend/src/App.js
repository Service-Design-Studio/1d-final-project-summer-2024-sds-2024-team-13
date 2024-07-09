import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Book, Payment, MoreHoriz } from '@mui/icons-material/';
import HomeScreen from './screens/HomeScreen';
import HistoryScreen from './screens/HistoryScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PaymentScreen from './screens/PaymentScreen';
import QRPay from './components/payment/QRPay';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import SettingsScreen from './screens/SettingsScreen';

function Navigation() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState("home");

  const handleScreen = (screen) => {
    switch (screen) {
      case "home":
        navigate("/home");
        break;
      case "history":
        navigate("/history");
        break;
      case "more":
        navigate("/settings")
        break;
      case "payment":
        navigate("/payment");
        break;
      default:
        navigate("/home");
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
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            
            <Route element={<PrivateRoute />}>
              <Route path="/history" element={<HistoryScreen />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/payment/QRPay" element={<QRPay />} />
            </Route>

          </Routes>
          <ConditionalNavigation />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;