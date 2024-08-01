import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';

const AutoGenerate = () => {
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image_path', image);

    // Set the fixed prompt
    const prompt = `Please output all the food items along with their respective prices in English, formatted as a JSON object. Each food item should have a name and a price. If the price includes a range (e.g., "$4.00/$7.00"), ensure both prices are captured as "small" and "big" respectively. The JSON should be structured as follows:

    {
      "items": [
        {
          "name": "food item name",
          "price": {
            "small": "small price",
            "big": "big price"
          }
        },
        ...
      ]
    }

    For example, if the price is "$4.00/$7.00", it should be captured as:

    {
      "items": [
        {
          "name": "Apple",
          "price": {
            "small": "$4.00",
            "big": "$7.00"
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
