import React, { useEffect, useState } from 'react';
import styles from '../../styles/settings/EditItem.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import TopNav from '../TopNav';
import { Upload } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../utils/axiosConfig';

const EditItem = () => {
  const location = useLocation();
  const { item } = location.state || {};
  const { user } = useAuth();
  const [itemName, setItemName] = useState('');
  const [itemNo, setItemNo] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const placeholderImage = 'https://placehold.co/100x100';

  useEffect(() => {
    if (item) {
      const { itemNo, itemName } = parseItemName(item.name);
      setItemName(itemName);
      setItemNo(itemNo);
      setPrice(item.price.toFixed(2));
      setImagePreview(item.imageUrl);
    }
  }, [item]);

  const parseItemName = (name) => {
    const regex = /^(\d+)\s*(.*)$/;
    const match = name.match(regex);
    if (match) {
      return { itemNo: match[1], itemName: match[2] };
    }
    return { itemNo: '', itemName: name };
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirm = async () => {
    if (user && item) {
      try {
        const formData = new FormData();
        const fullName = itemNo ? `${itemNo} ${itemName}` : itemName;
  
        formData.append('item[name]', fullName);
        formData.append('item[price]', price);
        if (image) {
          formData.append('item[image]', image);
        }
  
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
  
        const response = await axiosInstance.patch(`/users/${user.user_id}/items/${item.id}`, formData, config);
  
        if (response.status === 200) {
          console.log('Item updated successfully');
          navigate('/settings/menu-preset');
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error('Failed to update menu item:', error);
      }
    }
  };

  const handleDelete = async () => {
    if (user && item) {
      try {
        const response = await axiosInstance.delete(`/users/${user.user_id}/items/${item.id}`);
        if (response.status === 200) {
          console.log('Item deleted successfully');
          navigate('/settings/menu-preset');
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error('Failed to delete menu item:', error);
      }
    }
  };

  return (
    <div>
      <TopNav
        title="Edit Menu Item"
        pathname="/settings/menu-preset"
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
                data-testid="item-name-input"
              />
            </div>
            <div className={styles.inputGroupRow}>
              <h3 className={styles.label} htmlFor="itemNo">Item Number (Optional)</h3>
              <input
                type="text"
                id="itemNo"
                placeholder='E.g. 2'
                value={itemNo}
                onChange={(e) => setItemNo(e.target.value)}
                className={`${styles.input} ${styles.idGroup}`}
                data-testid="item-no-input"
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
                data-testid="item-price-input"
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
                data-testid="item-image-input"
              />
            </label>
          </div>
          <div className={styles.imagePreviewContainer}>
            <img
              src={imagePreview || placeholderImage}
              alt="Preview"
              className={styles.imagePreview}
              data-testid="item-image-preview"
            />
          </div>
        </form>
        <button onClick={handleConfirm} className={styles.confirmButton} data-testid="confirm-item-button">
          Confirm
        </button>
        <button onClick={handleDelete} className={styles.deleteButton} data-testid="delete-item-button">
          Remove Item
        </button>
      </div>
    </div>
  );
};

export default EditItem;
