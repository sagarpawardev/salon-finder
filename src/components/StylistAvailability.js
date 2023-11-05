// ToggleButton.js

import React, { useState, useEffect } from 'react';
import { client } from '../utils';

// export function StylistAvailability({ stylistId }) {
export function StylistAvailability() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // Fetch the initial status from the API
    // client.get(`stylist/${stylistId}`)
    client.get('/stylist')
      .then((response) => {
        setStatus(response?.data?.active);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const toggleStatus = () => {
    // Toggle the status (active/inactive) locally
    
    // client.patch(`/stylist/${stylistId}/status`, {
    client.patch('/stylist/status', {
      available: !status 
    })
      .then((response) => {
        setStatus(!status);
        // console.log(status)
        // setStatus(response?.data?.status);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });

  };

  return (
    <div>
      <span>Status: {status ? 'Available' : 'Unavailable'}</span>
      <button onClick={toggleStatus}>{status ? 'Mark Unavailable' : 'Mark Available'}</button>
    </div>
  );
};

export default StylistAvailability;
