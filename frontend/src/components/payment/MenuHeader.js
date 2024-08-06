import React from 'react';
import { GridView, Menu, Search as SearchIcon } from '@mui/icons-material';
import styles from '../../styles/payment/MenuHeader.module.css';
import { Tab, Tabs } from '@mui/material';

const MenuHeader = ({ searchQuery, onSearchChange, tabValue, setTabValue, viewLayout, setViewLayout }) => {

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
};
  return (
    <div className={styles.menuHeader}>
      <div className={styles.searchWrapper}>
        <div className={styles.search}>
          <div className={styles.searchIconWrapper}>
            <SearchIcon />
          </div>
          <input
            className={styles.styledInputBase}
            placeholder="Search Item"
            value={searchQuery}
            onChange={onSearchChange}
            aria-label="search"
            data-testid="search-input"
          />
        </div>
        <div className={styles.viewButtonContainer}>
          <button onClick={() => setViewLayout("grid")} className={`${styles.viewButton} ${(viewLayout === "grid") ? styles.viewButtonSelected : ""}`} data-testid="grid-view-button"><GridView /></button>
          <button onClick={() => setViewLayout("row")} className={`${styles.viewButton} ${(viewLayout === "row") ? styles.viewButtonSelected : ""}`} data-testid="row-view-button"><Menu /></button>

        </div>
        

      </div>
      <Tabs value={tabValue} onChange={handleChange} className={styles.tabs}>
          <Tab label="Menu" className={styles.tabItem} data-testid="menu-tab"/>
          <Tab label="Favourites" className={styles.tabItem} data-testid="favourites-tab"/>
        </Tabs>

    </div>
  );
};

export default MenuHeader;
