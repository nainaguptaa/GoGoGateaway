import React from 'react';

const Event = ({ handleChange, eventState, setEventState }) => {
  return (
    <div>
      <h1>Event</h1>
      <label htmlFor="time">Time</label>
      <input
        type="time"
        id="time"
        name="time"
        // placeholder="Event Name"
        value={eventState.time}
        onChange={handleChange}
      />
      <label htmlFor="event">Event Name</label>
      <input
        type="text"
        id="event"
        name="event"
        placeholder="Event Name"
        value={eventState.event}
        onChange={handleChange}
      />
      <label htmlFor="rating">Rating</label>
      <input
        type="number"
        id="rating"
        name="ratingEvent"
        placeholder="Rating"
        value={eventState.ratingEvent}
        onChange={handleChange}
      />
      <label htmlFor="typeOfActivity">Type of Activity</label>
      <select
        id="typeOfActivity"
        name="typeOfActivity"
        value={eventState.typeOfActivity}
        onChange={handleChange}
      >
        <option value="sightseeing">Sightseeing</option>
        <option value="dining">Dining</option>
        <option value="shopping">Shopping</option>
        <option value="outdoors">Outdoors</option>
        <option value="entertainment">Entertainment</option>
      </select>
      <label htmlFor="location">Location</label>
      <input
        type="text"
        id="location"
        name="locationEvent"
        placeholder="Location"
        value={eventState.locationEvent}
        onChange={handleChange}
      />
    </div>
  );
};

export default Event;
