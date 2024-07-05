import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Book, Payment, MoreHoriz } from '@mui/icons-material/';
import HomeScreen from './screens/HomeScreen';
import HistoryScreen from './screens/HistoryScreen';
import LoginScreen from './screens/LoginScreen';

function Navigation() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState("home");

  const handleScreen = (screen) => {
    switch (screen) {
      case "home":
        navigate("/");
        break;
      case "history":
        navigate("/history");
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
  
  return location.pathname !== '/login' ? <Navigation /> : null;
}

function App() {
  return (
    <div className="App">
      <div className="dimensionsWarning">
        <h1>Please view the application in mobile mode</h1>
      </div>
      <BrowserRouter className="content">
        <Routes>
          <Route path='/' element={<HomeScreen/>} />
          <Route path='/history' element={<HistoryScreen/>} />
          <Route path='/login' element={<LoginScreen/>} />
        </Routes>
        <ConditionalNavigation/>
      </BrowserRouter>
    </div>
  );
}

export default App;