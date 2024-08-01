import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';

const AutoGenerate = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // For displaying the image preview
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Create a preview of the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image_path', image);

    // Set the fixed prompt
    const prompt = `Please output all the food items along with their respective prices in English, formatted as a JSON object. Each food item should have a name and a price. If the price includes multiple values (e.g., "$4.00/$7.00/$9.00"), ensure all prices are captured and labeled as "1", "2", "3", etc., respectively. The JSON should be structured as follows:

    {
      "items": [
        {
          "name": "food item name",
          "price": {
            "1": "first price",
            "2": "second price",
            "3": "third price",
            ...
          }
        },
        ...
      ]
    }

    For example, if the price is "$4.00/$7.00/$9.00", it should be captured as:

    {
      "items": [
        {
          "name": "Apple",
          "price": {
            "1": "$4.00",
            "2": "$7.00",
            "3": "$9.00"
          }
        },
        {
          "name": "Banana",
          "price": "$0.50"
        }
      ]
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
        const content = res.data.candidates[0].content.parts[0].text; // Extracting the text part from the response
        setResponse(content);
      } else {
        setError('Unexpected response structure');
      }
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.error : err.message);
    }
  };

  return (
    <div>
      <h2>Auto Generate Content</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            accept="image/jpeg, image/png"
            onChange={handleImageChange}
            required
          />
        </div>
        {imagePreview && (
          <div>
            <h3>Image Preview:</h3>
            <img src={imagePreview} alt="Uploaded Preview" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        )}
        <button type="submit">Generate</button>
      </form>
      {response && (
        <div>
          <h3>Response:</h3>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
};

export default AutoGenerate;
