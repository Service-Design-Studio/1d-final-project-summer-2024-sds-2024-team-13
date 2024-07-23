import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomKeypad from '../components/payment/CustomKeypad';
import styles from '../styles/payment/Payment.module.css';
import MenuItem from '../components/payment/MenuItem';
import defaultFood from '../assets/default_food.png';
import takeAway from '../assets/take_away.png';

const menuItemsData = [
  { name: 'Signature Wanton Mee (Dry/Wet)', price: 8.60, imageUrl: defaultFood },
  { name: 'Dumpling Noodle (Dry/Soup)', price: 6.60, imageUrl: defaultFood },
  { name: 'Chicken Cutlet Noodle', price: 6.00, imageUrl: defaultFood },
  { name: 'Wanton Soup (6pcs)', price: 4.00, imageUrl: defaultFood },
  { name: 'Fried Wanton (6pcs)', price: 4.00, imageUrl: defaultFood },
  { name: 'Takeaway Box', price: 0.30, imageUrl: takeAway },
];

const PaymentScreen = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('0');
  const [showKeypad, setShowKeypad] = useState(false);
  const [menuItems] = useState(menuItemsData);
  const inputRef = useRef(null);

  useEffect(() => {
    const totalAmount = calculateTotalAmount(menuItems);
    setAmount(totalAmount > 0 ? totalAmount.toFixed(2) : '0');
  }, [menuItems]);

  useEffect(() => {
    const inputWidth = amount.length > 0 ? `${amount.length + 1}ch` : '50px';
    if (inputRef.current) {
      inputRef.current.style.width = inputWidth;
    }
  }, [amount]);

  const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleKeyPress = (key) => {
    if (key === 'C') {
      setAmount((prevAmount) => prevAmount.slice(0, -1) || '0');
    } else if (key === 'Enter') {
      setShowKeypad(false);
    } else {
      if (amount === '0' && key !== '.') {
        setAmount(key);
      } else if (amount.length < 6) {
        setAmount((prevAmount) => {
          const newAmount = prevAmount + key;
          const regex = /^\d+(\.\d{0,2})?$/;
          return regex.test(newAmount) ? newAmount : prevAmount;
        });
      }
    }
  };

  const handleQuantityChange = (index) => {
    const newMenuItems = [...menuItems];
    const item = newMenuItems[index];
    const itemPrice = item.price;
    const currentAmount = parseFloat(amount) || 0;
    const newAmount = currentAmount + itemPrice;
    
    setAmount(newAmount.toFixed(2));
  };

  const handleNext = () => {
    localStorage.setItem('paymentAmount', amount);
    navigate('/payment/QRPay');
  };

  const handleAmountClick = () => {
    setShowKeypad(true);
  };

  const disableNextButton = parseFloat(amount) === 0;

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h2>Enter Amount to Charge</h2>
      </div>
      <div className={styles.amountInput}>
        <div className={styles.amountInputWrapper} onClick={handleAmountClick}>
          <span>S$</span>
          <input
            type="text"
            value={amount}
            readOnly
            className={`${styles.amountField} ${parseFloat(amount) === 0 ? styles.greyText : styles.blackText}`}
            ref={inputRef}
            data-testid="input-field"
          />
        </div>
      </div>
      <button
        className={disableNextButton ? styles.nextButtonDisabled : styles.nextButton}
        disabled={disableNextButton}
        onClick={handleNext}
        data-testid="generate-button"
      >
        Next
      </button>
      <div className={styles.menuItems}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            name={item.name}
            price={item.price}
            imageUrl={item.imageUrl}
            onAdd={() => handleQuantityChange(index)}
          />
        ))}
      </div>
      {showKeypad && (
        <CustomKeypad
          onKeyPress={handleKeyPress}
          onEnter={() => setShowKeypad(false)}
          onClose={() => setShowKeypad(false)}
        />
      )}
    </div>
  );
};

export default PaymentScreen;
