import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Book, Payment, MoreHoriz } from '@mui/icons-material/';
import HomeScreen from './screens/HomeScreen';
import HistoryScreen from './screens/HistoryScreen';
import RefundScreen from './components/refunds/RefundScreen';
import RefundReview from './components/refunds/RefundReview';
import RefundRequest from './components/refunds/RefundRequest';
import RefundDetails from './components/refunds/RefundDetails';
import SettingsScreen from './screens/SettingsScreen';
import DailyCutoffScreen from './components/settings/DailyCutoffScreen';
import MenuPreset from './components/settings/MenuPreset';
import AddItem from './components/settings/AddItem';
import AutoGenerate from './components/settings/AutoGenerate';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PaymentScreen from './screens/PaymentScreen';
import QRPay from './components/payment/QRPay';
import PaymentSuccess from './components/payment/PaymentSuccess';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import withSplashScreen from "./components/withSplashScreen";
import EditItem from './components/settings/EditItem';
import CaptureMenu from './components/settings/CaptureMenu';

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

  return (location.pathname !== '/' && location.pathname !== '/register' 
    && location.pathname !== '/refunds' && location.pathname !== '/refunds/request'
    && location.pathname !== '/refunds/details' && location.pathname !== '/refunds/review'
    && location.pathname !== '/settings/autoGenerate' 
  ) ? <Navigation /> : null;
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
              <Route path="/home" element={<HomeScreen />} />
              
              <Route path="/history" element={<HistoryScreen />} />
              
              <Route path="/refunds" element={<RefundScreen />} />
              <Route path="/refunds/review" element={<RefundReview />} />
              <Route path="/refunds/request" element={<RefundRequest />} />
              <Route path="/refunds/details" element={<RefundDetails />} />

              <Route path="/settings" element={<SettingsScreen />} />
              <Route path="/settings/cutoff" element={<DailyCutoffScreen />} />
              <Route path="/settings/menuPreset" element={<MenuPreset />} />
              <Route path="/settings/additem" element={<AddItem />} />
              <Route path="/settings/edititem" element={<EditItem />} />

              <Route path="/settings/capturemenu" element={<CaptureMenu />} />
              <Route path="/settings/auto-generate" element={<AutoGenerate />} />

              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/payment/QRPay" element={<QRPay />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
            </Route>

          </Routes>
          <ConditionalNavigation />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default withSplashScreen(App);