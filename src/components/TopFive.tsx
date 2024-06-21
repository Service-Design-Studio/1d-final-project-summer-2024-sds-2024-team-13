import '../App.css'; 

interface Transaction {
  id: number;
  type: string;
  amount: number;
  account: string;
  time: string;
  logo: string;
}

const transactions: Transaction[] = [
  { id: 1, type: 'PAYLAH', amount: 5.30, account: '9XXX XXXX', time: '17 JUN', logo: 'public/paylah.svg' },
  { id: 2, type: 'PAYNOW', amount: 6.50, account: '8XXX XXXX', time: '17 JUN', logo: 'public/paynow.svg' },
  { id: 3, type: 'PAYLAH', amount: 2.00, account: '9XXX XXXX', time: '17 JUN', logo: 'public/paylah.svg' },
  { id: 4, type: 'PAYLAH', amount: 8.50, account: '8XXX XXXX', time: '17 JUN', logo: 'public/paylah.svg' },
  { id: 5, type: 'PAYNOW', amount: 6.60, account: '9XXX XXXX', time: '17 JUN', logo: 'public/paynow.svg' }
];

const TransactionList: React.FC = () => {
  return (
    <div>
      <div className="date-container">
        <span className="date-header">Today 17 Jun</span>
      </div>
      <div>
        <ul className="transaction-list">
          {transactions.map(transaction => (
            <li key={transaction.id} className={`transaction-item ${transaction.id === 1 || transaction.id === 2 ? 'highlighted' : ''}`}>
              <img src={transaction.logo} alt={`${transaction.type} logo`} className="transaction-logo" />
              <div className="transaction-details">
                <div>TRANSFER FROM {transaction.type}:</div>
                <div>{transaction.account}</div>
              </div>
              <div className="transaction-amount">
                SGD {transaction.amount.toFixed(2)}
              </div>
              <img src="public/right-arrow.svg" alt="arrow icon" className="arrow-icon" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionList;
