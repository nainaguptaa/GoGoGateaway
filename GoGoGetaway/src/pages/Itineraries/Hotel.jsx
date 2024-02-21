import React from 'react';

const Hotel = ({ handleChange, hotelState, setHotelState }) => {
  return (
    <div>
      <h1>Hotel</h1>
      <label htmlFor="time">Time</label>
      <input
        type="time"
        id="time"
        name="time"
        // placeholder="Event Name"
        value={hotelState.time}
        onChange={handleChange}
      />
      <label htmlFor="hotel">Hotel Name</label>
      <input
        type="text"
        id="hotel"
        name="hotel"
        placeholder="Hotel Name"
        onChange={handleChange}
        value={hotelState.hotel}
      />
      <label htmlFor="rating">Rating</label>
      <input
        type="number"
        id="rating"
        name="ratingHotel"
        placeholder="Rating"
        onChange={handleChange}
        value={hotelState.ratingHotel}
      />
      <label htmlFor="bookingURL">Booking URL</label>
      <input
        type="text"
        id="bookingURL"
        name="bookingURL"
        placeholder="Booking URL"
        onChange={handleChange}
        value={hotelState.bookingURL}
      />
      <label htmlFor="imageURL">Image URL</label>
      <input
        type="text"
        id="imageURL"
        name="imageURL"
        placeholder="Image URL"
        onChange={handleChange}
        value={hotelState.imageURL}
      />
      <label htmlFor="location">Location</label>
      <input
        type="text"
        id="location"
        name="locationHotel"
        placeholder="Location"
        onChange={handleChange}
        value={hotelState.locationHotel}
      />
    </div>
  );
};

export default Hotel;
