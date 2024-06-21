import '../App.css';

const TopCard: React.FC = () => {
  return (
    <div className="top-card">
        <div className="earnings-section">
            <div className="header-row">
                <span className="today-earnings-header">
                TODAY'S EARNINGS
                <img src="public/eye-icon.svg" alt="eye icon" className="icon eye-icon" />
                </span>
                <img src="public/refresh-icon.svg" alt="refresh icon" className="icon refresh-icon" />
            </div>
            <div className="earnings-amount">
                <div className="amount-info">
                    <span className="currency">SGD</span>
                    <span className="amount-front">164</span><span className="amount-back">.90</span>
                    <span className="last-refreshed">last refreshed at 09.40 AM</span>
                </div>
            </div>
      </div>

        <div className="transaction-section">
            <div className="header-row">
                <span className="transaction-header">MOST RECENT TRANSACTION</span>
            </div>
            <div className="top-transaction-details">
                <span className="transaction-details-front">TRANSFER FROM PAYLAH:</span>
                <span className="transaction-details-back">9XXX XXXX</span>
            </div>
            <div className="transaction-amount-row">
                <span className="transaction-time">1 MIN AGO • 09:41:21 AM</span>
                <div className="transaction-amount">
                    <span className="transaction-currency">SGD</span>
                    <span className="transaction-amount-front">5</span><span className="transaction-amount-back">.30</span>
                </div>
            </div>
        </div>
    </div>
  );
}

export default TopCard;





