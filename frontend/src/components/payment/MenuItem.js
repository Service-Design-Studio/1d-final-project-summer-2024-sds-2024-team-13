import React from 'react';
import styles from "../../styles/payment/MenuItem.module.css";
import { Add, Edit, StarBorder, Star } from '@mui/icons-material';

const MenuItem = ({ name, price, imageUrl, onClick, initialLabel, isFavorited, onFavoriteToggle }) => {
    const buttonClass = initialLabel === 'Add' ? styles.addButton : styles.editButton;

    return (
        <div className={styles.menuItem}>
            <img src={imageUrl} alt={name} className={styles.itemImage} />
            <div className={styles.itemDetails}>
                <span className={styles.itemName}>{name}</span>
                <span className={styles.itemPrice}>${price.toFixed(2)}</span>
            </div>
            <div className={styles.actions}>
                <button
                    className={styles.favoriteButton}
                    onClick={onFavoriteToggle}
                    data-testid={`favorite-button-${name.toLowerCase().replace(/\s/g, '-')}`}
                >
                    {isFavorited ? <Star /> : <StarBorder />}
                </button>
                <button
                    className={buttonClass}
                    onClick={onClick}
                    data-testid={`button-${name.toLowerCase().replace(/\s/g, '-')}`}
                >
                    {initialLabel === 'Add' ? <Add /> : <Edit />}
                </button>
            </div>
        </div>
    );
};

export default MenuItem;
