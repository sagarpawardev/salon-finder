// ToggleButton.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StylistAvailability = ({ id }) => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    // Fetch the initial status from the API
    axios.get(`API_ENDPOINT/${id}`)
      .then((response) => {
        setStatus(response.data.status);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, [id]);

  const toggleStatus = () => {
    // Toggle the status (active/inactive) locally
    setStatus(!status);

    // Send an API request to update the status
    // You can implement this part as well
  };

  return (
    <div>
      <span>Status: {status ? 'Active' : 'Inactive'}</span>
      <button onClick={toggleStatus}>Toggle Status</button>
    </div>
  );
};

export default StylistAvailability;
