import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import itinerary from '../../dummyData/dumdum.json';
// import itinerariesDummy from '../../dummyData/dummyItinerary.json';
import axios from 'axios';
export default function Itinerary() {
  const location = useLocation();
  const [itinerary, setItinerary] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchItinerary = async () => {
      const queryParams = new URLSearchParams(location.search);
      const id = queryParams.get('id');
      console.log(id);

      try {
        // Update the URL to point to your backend API endpoint
        const response = await axios.get(
          `http://localhost:8080/itineraries/${id}`,
        );
        setItinerary(response.data);
      } catch (error) {
        console.error('Error fetching itinerary:', error);
        // Handle error or set some state to show an error message
      }
    };

    if (location.search) {
      fetchItinerary();
    }
  }, [location]);

  console.log(itinerary);
  if (!itinerary) {
    return <div className="px-32">No itinerary found.</div>;
  }
  const formattedDate = new Date(itinerary.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <>
      {' '}
      <div className="px-32 pt-5">
        <h2>{itinerary.name}</h2>
        <p>Visit to: {itinerary.city}</p>
        <p>Total Price: ${itinerary.totalPrice}</p>
        {itinerary.hotel && itinerary.hotel.imageURL && (
          <div>
            <h3>Hotel:</h3>
            <img
              src={itinerary.hotel.imageURL}
              alt="Hotel"
              className="object-cover"
              style={{ width: '100%', maxHeight: '400px' }}
            />
          </div>
        )}
        {itinerary.restaurants && itinerary.restaurants.length > 0 && (
          <div>
            <h3>Restaurants:</h3>
            {itinerary.restaurants.map((restaurant, index) => (
              <div key={index}>
                {restaurant.imageURL && (
                  <img
                    src={restaurant.imageURL}
                    alt={`Restaurant ${index + 1}`}
                    style={{ width: '100%', maxHeight: '200px' }}
                  />
                  {/* <div className="text-lg">{restaurant.</div> */}
                )}
              </div>
            ))}
          </div>
        )}
        {/* <p>Date: {formattedDate}</p>
       
        <p>Like Count: {itinerary.likeCount}</p>
        <p>Comment Count: {itinerary.commentCount}</p>
       
        <div>
          <h3>Restaurants:</h3>
        </div> */}
        <div>
          <h3>Events:</h3>
        </div>
      </div>
    </>
  );
}
