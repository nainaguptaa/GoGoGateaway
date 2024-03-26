import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '@/context/userContext';
import { useToast } from '@/components/ui/use-toast';
import Itinerary from '../Itineraries/Itinerary';

export default function MyTrips() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useUserContext();
  const { toast } = useToast();
  const [savedItineraries, setSavedItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSavedItineraries = async () => {
      if (!currentUser || !currentUser.id || !currentUser.savedItineraries) {
        toast({
          title: "Error",
          description: "You must be logged in to view saved itineraries.",
          status: "error",
        });
        return;
      }

      try {
        const itineraryPromises = currentUser.savedItineraries.map(itineraryId =>
          axios.get(`http://localhost:8080/itineraries/${itineraryId}`)
        );
        const responses = await Promise.all(itineraryPromises);
        const itinerariesData = responses.map(response => response.data);
        setSavedItineraries(itinerariesData);
      } catch (err) {
        console.error('Failed to fetch saved itineraries:', err);
        setError('Failed to fetch saved itineraries');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedItineraries();
  }, [currentUser, toast]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const removeSavedItinerary = async (itineraryId) => {
    try {
      const response = await axios.post(`http://localhost:8080/users/${currentUser.id}/remove-saved-itinerary`, { itineraryId });
      console.log('Response from remove itinerary:', response.data);
      console.log(itineraryId);
  
      toast({
        title: "Success",
        description: "Itinerary removed from saved list.",
        status: "success",
      });
  
      // Refresh the list of saved itineraries
      const updatedSavedItineraries = savedItineraries.filter(itinerary => itinerary.id !== itineraryId);
      setSavedItineraries(updatedSavedItineraries);
    } catch (error) {
      console.error('Error removing saved itinerary:', error);
      if (error.response) {
        console.error('Error details:', error.response.data);
      }
      toast({
        title: "Error",
        description: "Failed to remove itinerary. Please try again.",
        status: "error",
      });
    }
  };
  const calculateAverageRating = (itinerary) => {
    let totalRating = 0;
    let count = 0;

    if (itinerary.hotel && itinerary.hotel.rating) {
      totalRating += parseInt(itinerary.hotel.rating, 10);
      count += 1;
    }

    itinerary.events.forEach(event => {
      if (event.rating) {
        totalRating += parseInt(event.rating, 10);
        count += 1;
      }
    });

    itinerary.restaurants.forEach(restaurant => {
      if (restaurant.rating) {
        totalRating += parseInt(restaurant.rating, 10);
        count += 1;
      }
    });

    return count > 0 ? (totalRating / count).toFixed(1) : "No ratings";
  };

  return (
<div className="flex flex-col h-screen justify-start items-center pt-2">
  <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">Welcome, {currentUser.firstName}!</h1>
  <p>Your saved itineraries:</p>
  {savedItineraries.length > 0 ? (
    <div className="w-full max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedItineraries.map((itinerary) => (
          <div key={itinerary.id} className="cursor-pointer rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative">
            <img src={itinerary.images[0]} alt="Itinerary" className="h-56 w-full object-cover" />
            <div className="p-4 bg-white">
              <h3 className="text-xl font-light text-gray-900">{itinerary.name}</h3>
              <p className="text-gray-600">{itinerary.city}</p>
              <p className="font-light text-gray-800">Total Price: ${itinerary.totalPrice}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-2">★</span>
                  <span className="font-bold text-gray-800">{calculateAverageRating(itinerary)}</span>
                </div>
                {/* <button
                  onClick={() => removeSavedItinerary(itinerary.id)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-300"
                >
                  Remove
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p>No saved itineraries found.</p>
  )}
</div>
  );
}