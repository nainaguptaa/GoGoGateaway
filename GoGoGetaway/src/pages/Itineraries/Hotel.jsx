import React from 'react';

const Hotel = ({ handleChange, hotelState, setHotelState }) => {
  return (
    <div className="mb-9 mt-4 md:text-lg">
      <div className="mb-3">
        <label
          htmlFor="time"
          className="mb-1 block text-sm font-medium text-gray-700 md:text-lg"
        >
          Time
        </label>
        <input
          type="time"
          id="time"
          name="time"
          className="block h-12 w-full rounded-md border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 "
          value={hotelState.time}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="hotel"
          className="mb-1 block text-sm font-medium text-gray-700 md:text-lg"
        >
          Hotel Name
        </label>
        <input
          type="text"
          id="hotel"
          name="hotel"
          placeholder="Hotel Name"
          className="block h-12 w-full rounded-md border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={hotelState.hotel}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="rating"
          className="mb-1 block text-sm font-medium text-gray-700 md:text-lg"
        >
          Rating
        </label>
        <input
          type="number"
          id="rating"
          name="ratingHotel"
          placeholder="Rating"
          className="block h-12 w-full rounded-md border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={hotelState.ratingHotel}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="bookingURL"
          className="mb-1 block text-sm font-medium text-gray-700 md:text-lg"
        >
          Booking URL
        </label>
        <input
          type="text"
          id="bookingURL"
          name="bookingURL"
          placeholder="Booking URL"
          className="block h-12 w-full rounded-md border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={hotelState.bookingURL}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="imageURL"
          className="mb-1 block text-sm font-medium text-gray-700 md:text-lg"
        >
          Image URL
        </label>
        <input
          type="text"
          id="imageURL"
          name="imageURL"
          placeholder="Image URL"
          className="block h-12 w-full rounded-md border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={hotelState.imageURL}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="location"
          className="mb-1 block text-sm font-medium text-gray-700 md:text-lg"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          name="locationHotel"
          placeholder="Location"
          className="block h-12 w-full rounded-md border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={hotelState.locationHotel}
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
          name="priceHotel"
          placeholder="Price"
          className="block h-12 w-full rounded-md border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  sm:text-sm md:text-xl"
          value={hotelState.priceHotel}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Hotel;
