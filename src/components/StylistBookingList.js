import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import { client } from '../utils';

import BookingCard from './BookingCard';

export function StylistBookingList({stylistId}) {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API and set it to the state
    // Replace 'API_URL' with the actual API endpoint
    client.get('/stylist/booking')
      .then((response) => response.data)
      .then((data) => setBookings(data.upcoming))
      .catch((error) => console.error(error));
  }, [stylistId]);

  const handleCardClick = (bookingId) => {
    // Handle card click, e.g., show more details or navigate to a new page
    navigate(`/partner/booking/${bookingId}/verify`)
    console.log(`Clicked on Booking ID: ${bookingId}`);
  };

  return (
    <div className="booking-list">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.booking_id}
          bookingId={booking.booking_id}
          customerName={booking.user}
          time={booking.start_time}
          services={booking.services}
          onClick={() => handleCardClick(booking.booking_id)}
        />
      ))}
    </div>
  );
};

export default StylistBookingList;
