
import './navigator.css'

// Navigator.tsx
import React, { useState } from 'react';
import Transactions from './Transactionpage';
import App from '../App'

const Navigator: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home'); // State to manage current page

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  const navigateToTransactions = () => {
    setCurrentPage('transactions');
  };

  return (
    <div className="navigator">
      <button onClick={navigateToHome} className={currentPage === 'home' ? 'active' : ''}>
        Home
      </button>
      <button onClick={navigateToTransactions} className={currentPage === 'transactions' ? 'active' : ''}>
        Transactions
      </button>

      <div className="content">
        {currentPage === 'home' && <App />}
        {currentPage === 'transactions' && <Transactions />}
      </div>
    </div>
  );
};

export default Navigator;


