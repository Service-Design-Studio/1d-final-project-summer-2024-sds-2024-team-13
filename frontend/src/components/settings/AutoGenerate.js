import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import styles from "../../styles/settings/AutoGenerate.module.css";

const AutoGenerate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { image } = location.state || {}; // Get image data from state
  const [response, setResponse] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const [confirmClicked, setConfirmClicked] = useState(false);

  useEffect(() => {
    if (image) {
      handleConfirm();
    }
  }, [image]);

  const handleConfirm = async () => {
    const formData = new FormData();
    formData.append('image_path', image);

    const prompt = `You are given an image with food menu items. Please output all the food items along with their respective prices in English, formatted as a JSON object. Each food item should have a name and a price. If the price includes multiple values (e.g., "$4.00/$7.00/$9.00"), include the corresponding number (1), (2), (3), etc., behind the food item name. DO NOT FORGET THE CORRESPONDING NUMBER. If a price is unreadable, label it as "?.??". If the food item name is unreadable, skip that item. All prices should be in 2 decimal places. The JSON should be structured as follows:

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

        Do not forget the numbers in the brackets and follow the format strictly. If the price is unreadable, it should be captured as:

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
        let contentString = res.data.candidates[0].content.parts[0].text.trim();
        console.log('Content String:', contentString);

        // Remove 'json' prefix and backticks if they exist
        contentString = contentString.replace(/json/, '').replace(/```/g, '').trim();
        console.log('Cleaned Content String:', contentString);

        // Check if contentString is a valid JSON string
        try {
          const content = JSON.parse(contentString);
          setResponse(content);
          setMenuItems(content.items);
          setConfirmClicked(true); // Set confirm click state
        } catch (parseError) {
          console.error('JSON Parsing Error:', parseError);
          setError('Failed to parse JSON response.');
        }
      } else {
        setError('Unexpected response structure');
      }
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.error : err.message);
    }
  };

  const handleContinue = () => {
    navigate('/settings/menuPreset', { state: { extractedMenu: menuItems } });
  };

  return (
    <div>
      <div className={styles.screen}>
        <div className={styles.content}>
          <div className={styles.instructions}>
            <h1>Here is what we extracted from your photo</h1>
            <p>You will be able to review, edit, and add pictures to the menu items after adding them to your Menu Preset.</p>
          </div>
          {confirmClicked && (
            <div className={styles.cardsContainer}>
              {menuItems.map((item, index) => (
                <div key={index} className={styles.card}>
                  <h4>{item.name}</h4>
                  <p>{item.price}</p>
                </div>
              ))}
              <button className={styles.continue_button} onClick={handleContinue}>
                Continue
              </button>
            </div>
          )}
          
          {error && (
            <div className={styles.error}>
              <h3>Error:</h3>
              <pre>{error}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoGenerate;
