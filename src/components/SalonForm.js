import React, { useState, useEffect } from 'react';

function SalonForm() {
  const [formData, setFormData] = useState({
    name: '',
    cityId: '',
    address: '',
    addressLink: '',
    phone: '',
  });

  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Fetch the list of cities from an API
    const fetchCities = async () => {
      try {
        const response = await fetch('https://your-city-api.com');
        if (response.ok) {
          const data = await response.json();
          setCities(data);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace the API_URL with your actual API endpoint
      const API_URL = 'https://your-api-endpoint.com';
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success, e.g., show a success message
        console.log('Form submitted successfully');
      } else {
        // Handle API error, e.g., show an error message
        console.error('Error submitting the form');
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>City ID:</label>
        <select
          name="cityId"
          value={formData.cityId}
          onChange={handleChange}
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Address Link:</label>
        <input
          type="text"
          name="addressLink"
          value={formData.addressLink}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default SalonForm;
