import React, { useState, useEffect } from 'react';
import client from '../utils/Client';
import { useParams } from "react-router-dom";

export function MapLocality() {
    const [localities, setLocalities] = useState([]); // To store the list of cities from the API
    const [selectedLocality, setSelectedLocality] = useState(null); // To store the selected city
    const [isLoading, setIsLoading] = useState(true); // To track loading state
    const [localityToRemove, setLocalityToRemove] = useState(null)
    const [mappedLocality, setMappedLocality] = useState([]);

    const { salonId } = useParams()
  
    // Fetch the list of cities from your API when the component mounts
    useEffect(() => {
      getMappedLocalities()
      client.get(`/salon/${salonId}/eligibleLocality`)
			.then(response => response.data)
			.then(data => {
				setLocalities(data.locality_response_list)
        setIsLoading(false)
			})
			.catch(errors => console.error(errors));
    }, [salonId]);

    const getMappedLocalities = () => {
      client.get(`/salon/${salonId}/mappedLocality`)
			.then(response => response.data)
			.then(data => {
				setMappedLocality(data.locality_response_list)
			})
			.catch(errors => console.error(errors));
    }

    const handleDeleteLocality = () => {
      client.post('/mapSalonLocality', {
        salon_id: salonId,
        locality_id: localityToRemove,
        add: false
      })
			.then(response => response.data)
			.then(data => {
				getMappedLocalities()
			})
			.catch(errors => console.error(errors));
    }
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      
      client.post('/mapSalonLocality', {
        salon_id: salonId,
        locality_id: selectedLocality,
        add: true
      })
			.then(response => response.data)
			.then(data => {
				getMappedLocalities()
			})
			.catch(errors => console.error(errors));
    };
  
    return (
      <div>
        <div>
          
          {isLoading ? (
            <p>Loading localities...</p>
          ) : (
            <div>
              <h4>Already Mapped Locality</h4>
            <ul>
              {mappedLocality.map((mappedLocality, index) => (
                <li key={index}>
                  Locality: {mappedLocality.locality}
                </li>
              ))}
            </ul>
            <h4>Add Locality</h4>
            <form onSubmit={handleSubmit}>
              <label>
                Select Locality to Add:
                <select value={selectedLocality} onChange={(e) => setSelectedLocality(e.target.value)}>
                  <option value="">Select a Locality</option>
                  {localities.map((locality) => (
                    <option key={locality.id} value={locality.id}>
                      {locality.locality}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit">Submit</button>
            </form>
            </div>
          )}
        </div>

        <div>
        <h4>Already Mapped Locality</h4>
        <label>
                Select Locality to Delete:
          <select
            value={localityToRemove}
            onChange={(e) => setLocalityToRemove(e.target.value)}
          >
            {
              mappedLocality.map((locality) => (
                <option key={locality.id} value={locality.id}>{locality.locality}</option>
              ))
            }
          </select>
          </label>

          <button onClick={handleDeleteLocality}>Delete Locality</button>
        </div>
      </div>  
    );
  }
  
  export default MapLocality;
  