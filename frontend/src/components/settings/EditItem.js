import React, { useState } from 'react';
import styles from '../../styles/settings/EditItem.module.css';
import { useNavigate } from 'react-router-dom';
import TopNav from '../TopNav';
import { Upload } from '@mui/icons-material';

const EditItem = ({ createMenuItem }) => {
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
        title="Edit Menu Item"
        pathname="/settings/MenuPreset"
        hasBackButton="yes"
      />
      <div className={styles.screen}>
        <form className={styles.form}>
          <h3 className={styles.labelHeader}>
            Enter Menu Item Details
          </h3>
          <div className={styles.inputGroup}>

            <div className={styles.inputGroupRow}>
              <h3 className={styles.label} htmlFor="itemName">Item Name</h3>
              <input
                type="text"
                id="itemName"
                placeholder="E.g. Chicken Rice"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className={`${styles.input} ${styles.nameGroup}`}
              />
            </div>
            <div className={styles.inputGroupRow}>
              <h3 className={styles.label} htmlFor="idNo">Item Number (Optional)</h3>
              <input
                type="text"
                id="idNo"
                placeholder='E.g. 2'
                value={idNo}
                onChange={(e) => setIdNo(e.target.value)}
                className={`${styles.input} ${styles.idGroup}`}
              />
            </div>
          </div>
          <h3 className={styles.labelHeader}>
            Enter Menu Item Price
          </h3>
          <div className={styles.inputGroup}>
            <div className={styles.inputGroupRow}>
              <h3 className={styles.label} htmlFor="price">Item Price</h3>

              <input
                type="text"
                id="price"
                placeholder="$0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
          <h3 className={styles.labelHeader}>
            Upload Image  (Optional)
          </h3>

          <div className={styles.uploadGroup}>
            <label className={styles.uploadButton} htmlFor="uploadImage">
              <Upload />
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
        <button onClick={handleConfirm} className={styles.deleteButton} >
          Remove Item
        </button>
      </div>
    </div>
  );
};

export default EditItem;
