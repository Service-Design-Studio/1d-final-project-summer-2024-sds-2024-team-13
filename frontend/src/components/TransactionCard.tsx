import './TransactionCard.css';


interface TopCardProps {
  price: number;
}

const TopCard: React.FC<TopCardProps> = ({ price }) => {
  return (
    <div className="top-card">
      <div className="earnings-section">
        <span className="header-row">MOST RECENT TRANSACTION</span>
      </div>
      <div className="earnings-amount">
        <span className="currency">TRANSFER TO PAYNOW: 9XXX XXXX</span>
        <span className="transaction-amount">SGD {price.toFixed(2)}</span> {/* Display price with 2 decimal places */}
      </div>
      <span className="last-refreshed">{new Date().toLocaleString()}</span> {/* Display current timestamp */}
    </div>
  );
};

export default TopCard;
