import React, { useState } from 'react';
import styles from '../../styles/settings/AddItem.module.css';
import { useNavigate } from 'react-router-dom';
import TopNav from '../TopNav';

const AddItem = ({ createMenuItem }) => {
  const [itemName, setItemName] = useState('');
  const [idNo, setIdNo] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const placeholderImage = 'https://placehold.co/100x100';

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    // Assuming createMenuItem handles the creation of the menu item
    createMenuItem({ idNo, itemName, price, image });
    navigate('/settings/MenuPreset');
  };

  return (
    <div>
      <TopNav
        title="Add Menu Item"
        pathname="/settings/MenuPreset"
        hasBackButton="yes"
      />
      <div className={styles.container}>
        <form className={styles.form}>
          <div className={styles.inputGroupRow}>
            <h3 className={styles.label} htmlFor="itemName">Item Name</h3>
          </div>
          <div className={styles.inputGroupRow}>
            <input
              type="text"
              id="idNo"
              placeholder="ID No."
              value={idNo}
              onChange={(e) => setIdNo(e.target.value)}
              className={`${styles.input} ${styles.idGroup}`}
            />
            <input
              type="text"
              id="itemName"
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className={`${styles.input} ${styles.nameGroup}`}
            />
          </div>
          <div className={styles.inputGroupRow}>
            <h3 className={styles.label} htmlFor="price">Price</h3>
          </div>
          <div className={styles.inputGroupRow}>
            <input
              type="text"
              id="price"
              placeholder="$0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroupRow}>
            <h3 className={styles.label} htmlFor="uploadImage">Upload Image</h3>
          </div>
          <div className={styles.inputGroupRow}>
            <label className={styles.uploadButton} htmlFor="uploadImage">
              Browse images...
              <input
                type="file"
                id="uploadImage"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
            </label>
          </div>
          <div className={styles.imagePreviewContainer}>
            <img 
              src={imagePreview || placeholderImage} 
              alt="Preview" 
              className={styles.imagePreview} 
            />
          </div>
        </form>
        <button onClick={handleConfirm} className={styles.confirmButton} data-testid="confirm-item-button">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default AddItem;
