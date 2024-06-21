import "./App.css";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./components/Listcomponent";
import Navigator from "./components/navigatorbar"; // Adjust path as per your file structure
import Home from "./components/Home"; // Import your Home component
import Transactions from "./components/Transactionpage"; // Import your Transactions component

const App: React.FC = () => {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} /> {/* Route to Home component */}
        <Route path="/transactions" Component={Transactions} />{" "}
        {/* Route to Transactions component */}
      </Routes>
    </BrowserRouter>
    
  );
};

export default App;
