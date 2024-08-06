import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { evaluate } from 'mathjs';
import CustomKeypad from '../components/payment/CustomKeypad';
import styles from '../styles/payment/Payment.module.css';
import MenuItem from '../components/payment/MenuItem';
import defaultFood from '../assets/default_food.png';
import takeAway from '../assets/take_away.png';
import TopHead from '../components/TopHead';
import MenuHeader from '../components/payment/MenuHeader'; // Import MenuHeader
import MenuGridItem from '../components/payment/MenuGridItem';

const menuItemsData = [
  { id: 'chicken-cutlet-noodle', name: 'Chicken Cutlet Noodle', price: 6.00, imageUrl: defaultFood, quantity: 0 },
  { id: 'signature-wanton-mee', name: 'Signature Wanton Mee (Dry/Wet)', price: 8.60, imageUrl: defaultFood, quantity: 0 },
  { id: 'dumpling-noodle', name: 'Dumpling Noodle (Dry/Soup)', price: 6.60, imageUrl: defaultFood, quantity: 0 },
  { id: 'wanton-soup', name: 'Wanton Soup (6pcs)', price: 4.00, imageUrl: defaultFood, quantity: 0 },
  { id: 'fried-wanton', name: 'Fried Wanton (6pcs)', price: 4.00, imageUrl: defaultFood, quantity: 0 },
  { id: 'takeaway-box', name: 'Takeaway Box', price: 0.30, imageUrl: takeAway, quantity: 0 },
];

const PaymentScreen = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('0');
  const [chain, setChain] = useState('');
  const [showKeypad, setShowKeypad] = useState(false);
  const [menuItems, setMenuItems] = useState(menuItemsData);
  const [favoriteItems, setFavoriteItems] = useState([]); // Add state for favorite items
  const [searchQuery, setSearchQuery] = useState('');
  const [viewLayout, setViewLayout] = useState("row")
  const [tabValue, setTabValue] = useState(0) // 0 is menu, 1 is favourites

  const inputRef = useRef(null);

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
    if (key === 'Clear') {
      setAmount('0');
      setChain('');
    } else if (key === 'Backspace') {
      setAmount((prevAmount) => prevAmount.slice(0, -1) || '0');
    } else if (key === '=') {
      handleEquals();
    } else if (['+', '-', '*', '/'].includes(key)) {
      if (amount !== '') {
        setChain((prevChain) => prevChain + amount + key);
        setAmount('');
      }
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

  const handleEquals = () => {
    if (chain || amount) {
      const expression = chain + amount;
      try {
        let result = evaluate(expression);
        if (Number.isInteger(result)) {
          result = result.toString();
        } else {
          result = result.toFixed(2);
        }
        setAmount(result.toString());
        setChain('');
        setShowKeypad(false); // Close the keypad on successful calculation
      } catch (error) {
        setAmount('Err');
        setChain('');
      }
    }
  };

  const handleQuantityChange = (index, priceChange) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index].quantity += 1;
    setMenuItems(newMenuItems);
    const currentAmount = parseFloat(amount) || 0;
    const newAmount = currentAmount + priceChange;
    setAmount(newAmount.toFixed(2));
  };

  const handleNext = () => {
    localStorage.setItem('paymentAmount', amount);
    navigate('/payment/QRPay');
  };

  const handleAmountClick = () => {
    setShowKeypad(true);
  };

  const handleFavoriteToggle = (itemName) => {
    setFavoriteItems((prevFavorites) =>
      prevFavorites.includes(itemName)
        ? prevFavorites.filter((name) => name !== itemName)
        : [...prevFavorites, itemName]
    );
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    const isAFavorite = favoriteItems.includes(a.name);
    const isBFavorite = favoriteItems.includes(b.name);
    if (isAFavorite && !isBFavorite) return -1;
    if (!isAFavorite && isBFavorite) return 1;
    return 0;
  });

  const disableNextButton = parseFloat(amount) <= 0 || showKeypad;
  const disableKeypadClose = chain !== '';

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <TopHead title="Enter Amount to Charge" />
        <div className={styles.amountInput}>
          <div className={styles.amountInputWrapper} onClick={handleAmountClick}>
            <span>S$</span>
            <input
              type="text"
              value={amount}
              readOnly
              className={`${styles.amountField} ${parseFloat(amount) <= 0 ? styles.greyText : styles.blackText}`}
              ref={inputRef}
              data-testid="input-field"
            />
          </div>
        </div>
        <div className={styles.chainText}>{chain}</div>
        <button
          className={disableNextButton ? styles.nextButtonDisabled : styles.nextButton}
          disabled={disableNextButton}
          onClick={handleNext}
          data-testid="generate-button"
        >
          Next
        </button>
        <div className={styles.menuHeader}>
          <MenuHeader searchQuery={searchQuery} onSearchChange={handleSearchChange} {...{tabValue, setTabValue, viewLayout, setViewLayout}}/>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.menuItems}>
          {(viewLayout === "row") ? sortedItems.map((item, index) => (
            <MenuItem
              key={index}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
              onClick={() => handleQuantityChange(index, item.price)}
              initialLabel="Add"
              initialClass={styles.addButton}
              isFavorited={favoriteItems.includes(item.name)}
              onFavoriteToggle={() => handleFavoriteToggle(item.name)}
            />
          )) :
            <div className={styles.gridLayout} >
              {sortedItems.map((item, index) => (
                <MenuGridItem
                  key={index}
                  name={item.name}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  onClick={() => handleQuantityChange(index, item.price)}
                  initialLabel="Add"
                  isFavorited={favoriteItems.includes(item.name)}
                  onFavoriteToggle={() => handleFavoriteToggle(item.name)}
                />
              ))}
            </div>
          }
        </div>

      </div>
      {showKeypad && (
        <CustomKeypad
          amount={amount}
          onKeyPress={handleKeyPress}
          onClose={() => !disableKeypadClose && setShowKeypad(false)}
        />
      )}
    </div>
  );
};

export default PaymentScreen;
