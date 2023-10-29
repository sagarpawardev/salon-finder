import React, { useState } from 'react';
import axios from 'axios';

const AddLocality = () => {
  const locality = '';
  const handleLocalityChange = (e) => {
    setLocality(e.target.value);
  };

  function setLocality(localityValue) {
    locality = localityValue;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://api.example.com/weather?city=${locality}`
      );

      // setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
        Locality:
          <input
            type="text"
            value={locality}
            onChange={handleLocalityChange}
            required
          />
        </label>
        <button type="submit">Add Locality</button>
      </form>
    </div>
  );
};

export default AddLocality;
