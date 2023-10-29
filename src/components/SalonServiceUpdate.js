import React, { useState } from 'react';

const YourComponent = () => {
  // Sample data (replace with your own)
  const initialData = [
    { service: 'Service 1', time: '9:00 AM' },
    { service: 'Service 2', time: '10:30 AM' },
    // Add more items
  ];

  const [data, setData] = useState(initialData);
  const [selectedService, setSelectedService] = useState('All'); // Initial value for the first dropdown
  const [selectedTime, setSelectedTime] = useState('All'); // Initial value for the second dropdown

  // Function to handle filtering based on dropdown selections
  const filterData = () => {
    const filteredData = initialData.filter(item => {
      if (selectedService !== 'All' && item.service !== selectedService) {
        return false;
      }
      if (selectedTime !== 'All' && item.time !== selectedTime) {
        return false;
      }
      return true;
    });
    setData(filteredData);
  };

  // Function to reset the filter and show all items
  const resetFilter = () => {
    setData(initialData);
    setSelectedService('All');
    setSelectedTime('All');
  };

  return (
    <div>
      <div>
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="All">All Services</option>
          {/* Add service options dynamically here */}
        </select>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="All">All Times</option>
          {/* Add time options dynamically here */}
        </select>
        <button onClick={filterData}>Filter</button>
        <button onClick={resetFilter}>Reset</button>
      </div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            Service: {item.service}, Time: {item.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourComponent;
