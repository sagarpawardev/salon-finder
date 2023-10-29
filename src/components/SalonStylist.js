import React, { useState, useEffect } from 'react';

function SalonStylist() {
    const [users, setUsers] = useState([]); // To store the list of users from the API
    const [isLoading, setIsLoading] = useState(true); // To track loading state
  
    // Fetch the list of users from your API when the component mounts
    useEffect(() => {
      // Replace 'YOUR_API_ENDPOINT' with the actual endpoint to fetch the user data
      fetch('YOUR_API_ENDPOINT')
        .then((response) => response.json())
        .then((data) => {
          setUsers(data); // Assuming the API response is an array of user objects
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }, []);
  
    return (
      <div>
        <h1>User List</h1>
        {isLoading ? (
          <p>Loading user data...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
  
  export default SalonStylist;
  