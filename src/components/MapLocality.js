import React, { useState, useEffect } from 'react';

function CityForm() {
    const [cities, setCities] = useState([]); // To store the list of cities from the API
    const [selectedCity, setSelectedCity] = useState(''); // To store the selected city
    const [isLoading, setIsLoading] = useState(true); // To track loading state
  
    // Fetch the list of cities from your API when the component mounts
    useEffect(() => {
      // Replace 'YOUR_API_ENDPOINT' with the actual endpoint to fetch the cities
      fetch('YOUR_API_ENDPOINT')
        .then((response) => response.json())
        .then((data) => {
          setCities(data); // Assuming the API response is an array of cities
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching cities:', error);
        });
    }, []);
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      // Replace 'YOUR_API_ENDPOINT' with the actual endpoint to submit the selected city
      fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        body: JSON.stringify({ city: selectedCity }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Submitted city:', data);
          // You can handle the response as needed
        })
        .catch((error) => {
          console.error('Error submitting city:', error);
        });
    };
  
    return (
      <div>
        <h1>City Form</h1>
        {isLoading ? (
          <p>Loading cities...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Select a city:
              <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                <option value="">Select a city</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    );
  }
  
  export default CityForm;
  