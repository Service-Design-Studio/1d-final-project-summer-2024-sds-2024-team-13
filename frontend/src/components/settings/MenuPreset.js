import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/settings/MenuPreset.module.css';
import MenuHeader from '../../components/payment/MenuHeader';
import MenuItem from '../../components/payment/MenuItem';
import defaultFood from '../../assets/default_food.png';
import TopNav from '../TopNav';
import { AutoFixHigh, AddCircle, ChevronRight } from '@mui/icons-material';
import MenuGridItem from '../payment/MenuGridItem';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../utils/axiosConfig';


const MenuPreset = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0); // 0 is menu, 1 is favourites
  const [viewLayout, setViewLayout] = useState("grid");
  const { user } = useAuth();


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
            favourite: item.favourite === "true" || item.favourite === true,
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

  const handleClick = (item) => {
    navigate('/settings/edititem', { state: { item } });
  };

  useEffect(() => {
    fetchAllMenuItems();
  }, [fetchAllMenuItems]);


  const handleFavoriteToggle = async (item) => {
    const isFavorite = !favoriteItems.includes(item.id); // Check by ID
    const updatedFavoriteItems = isFavorite 
      ? [...favoriteItems, item.id] // Add ID
      : favoriteItems.filter((id) => id !== item.id); 

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
    return b.created_at - a.created_at;
  });

  return (
    <div className={styles.screen}>
      <TopNav
        title="Menu Preset"
        pathname="/settings"
        hasBackButton="yes"
      />
      <div className={styles.content}>
        <div className={styles.buttonContainer}>
          <button onClick={() => navigate('/settings/capturemenu')} className={`${styles.generateButton} ${styles.Button}`} data-testid="auto-generate-button">
            <div className={styles.buttonContent}><AutoFixHigh /> Auto-Generate Menu Item(s)</div>
            <ChevronRight />
          </button>
          <button onClick={() => navigate('/settings/additem')} className={styles.Button} data-testid="add-item-button">
            <div className={styles.buttonContent}><AddCircle /> Add Menu Item</div>
            <ChevronRight />
          </button>
        </div>

        <MenuHeader searchQuery={searchQuery} onSearchChange={handleSearchChange} {...{ tabValue, setTabValue, viewLayout, setViewLayout }} />
        <div className={styles.menuItems} data-testid="menu-items">
          {(viewLayout === "row") ? sortedItems.map((item, index) => (
            <MenuItem
              key={item.id}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
              onClick={() => handleClick(item)}
              initialLabel="Edit"
              isFavorited={favoriteItems.includes(item.id)}
              onFavoriteToggle={() => handleFavoriteToggle(item)}
              data-testid={`menu-item-${item.id}`}
            />
          )) :
            <div className={styles.gridLayout} data-testid="grid-layout">
              {sortedItems.map((item, index) => (
                <MenuGridItem
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  onClick={() => handleClick(item)}
                  initialLabel="Edit"
                  isFavorited={favoriteItems.includes(item.id)}
                  onFavoriteToggle={() => handleFavoriteToggle(item)}
                  data-testid={`menu-grid-item-${item.id}`}
                />
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default MenuPreset;
