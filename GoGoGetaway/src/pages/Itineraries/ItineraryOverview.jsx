import React from 'react';

export default function ItineraryOverview({ itineraries }) {
  return (
    <div className="mt-4 rounded-xl border-2 bg-card p-5">
      <div className="mb-3 py-4 text-4xl">Itinerary Overview</div>
      <div className="mt-5 flex flex-col gap-6">
        <div>
          {' '}
          <h2 className="mb-3 text-2xl font-semibold">Events</h2>{' '}
          <div className="flex gap-2 border-b-2 pb-6">
            {itineraries.events.length > 0 ? (
              itineraries.events.map((event, index) => (
                <div
                  key={index}
                  className="w-[25rem] rounded-xl border-2 p-3 shadow-md"
                >
                  <div className="left-0 flex justify-start gap-1 overflow-x-auto text-2xl font-normal">
                    {event.event}
                  </div>
                  <div className="flex-col py-4 text-lg">
                    {' '}
                    <p className=" flex gap-2  px-3 py-2 text-lg">
                      <strong>Time:</strong>{' '}
                      <div className="text-normal">{event.time}</div>
                    </p>
                    <p className=" flex gap-2  px-3 py-2 text-lg">
                      <strong>Rating:</strong> {event.ratingEvent}
                    </p>
                    <p className=" flex gap-2  px-3 py-2 text-lg">
                      <strong>Type of Activity:</strong> {event.typeOfActivity}
                    </p>
                    <p className=" flex gap-2  px-3 py-2 text-lg">
                      <strong>Location:</strong>{' '}
                      <div className="overflow-x-auto">
                        {event.locationEvent}
                      </div>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No events added.</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold">Restaurants</h2>
          <div className="flex gap-2 ">
            {' '}
            {itineraries.restaurant.length > 0 ? (
              itineraries.restaurant.map((restaurant, index) => (
                <div
                  key={index}
                  className="w-[25rem] rounded-xl border-2 p-3 shadow-md"
                >
                  <div className="left-0 flex justify-start gap-1 overflow-x-auto text-2xl font-normal">
                    {' '}
                    {restaurant.restaurant}
                  </div>

                  <p className=" flex gap-2  px-1 py-1 text-lg">
                    <strong>Rating:</strong> {restaurant.ratingRestaurant}
                  </p>
                  <p className=" flex gap-2  px-1 py-1 text-lg">
                    <strong>Cuisine:</strong> {restaurant.cuisine}
                  </p>
                  <p className=" flex gap-2  px-1 py-1 text-lg">
                    <strong>Location:</strong>{' '}
                    <div className="overflow-x-auto">
                      {restaurant.locationRestaurant}
                    </div>
                  </p>
                </div>
              ))
            ) : (
              <p>No restaurants added.</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 border-b-2 pb-6">
          <h2 className="text-2xl font-semibold">Hotel</h2>
          {itineraries.hotel ? (
            <div className="w-[25rem] rounded-xl border-2 p-3 shadow-md">
              <div className="left-0 flex justify-start gap-1 overflow-x-auto text-2xl font-normal">
                {itineraries.hotel.hotel}
              </div>
              <div className="flex-col px-3 py-4 text-lg">
                {' '}
                <p className=" flex gap-2   py-2 text-lg">
                  <strong>Rating:</strong> {itineraries.hotel.ratingHotel}
                </p>
                <p className=" flex gap-2   py-2 text-lg">
                  <strong>Booking URL:</strong>{' '}
                  <a
                    href={itineraries.hotel.bookingURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue overflow-x-auto underline"
                  >
                    Click Here
                  </a>
                </p>
                <p className=" flex gap-2  py-2 text-lg">
                  <strong>Image URL:</strong>{' '}
                  <a
                    href={itineraries.hotel.imageURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {itineraries.hotel.imageURL}
                  </a>
                </p>
                <p className=" flex gap-2  py-2 text-lg">
                  <strong>Location:</strong> {itineraries.hotel.locationHotel}
                </p>
              </div>
            </div>
          ) : (
            <p>No hotel added.</p>
          )}
        </div>
      </div>
    </div>
  );
}
