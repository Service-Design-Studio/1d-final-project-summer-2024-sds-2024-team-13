import React from 'react';
import styles from "../../styles/payment/MenuGridItem.module.css";
import { StarBorder, Star, Edit, Add } from '@mui/icons-material';

const MenuGridItem = ({ name, price, imageUrl, onClick, initialLabel, isFavorited, onFavoriteToggle }) => {

    return (
        <div className={styles.menuItem} >
            <button className={`${styles.favouriteButton} ${(isFavorited) ? styles.favouriteButtonSelected : ""}`} onClick={onFavoriteToggle}>
                {isFavorited ? <Star sx={{ fontSize: "1.2rem" }} /> : <StarBorder sx={{ fontSize: "1.2rem" }} />}
            </button>
            <div className={styles.content} onClick={onClick}>
                <img src={imageUrl} alt={name} className={styles.itemImage} />
                <div className={styles.itemDetails}>
                    <span className={styles.itemName}>{name}</span>
                    <span className={styles.itemPrice}>${price.toFixed(2)}</span>
                </div>
                <div className={styles.labelWrapper}>
                    {initialLabel === 'Add' ? <div className={styles.addLabel}><Add sx={{ fontSize: "1.7rem" }} /></div> : <Edit sx={{ fontSize: "1.7rem" }} />}
                </div>
            </div>

        </div>
    );
};

export default MenuGridItem;
