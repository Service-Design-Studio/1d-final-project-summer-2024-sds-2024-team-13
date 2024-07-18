import React from 'react';
import styles from "../../styles/payment/MenuItem.module.css";

const MenuItem = ({ name, price, imageUrl, onAdd }) => {
    return (
        <div className={styles.menuItem}>
            <img src={imageUrl} alt={name} className={styles.itemImage} />
            <div className={styles.itemDetails}>
                <span className={styles.itemName}>{name}</span>
                <span className={styles.itemPrice}>${price.toFixed(2)}</span>
            </div>
            <button className={styles.addButton} onClick={onAdd} data-testid={`add-${name.toLowerCase().replace(/\s/g, '-')}`}>Add</button>
        </div>
    );
};

export default MenuItem;
