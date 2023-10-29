import React, { useState, useEffect } from 'react';
import BookingCard from './BookingCard';

const StylistBookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch data from the API and set it to the state
    // Replace 'API_URL' with the actual API endpoint
    fetch('API_URL')
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error(error));
  }, []);

  const handleCardClick = (bookingId) => {
    // Handle card click, e.g., show more details or navigate to a new page
    console.log(`Clicked on Booking ID: ${bookingId}`);
  };

  return (
    <div className="booking-list">
      {bookings.map((booking) => (
        <Card
          key={booking.id}
          bookingId={booking.id}
          customerName={booking.customerName}
          time={booking.time}
          onClick={() => handleCardClick(booking.id)}
        />
      ))}
    </div>
  );
};

export default StylistBookingList;
