import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import client from '../utils/Client';

function SalonForm() {
  const [salonOwnerResponse, setSalonOwnerResponse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    cityId: '',
    address: '',
    addressLink: '',
    phone: '',
    startTime: '',
    endTime: ''
  });

  const { salonId } = useParams();

  const [cities, setCities] = useState([]);

  useEffect(() => {
    client.get(`/salon/${salonId}/ownerView`)
                    .then(response => response.data)
                    .then(data => { 
                      setSalonOwnerResponse(data)
                      formData.name = data?.name
                      formData.cityId = data?.city_id
                      formData.address = data?.address
                      formData.addressLink = data?.address_link
                      formData.phone = data?.phone
                      formData.startTime = data?.context?.start_time
                      formData.endTime = data?.context?.end_time
                    });

    client.get("/city")
        .then(response => response.data)
        .then(data => setCities(data.city_list))
        
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    client.patch(`/salon/${salonId}`, {
      name: formData.name,
      city_id: formData.cityId,
      address: formData.address,
      address_link: formData.addressLink,
      phone: formData.phone,
      context: {
        start_time: formData.startTime,
        end_time: formData.endTime
      }
		})
		.then(request => request.data)
		.catch(errors => console.error(errors));
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
          {/* <option value="">Select a city</option> */}
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.city}
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

      <div>
        <label>Start Time:</label>
        <input
          type="text"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>End Time:</label>
        <input
          type="text"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default SalonForm;
