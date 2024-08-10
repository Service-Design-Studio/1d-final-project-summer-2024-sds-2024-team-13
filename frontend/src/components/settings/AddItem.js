import React, { useState } from 'react';
import styles from '../../styles/settings/AddItem.module.css';
import { useNavigate } from 'react-router-dom';
import TopNav from '../TopNav';
import { Upload } from '@mui/icons-material';
import axiosInstance from '../../utils/axiosConfig';
import { useAuth } from '../../context/AuthContext';

const AddItem = () => {
  const [itemName, setItemName] = useState('');
  const [idNo, setIdNo] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status
  const navigate = useNavigate();
  const placeholderImage = 'https://placehold.co/100x100';
  const { user } = useAuth();

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
    setIsSubmitting(true); // Disable button to prevent re-submission
    try {
      const formData = new FormData();
      const fullName = idNo ? `${idNo} ${itemName}` : itemName;
      formData.append('item[name]', fullName);
      formData.append('item[price]', price);
      if (image) {
        formData.append('item[image]', image);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      };

      const response = await axiosInstance.post(`/users/${user.user_id}/items`, formData, config);
      if (response.status === 200 || response.status === 201) {
        console.log('Item added successfully');
        navigate('/settings/menu-preset');
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Failed to add menu item:', error);
    } finally {
      setIsSubmitting(false); // Re-enable button after request completion
    }
  };

  return (
    <div>
      <TopNav
        title="Add Menu Item"
        pathname="/settings/menu-preset"
        hasBackButton="yes"
      />
      <div className={styles.screen}>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <h3 className={styles.labelHeader}>Enter Menu Item Details</h3>
          <div className={styles.inputGroup}>
            <div className={styles.inputGroupRow}>
              <h3 className={styles.label} htmlFor="itemName">Item Name</h3>
              <input type="text" id="itemName" placeholder="E.g. Chicken Rice" value={itemName} onChange={(e) => setItemName(e.target.value)} className={styles.input} data-testid="input_name-add" />
            </div>
            <div className={styles.inputGroupRow}>
              <h3 className={styles.label} htmlFor="idNo">Item Number (Optional)</h3>
              <input type="text" id="idNo" placeholder='E.g. 8' value={idNo} onChange={(e) => setIdNo(e.target.value)} className={styles.input} data-testid="input_num-add"/>
            </div>
          </div>
          <h3 className={styles.labelHeader}>Enter Menu Item Price</h3>
          <div className={styles.inputGroup}>
            <div className={styles.inputGroupRow}>
              <h3 className={styles.label} htmlFor="price">Item Price</h3>
              <input type="text" id="price" placeholder="$0.00" value={price} onChange={(e) => setPrice(e.target.value)} className={styles.input} data-testid="input_money-add"/>
            </div>
          </div>
          <h3 className={styles.labelHeader}>Upload Image (Optional)</h3>
          <div className={styles.uploadGroup}>
            <label className={styles.uploadButton} htmlFor="uploadImage">
              <Upload />
              Browse images...
              <input type="file" id="uploadImage" accept="image/*" onChange={handleImageChange} className={styles.fileInput} data-testid="input_image-add" />
            </label>
          </div>
          <div className={styles.imagePreviewContainer}>
            <img src={imagePreview || placeholderImage} alt="Preview" className={styles.imagePreview} />
          </div>
          <div className={styles.confirmGroup}>
            <button onClick={handleConfirm} className={styles.confirmButton} disabled={isSubmitting} data-testid="confirm-item-button">
              {isSubmitting ? 'Submitting...' : 'Confirm'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddItem;
