import React from 'react';

const Event = ({ handleChange, eventState, setEventState }) => {
  return (
    <div className="mb-8 mt-4 md:text-lg">
      <div className="mb-3">
        <label
          htmlFor="time"
          className="mb-1 block text-sm font-medium text-gray-700 md:text-xl"
        >
          Time
        </label>
        <input
          type="time"
          id="time"
          name="time"
          className="block h-12 w-full rounded-md border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:text-xl"
          value={eventState.time}
          onChange={handleChange}
          step="300"
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="event"
          className="mb-1 block text-sm font-medium text-gray-700 md:text-xl"
        >
          {' '}
          Event Name
        </label>

        <input
          type="text"
          id="event"
          name="event"
          placeholder="Event Name"
          className="block h-12 w-full rounded-md border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  sm:text-sm md:text-xl"
          value={eventState.event}
          onChange={handleChange}
          maxLength="40"
        />
        <p className="text-xs text-gray-500">Max 40 characters</p>
      </div>

      <div className="mb-3">
        <label
          htmlFor="rating"
          className="mb-1 block text-sm font-medium text-gray-700 md:text-xl md:text-xl"
        >
          Rating
        </label>
        <input
          type="number"
          id="rating"
          name="ratingEvent"
          placeholder="Rating"
          className="block h-12 w-full rounded-md border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  sm:text-sm md:text-xl"
          value={eventState.ratingEvent}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="typeOfActivity"
          className="mb-1 block text-sm font-medium text-gray-700 md:text-xl"
        >
          Type of Activity
        </label>
        <select
          id="typeOfActivity"
          name="typeOfActivity"
          className="block h-12 w-full rounded-md border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  sm:text-sm md:text-xl"
          value={eventState.typeOfActivity}
          onChange={handleChange}
        >
          <option value="sightseeing">Sightseeing</option>
          <option value="dining">Dining</option>
          <option value="shopping">Shopping</option>
          <option value="outdoors">Outdoors</option>
          <option value="entertainment">Entertainment</option>
        </select>
      </div>
      <div className="mb-3">
        <label
          htmlFor="location"
          className="mb-1 block text-sm font-medium text-gray-700 md:text-xl"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          name="locationEvent"
          placeholder="Location"
          className="block h-12 w-full rounded-md border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  sm:text-sm md:text-xl"
          value={eventState.locationEvent}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="price"
          className="mb-1 block text-sm font-medium text-gray-700 md:text-xl"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          name="priceEvent"
          placeholder="Price"
          className="block h-12 w-full rounded-md border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  sm:text-sm md:text-xl"
          value={eventState.priceEvent}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Event;
