import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import styles from "../../styles/settings/AutoGenerate.module.css";
import { Camera } from "react-camera-pro";
import TopNav from '../TopNav';
import CameraIcon from '@mui/icons-material/Camera';
import LinearProgress from '@mui/material/LinearProgress';

const AutoGenerate = () => {
  const navigate = useNavigate();
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(10);
  const [progress, setProgress] = useState(0);
  const [confirmClicked, setConfirmClicked] = useState(false);

  const handleTakePhoto = () => {
    const capturedImage = camera.current.takePhoto();
    setImage(capturedImage);
    setImagePreview(capturedImage); // Set image preview for taken photo
  };

  const handleRetakePhoto = () => {
    setImage(null);
    setImagePreview(null); // Clear image preview
    setConfirmClicked(false); // Reset confirm click state
    setCounter(10); // Reset counter
    setProgress(0); // Reset progress
  };

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image_path', image);

    const prompt = `You are given an image with food menu items. Please output all the food items along with their respective prices in English, formatted as a JSON object. Each food item should have a name and a price. If the price includes multiple values (e.g., "$4.00/$7.00/$9.00"), include the corresponding number (1), (2), (3), etc., behind the food item name. If a price is unreadable, label it as "?.??". If the food item name is unreadable, skip that item. All prices should be in 2 decimal places. The JSON should be structured as follows:

    {
      "items": [
        {
          "name": "food item name (1)",
          "price": "first price"
        },
        {
          "name": "food item name (2)",
          "price": "second price"
        },
        ...
      ]
    }

    For example, if the price is "$4.00/$7.00/$9.00", it should be captured as:

    {
      "items": [
        {
          "name": "Apple (1)",
          "price": "$4.00"
        },
        {
          "name": "Apple (2)",
          "price": "$7.00"
        },
        {
          "name": "Apple (3)",
          "price": "$9.00"
        },
        {
          "name": "Banana",
          "price": "$0.50"
        }
      ]
    }

    If the price is unreadable, it should be captured as:

    {
      "items": [
        {
          "name": "Apple (1)",
          "price": "?.??"
        },
        {
          "name": "Apple (2)",
          "price": "?.??"
        },
        {
          "name": "Apple (3)",
          "price": "?.??"
        }
      ]
    }

    If the image is not a menu, output an empty JSON object like this:

    {
      "items": []
    }`;
    formData.append('prompt', prompt);

    try {
      const res = await axiosInstance.post('/generate_content', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', res.data);

      if (res.data && res.data.candidates) {
        const content = res.data.candidates[0].content.parts[0].text;
        setResponse(content);
        setConfirmClicked(true); // Set confirm click state
      } else {
        setError('Unexpected response structure');
      }
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.error : err.message);
    }
  };

  // Effect for redirect and progress bar
  useEffect(() => {
    if (confirmClicked) {
      if (counter > 0) {
        const interval = setInterval(() => {
          setCounter((prev) => prev - 1);
          setProgress((prev) => prev + 10);
        }, 1000);

        return () => clearInterval(interval);
      } else {
        navigate('/settings/MenuPreset'); // Redirect to menu preset page after 10 seconds
      }
    }
  }, [confirmClicked, counter, navigate]);

  return (
    <div>
      <TopNav
        title="Capture Menu"
        pathname="/settings/MenuPreset"
        hasBackButton="yes"
      />
      <div className={styles.main}>
        <div className={styles.camera_container}>
          {!image ? (
            <Camera ref={camera} aspectRatio={16 / 9} />
          ) : (
            <div className={styles.image_preview}>
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>
        <div className={styles.button_container}>
          {!image ? (
            <>
              <button className={styles.capture_button} onClick={handleTakePhoto}>
                <CameraIcon />
              </button>
              <label className={styles.upload_button}>
                Upload an image
                <input type="file" accept="image/*" onChange={handleUploadImage} style={{ display: 'none' }} />
              </label>
            </>
          ) : (
            <>
              <button className={styles.capture_button} onClick={handleConfirm}>
                Confirm
              </button>
              <button className={styles.capture_button} onClick={handleRetakePhoto}>
                Retake photo
              </button>
            </>
          )}
        </div>
      </div>
      <div className={styles.footer}>
        <h3>Capture Menu</h3>
        <p>Align camera with Merchant Menu to generate Menu Items.</p>
        {confirmClicked && (
          <div className={styles.redirect}>
            <p>Redirecting you back to menu preset in {counter}s</p>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: '7px',
                width: '90vw',
                borderRadius: "8px",
                backgroundColor: '#FB7C93',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#fff',
                },
              }}
            />
          </div>
        )}
        {response && (
          <div>
            <h3>Response:</h3>
            <pre>{response}</pre>
          </div>
        )}
        {error && (
          <div>
            <h3>Error:</h3>
            <pre>{error}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoGenerate;
