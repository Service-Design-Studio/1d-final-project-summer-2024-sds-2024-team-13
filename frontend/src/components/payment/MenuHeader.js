import React from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import styles from '../../styles/payment/MenuHeader.module.css';

const MenuHeader = ({ searchQuery, onSearchChange }) => {
  return (
    <div className={styles.menuHeader}>
      <div className={styles.title}>Current Menu Items</div>
      <div className={styles.search}>
        <div className={styles.searchIconWrapper}>
          <SearchIcon />
        </div>
        <input
          className={styles.styledInputBase}
          placeholder="Search menu id/item"
          value={searchQuery}
          onChange={onSearchChange}
          aria-label="search"
        />
      </div>
    </div>
  );
};

export default MenuHeader;
