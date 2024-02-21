import React from 'react';

const Restaurant = ({ handleChange, resState, setResState }) => {
  return (
    <div>
      <h1>Restaurant</h1>
      <label htmlFor="time">Time</label>
      <input
        type="time"
        id="time"
        name="time"
        // placeholder="Event Name"
        value={resState.time}
        onChange={handleChange}
      />
      <label htmlFor="restaurant">Restaurant Name</label>
      <input
        type="text"
        id="restaurant"
        name="restaurant"
        placeholder="Restaurant Name"
        onChange={handleChange}
        value={resState.restaurant}
      />
      <label htmlFor="rating">Rating</label>
      <input
        type="number"
        id="rating"
        name="ratingRestaurant"
        placeholder="Rating"
        onChange={handleChange}
        value={resState.ratingRestaurant}
      />
      <label htmlFor="cuisine">Cuisine</label>
      <select
        id="cuisine"
        name="cuisine"
        onChange={handleChange}
        value={resState.cuisine}
      >
        <option value="italian">Italian</option>
        <option value="mexican">Mexican</option>
        <option value="chinese">Chinese</option>
        <option value="indian">Indian</option>
        <option value="french">French</option>
      </select>
      <label htmlFor="location">Location</label>
      <input
        type="text"
        id="location"
        name="locationRestaurant"
        placeholder="Location"
        onChange={handleChange}
        value={resState.locationRestaurant}
      />
    </div>
  );
};

export default Restaurant;
