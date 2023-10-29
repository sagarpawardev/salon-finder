import React, { useState } from 'react';
import axios from 'axios';

const AddCity = () => {
  const city = '';
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  function setCity(cityValue) {
    city = cityValue;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://api.example.com/weather?city=${city}`
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
          City:
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            required
          />
        </label>
        <button type="submit">Add City</button>
      </form>
    </div>
  );
};

export default AddCity;
