import React from 'react';
import './OldTransactionCard.css'; // Make sure the path to your CSS file is correct

interface MidCardProps {
  price: number;
}

const MidCard: React.FC<MidCardProps> = ({ price }) => {
  const timestamp = new Date().toLocaleString(); // Get current timestamp

  return (
    <div className="mid-card">
      <div className="header-row">
        <span className="transaction-header">PAID TRANSACTION</span>
      </div>
      <div className="transaction-details">
        <span className="transaction-info">TRANSFER FROM PAYLAH: 9XXX XXXX</span>
        <span className="transaction-amount">SGD {price.toFixed(2)}</span> {/* Display price with 2 decimal places */}
      </div>
      <span className="transaction-time">{timestamp}</span> {/* Display current timestamp */}
    </div>
  );
};

export default MidCard;
