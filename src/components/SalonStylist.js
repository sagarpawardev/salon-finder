import React, { useState, useEffect } from 'react';
import client from '../utils/Client';
import { useParams } from "react-router-dom";

export function SalonStylist() {
    const [stylist, setStylist] = useState([]); // To store the list of users from the API
    const [isLoading, setIsLoading] = useState(true); // To track loading state
    const [addStylist, setAddStylist] = useState(null);
    const [removeStylist, setRemoveStylist] = useState(null);
    const [markInactiveStylist, setMarkInactiveStylist] = useState(null);

    const { salonId } = useParams()
  
    // Fetch the list of users from your API when the component mounts
    useEffect(() => {
      getStylist()
      setIsLoading(false);
    }, [salonId]);

    const getStylist = () => {
      client.get(`/salon/${salonId}/stylist`)
			.then(response => response.data)
			.then(data => {
				setStylist(data.stylist_list)
        setIsLoading(false)
			})
			.catch(errors => console.error(errors));
    }

    const handleAddStylist = () => {
      client.patch('/stylist/salon', {
        stylist_id: addStylist,
        salon_id: salonId,
        add: true
      })
			.then(response => response.data)
			.then(data => {
				getStylist()
			})
			.catch(errors => console.error(errors));
    }

    const handleRemoveStylist = () => {
      client.patch('/stylist/salon', {
        stylist_id: removeStylist,
        salon_id: null,
        add: false
      })
			.then(response => response.data)
			.then(data => {
				getStylist()
			})
			.catch(errors => console.error(errors));
    }

    const handleMarkinactiveStylist = () => {
      client.patch(`/stylist/${markInactiveStylist}/status`, {
        available: false 
      })
        .then((response) => {
          getStylist()
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
  
    }
  
    return (
      <div>
        <div>
          <h4>Stylist List</h4>
          {isLoading ? (
            <p>Loading user data...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Id</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stylist.map((stylist) => (
                  <tr key={stylist.stylist_id}>
                    <td>{stylist.name}</td>
                    <td>{stylist.stylist_id}</td>
                    <td>{stylist.active ? 'active' : 'inactive'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div>
          Add Stylist
          <input
            type="text"
            placeholder="Enter stylist id"
            value={addStylist}
            onChange={(e) => setAddStylist(e.target.value)}
          />
          <button onClick={handleAddStylist}>Add Stylist</button>
        </div>

        <div>
          Remove Stylist
          <input
            type="text"
            placeholder="Enter stylist id"
            value={removeStylist}
            onChange={(e) => setRemoveStylist(e.target.value)}
          />
          <button onClick={handleRemoveStylist}>Remove Stylist</button>
        </div>

        <div>
          Inactive Stylist
          <input
            type="text"
            placeholder="Enter stylist id"
            value={markInactiveStylist}
            onChange={(e) => setMarkInactiveStylist(e.target.value)}
          />
          <button onClick={handleMarkinactiveStylist}>Mark as inactive</button>
        </div>
      </div>
    );
  }
  
  export default SalonStylist;
  