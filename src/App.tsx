import './App.css';



import React from 'react';
import { BrowserRouter as Route, Router } from 'react-router-dom';
import List from './components/Listcomponent';
import Navigator from './components/Navigator'; // Adjust path as per your file structure
import Home from './Home'; // Import your Home component
import Transactions from './Transactions'; // Import your Transactions component

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <Navigator /> {/* Render the Navigator component */}
        
          <Route path="/" exact component={Home} /> {/* Route to Home component */}
          <Route path="/transactions" component={Transactions} /> {/* Route to Transactions component */}
        
        <List /> {/* Render your List component */}
      </div>
    </Router>
  );
};

export default App;
