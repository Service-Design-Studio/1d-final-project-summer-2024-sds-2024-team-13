import React from 'react';
import List from './Listcomponent';
import Navigator from './navigatorbar';

// Transactions.tsx


const Transactions: React.FC = () => {
  return (
    <div>
      <Navigator/>
      <List/>
    </div>
  );
};

export default Transactions;


