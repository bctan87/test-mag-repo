// src/components/DataDisplay.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataDisplay: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [inputText, setInputText] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.magicthegathering.io/v1/cards');
      setData(response.data.cards || []); // Ensure data is an array or default to an empty array
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  // Check if data is an array before filtering
  const filteredData = Array.isArray(data) ? data.filter(item => item.name.includes(inputText)) : [];

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={inputText}
        onChange={handleInputChange}
      />
      <ul>
        {filteredData.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;
