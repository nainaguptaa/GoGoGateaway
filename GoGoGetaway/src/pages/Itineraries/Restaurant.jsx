import React from 'react';

const Restaurant = ({ handleChange, resState, setResState }) => {
  return (
    <div className="mb-8 mt-4">
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
          className="block h-12 w-full rounded-md border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 md:text-xl"
          value={resState.time}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="restaurant"
          className="mb-1 block text-sm font-medium text-gray-700 md:text-xl"
        >
          Restaurant Name
        </label>
        <input
          type="text"
          id="restaurant"
          name="restaurant"
          placeholder="Restaurant Name"
          className="block h-12 w-full rounded-md border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 "
          value={resState.restaurant}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="rating"
          className="mb-1 block text-sm font-medium text-gray-700 md:text-xl"
        >
          Rating
        </label>
        <input
          type="number"
          id="rating"
          name="ratingRestaurant"
          placeholder="Rating"
          className="block h-12 w-full rounded-md border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 "
          value={resState.ratingRestaurant}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="cuisine"
          className="mb-1 block text-sm font-medium text-gray-700 md:text-xl"
        >
          Cuisine
        </label>
        <select
          id="cuisine"
          name="cuisine"
          className="block h-12 w-full rounded-md border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={resState.cuisine}
          onChange={handleChange}
        >
          <option value="italian">Italian</option>
          <option value="mexican">Mexican</option>
          <option value="chinese">Chinese</option>
          <option value="indian">Indian</option>
          <option value="french">French</option>
        </select>
      </div>

      <div className="mb-3 md:text-xl">
        <label
          htmlFor="location"
          className="mb-1 block text-sm font-medium text-gray-700 md:text-xl"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          name="locationRestaurant"
          placeholder="Location"
          className="block h-12 w-full rounded-md border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={resState.locationRestaurant}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Restaurant;
