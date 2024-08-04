import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/settings/MenuPreset.module.css';
import MenuHeader from '../../components/payment/MenuHeader';
import MenuItem from '../../components/payment/MenuItem';
import defaultFood from '../../assets/default_food.png';
import takeAway from '../../assets/take_away.png';
import TopNav from '../TopNav';
import { AutoFixHigh, AddCircle } from '@mui/icons-material';

const menuItemsData = [
  { id: 'chicken-cutlet-noodle', name: 'Chicken Cutlet Noodle', price: 6.00, imageUrl: defaultFood },
  { id: 'signature-wanton-mee', name: 'Signature Wanton Mee (Dry/Wet)', price: 8.60, imageUrl: defaultFood },
  { id: 'dumpling-noodle', name: 'Dumpling Noodle (Dry/Soup)', price: 6.60, imageUrl: defaultFood },
  { id: 'wanton-soup', name: 'Wanton Soup (6pcs)', price: 4.00, imageUrl: defaultFood },
  { id: 'fried-wanton', name: 'Fried Wanton (6pcs)', price: 4.00, imageUrl: defaultFood },
  { id: 'takeaway-box', name: 'Takeaway Box', price: 0.30, imageUrl: takeAway },
];

const MenuPreset = () => {
  const navigate = useNavigate();
  const [menuItems] = useState(menuItemsData);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleClick = (item) => {
    navigate(`/settings/editItem/${item.id}`);
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

  return (
    <div className={styles.screen}>
      <TopNav
        title="Menu Preset"
        pathname="/settings"
        hasBackButton="yes"
      />
      <div className={styles.content}>
        <button onClick={() => navigate('/settings/autoGenerate')} className={styles.Button}>
          <AutoFixHigh /> Auto-Generate Menu Item(s)
        </button>
        <button onClick={() => navigate('/settings/addItem')} className={styles.Button}>
          <AddCircle /> Add Menu Item
        </button>
        <MenuHeader searchQuery={searchQuery} onSearchChange={handleSearchChange} />
        <div className={styles.menuItems}>
          {sortedItems.map((item, index) => (
            <MenuItem
              key={index}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
              onClick={() => handleClick(item)}
              initialLabel="Edit"
              isFavorited={favoriteItems.includes(item.name)}
              onFavoriteToggle={() => handleFavoriteToggle(item.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPreset;
