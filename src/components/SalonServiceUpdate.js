import React, { useEffect, useState } from 'react';
import client from '../utils/Client';
import { useParams } from "react-router-dom";

export function SalonServiceUpdate() {
  // Sample data (replace with your own)
  const [services, setServices] = useState([])
  const [salonServices, setSalonServices] = useState([])
  const [serviceToRemove, setServiceToRemove] = useState('')
  const [time, setTime] = useState(null);
  const [price, setPrice] = useState(null);

  const [selectedService, setSelectedService] = useState(''); // Initial value for the first dropdown

  const {salonId} = useParams()

  useEffect(() => {
    client.get(`/salon/${salonId}/services`)
			.then(response => response.data)
			.then(data => {
				setSalonServices(data.services)
			})
			.catch(errors => console.error(errors));

    client.get(`/salon/${salonId}/allServices`)
			.then(response => response.data)
			.then(data => {
				setServices(data)
			})
			.catch(errors => console.error(errors));

    
	}, [salonId]);

  const handleAddService = () => {
    client.patch(`/salon/${salonId}/addService`, {
      name: selectedService,
      time: time,
      price: price
    })
			.then(response => response.data)
			.then(data => {
				setSalonServices(data.services)
        // getSalonServices()
			})
			.catch(errors => console.error(errors));

  }

  const handleDeleteService = () => {
    client.patch(`/salon/${salonId}/removeService`, {
      name: serviceToRemove
    })
			.then(response => response.data)
			.then(data => {
				setSalonServices(data.services)
			})
			.catch(errors => console.error(errors));

  }

  return (
    <div>
      <h5>Current Services</h5>
      <ul>
        {salonServices.map((salonService, index) => (
          <li key={index}>
            Service: {salonService.name}, Time: {salonService.time}, Price: {salonService.price}
          </li>
        ))}
      </ul>

      <div>
      <h5>Update Service</h5>
      <label>Select Service to update
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          {
            services.map((service) => (
              <option value={service}>{service}</option>
            ))
          }
        </select>
        </label>
        <div>
          <label htmlFor="time">Time:</label>
          <input
            type="text"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button onClick={handleAddService}>Update Service</button>
      </div>

      <div>
      <h5>Delete Service</h5>
      <label>Select Service to remove
        <select
          value={serviceToRemove}
          onChange={(e) => setServiceToRemove(e.target.value)}
        >
          {
            salonServices.map((salonService) => (
              <option value={salonService.name}>{salonService.name}</option>
            ))
          }
        </select>
          </label>
        <button onClick={handleDeleteService}>Delete Service</button>
      </div>

    </div>

    
  );
}

export default SalonServiceUpdate;
