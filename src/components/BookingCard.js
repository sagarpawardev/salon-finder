import React from 'react';

const BookingCard = ({ bookingId, customerName, time, services, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <h2>Booking ID: {bookingId}</h2>
      <p>Customer Name: {customerName}</p>
      <p>Time: {time}</p>
      <p>Services: {services}</p>
    </div>
  );
};

export default BookingCard;
