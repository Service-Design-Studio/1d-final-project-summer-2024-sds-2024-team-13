import React from 'react';
import styles from "../../styles/payment/MenuItem.module.css";

const MenuItem = ({ name, price, imageUrl, onClick, initialLabel }) => {
    const buttonClass = initialLabel === 'Add' ? styles.addButton : styles.editButton;

    return (
        <div className={styles.menuItem}>
            <img src={imageUrl} alt={name} className={styles.itemImage} />
            <div className={styles.itemDetails}>
                <span className={styles.itemName}>{name}</span>
                <span className={styles.itemPrice}>${price.toFixed(2)}</span>
            </div>
            <button
                className={buttonClass}
                onClick={onClick}
                data-testid={`button-${name.toLowerCase().replace(/\s/g, '-')}`}
            >
                {initialLabel}
            </button>
        </div>
    );
};

export default MenuItem;
