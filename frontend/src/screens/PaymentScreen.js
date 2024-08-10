import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { evaluate } from 'mathjs';
import CustomKeypad from '../components/payment/CustomKeypad';
import styles from '../styles/payment/Payment.module.css';
import MenuItem from '../components/payment/MenuItem';
import defaultFood from '../assets/default_food.png';
import TopHead from '../components/TopHead';
import MenuHeader from '../components/payment/MenuHeader'; // Import MenuHeader
import MenuGridItem from '../components/payment/MenuGridItem';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axiosConfig';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('0');
  const [chain, setChain] = useState('');
  const [showKeypad, setShowKeypad] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewLayout, setViewLayout] = useState("grid");
  const [tabValue, setTabValue] = useState(0);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const inputRef = useRef(null);

  const fetchAllMenuItems = useCallback(async () => {
    if (user) {
      try {
        const response = await axiosInstance.get(`/users/${user.user_id}/items/`);
        if (response.status === 200) {
          const fetchedItems = response.data.map(item => ({
            id: item.id.toString(),
            name: item.name,
            price: parseFloat(item.price.replace('$', '')),
            imageUrl: item.image || defaultFood,
            favourite: (item.favourite === "true" || item.favourite === true),
            quantity: 0,
            created_at: new Date(item.created_at)
          }));
          setMenuItems(fetchedItems);
          setFavoriteItems(fetchedItems.filter(item => item.favourite).map(item => item.id));
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchAllMenuItems();
  }, [fetchAllMenuItems]);

  useEffect(() => {
    const inputWidth = amount.length > 0 ? `${amount.length + 1}ch` : '50px';
    if (inputRef.current) {
      inputRef.current.style.width = inputWidth;
    }
  }, [amount]);

  const handleKeyPress = (key) => {
    setError(''); // Clear any existing error when a key is pressed
    console.log(`Manual input using keypad: ${key}`);
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

  const handleQuantityChange = (item) => {
    const newMenuItems = menuItems.map(menuItem => {
      if (menuItem.id === item.id) {
        menuItem.quantity += 1;
      }
      return menuItem;
    });
    setMenuItems(newMenuItems);

    const currentAmount = parseFloat(amount) || 0;
    const newAmount = currentAmount + item.price;
    setAmount(newAmount.toFixed(2));

    console.log(`Added menu item: ${item.name}, Price: ${item.price}`);
  };

  const handleNext = async () => {
    if (amount === 'Err' || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    // Generate receipt
    const receiptData = generateReceipt();

    // Save the amount to localStorage
    localStorage.setItem('paymentAmount', amount);

    try {
      const response = await axiosInstance.post('/generate-qr', { amount });
      if (response.status === 201) {
        // Navigate with the QR code from the response
        navigate('/payment/QRPay', { state: { qrCode: response.data.qrCode, receipt: receiptData } });
      } else {
        // Navigate without QR code but still with the amount in localStorage
        setError('Unexpected response from the server.');
        navigate('/payment/QRPay', { state: { receipt: receiptData } });
      }
    } catch (error) {
      setError('Failed to generate QR code. Please try again later.');
      // Navigate without QR code but still with the amount in localStorage
      navigate('/payment/QRPay', { state: { receipt: receiptData } });
    }
  };

  const generateReceipt = () => {
    let receipt = "Receipt\n";
    receipt += "--------------------------\n";
    receipt += "Item Name\tQuantity\tPrice\n";
    receipt += "--------------------------\n";

    let totalMenuPrice = 0;
    let hasMenuItems = false;
    menuItems.forEach(item => {
      if (item.quantity > 0) {
        const itemTotalPrice = item.price * item.quantity;
        totalMenuPrice += itemTotalPrice;
        receipt += `${item.name}\t${item.quantity}\t${itemTotalPrice.toFixed(2)}\n`;
        hasMenuItems = true;
      }
    });

    const finalAmount = parseFloat(amount);
    const manualAdjustment = finalAmount - totalMenuPrice;

    if (manualAdjustment !== 0) {
      const adjustmentLabel = hasMenuItems ? "Manual Adjustment" : "Manual Input";
      receipt += `${adjustmentLabel}\t\t${manualAdjustment.toFixed(2)}\n`;
    }

    receipt += "--------------------------\n";
    receipt += `Total Amount: S$${finalAmount.toFixed(2)}\n`;
    receipt += "--------------------------\n";

    console.log(receipt);

    return receipt;
  };

  const handleAmountClick = () => {
    setShowKeypad(true);
  };

  const handleFavoriteToggle = async (item) => {
    const isFavorite = !favoriteItems.includes(item.id); // Check by ID
    const updatedFavoriteItems = isFavorite 
      ? [...favoriteItems, item.id] // Add ID
      : favoriteItems.filter(id => id !== item.id); // Remove ID
  
    setFavoriteItems(updatedFavoriteItems);
  
    try {
      const formData = new FormData();
      formData.append('item[favourite]', isFavorite.toString());
  
      const response = await axiosInstance.patch(`/users/${user.user_id}/items/${item.id}`, formData);
  
      if (response.status !== 200) {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Failed to update favorite status:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearchQuery = item.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().startsWith(searchQuery.toLowerCase());
    const matchesFavorite = tabValue === 1 ? favoriteItems.includes(item.id) : true;
    return matchesSearchQuery && matchesFavorite;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    const isAFavorite = favoriteItems.includes(a.id);
    const isBFavorite = favoriteItems.includes(b.id);
    if (isAFavorite && !isBFavorite) return -1;
    if (!isAFavorite && isBFavorite) return 1;
    return 0;
  });

  const disableNextButton = parseFloat(amount) <= 0 || showKeypad;
  const disableKeypadClose = chain !== '';

  return (
    <div className={styles.screen} data-testid="payment-screen">
      <div className={styles.header}>
        <TopHead title="Enter Amount to Charge" />

        <div className={styles.amountInput} data-testid="amount-input">
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
        {error && <div className={styles.error} data-testid="error-message">{error}</div>}
        <button
          className={disableNextButton ? styles.nextButtonDisabled : styles.nextButton}
          disabled={disableNextButton}
          onClick={handleNext}
          data-testid="generate-button"
        >
          Next
        </button>
        <div className={styles.menuHeader}>
          <MenuHeader searchQuery={searchQuery} onSearchChange={handleSearchChange} {...{ tabValue, setTabValue, viewLayout, setViewLayout }} />
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.menuItems} data-testid="menu-items">
          {(viewLayout === "row") ? sortedItems.map((item, index) => (
            <MenuItem
              key={index}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
              onClick={() => handleQuantityChange(item)}
              initialLabel="Add"
              initialClass={styles.addButton}
              isFavorited={favoriteItems.includes(item.id)}
              onFavoriteToggle={() => handleFavoriteToggle(item)}
              data-testid={`menu-item-${index}`}
            />
          )) :
            <div className={styles.gridLayout} data-testid="grid-layout">
              {sortedItems.map((item, index) => (
                <MenuGridItem
                  key={index}
                  name={item.name}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  onClick={() => handleQuantityChange(item)}
                  initialLabel="Add"
                  isFavorited={favoriteItems.includes(item.id)}
                  onFavoriteToggle={() => handleFavoriteToggle(item)}
                  data-testid={`grid-item-${index}`}
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
