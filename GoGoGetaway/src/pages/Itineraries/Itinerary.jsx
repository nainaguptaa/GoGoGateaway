import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import dumdum from '../../dummyData/dumdum.json';
import { useToast } from '@/components/ui/use-toast';

import ItineraryComments from './ItineraryComments';
import Stars from '@/components/Stars';
import { CiCalendar } from 'react-icons/ci';
import { MdLocationPin } from 'react-icons/md';
import { MdOutlineHotel } from 'react-icons/md';
// import itinerary from '../../dummyData/dumdum.json';
import itinerariesDummy from '../../dummyData/dummyItinerary.json';
import { useUserContext } from '@/context/userContext';
import { CiClock1 } from 'react-icons/ci';
import axios from 'axios';
export default function Itinerary() {
  const { toast } = useToast();
  const { currentUser } = useUserContext();
  const location = useLocation();
  const [itinerary, setItinerary] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [events, setEvents] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [itineraryId, setItineraryId] = useState('');
  // Function to toggle comments visibility
  const toggleComments = () => {
    setShowComments(!showComments);
  };
  console.log(itinerary);
  useEffect(() => {
    const fetchItinerary = async () => {
      const queryParams = new URLSearchParams(location.search);

      const id = queryParams.get('id');
      console.log(id);
      setItineraryId(id);

      try {
        // Update the URL to point to your backend API endpoint
        const response = await axios.get(
          `http://localhost:8080/itineraries/${id}`,
        );
        setItinerary(response.data);
      } catch (error) {
        const matchedItinerary = itinerariesDummy.find(
          (itin) => itin.id === id,
        );
        if (matchedItinerary) {
          setItinerary(matchedItinerary);
        }
        console.error('Error fetching itinerary:', error);
        // Handle error or set some state to show an error message
      }
    };

    if (location.search) {
      fetchItinerary();
    }
  }, [location]);

  if (!itinerary) {
    return <div className="px-32">No itinerary found.</div>;
  }
  const formattedDate = new Date(itinerary.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const saveItinerary = async () => {
    try {
      // Replace 'userId' with the actual logged-in user's ID
      const userId = currentUser.id;
      console.log('saving', currentUser.id);
      console.log(itineraryId);
      // Replace 'YOUR_BACKEND_ENDPOINT' with the actual backend endpoint URL
      const response = await axios.post(
        // 'http://localhost:8080/itineraries/create',
        `http://localhost:8080/users/${userId}/save-itinerary`,
        {
          itineraryId: itineraryId,
        },
      );
      console.log(response.status);
      // Check the response status code or message to determine the outcome
      if (response.status === 200) {
        // Handle success
        console.log(response.data.message);
        toast({
          description: `Itinerary Saved`,
        });
      } else if (response.data.message === 'Itinerary already saved') {
        // Handle already saved scenario
        toast({
          variant: 'destructive',
          title: 'Already Saved',
          description: `You have already saved this Itinerary`,
        });
      }
      // You may have more conditions based on other scenarios
    } catch (error) {
      console.error('Error saving itinerary:', error);
      toast({
        variant: 'destructive',
        title: 'Already Saved',
        description: `You have already saved this Itinerary`,
      });
      // alert('Error saving itinerary. Please try again later.');
    }
  };
  return (
    <>
      <div className="flex flex-col gap-2 px-40 py-8">
        <div className="text-4xl font-semibold">{itinerary.name}</div>
        <div className="mt-3 flex space-x-2 overflow-hidden rounded-3xl">
          {itinerary.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Itinerary Image"
              className="h-[23rem] w-[20rem] object-cover"
            />
          ))}
        </div>

        <div className="px-2 py-4">
          <div className="flex ">
            <div className="flex w-2/3 flex-col">
              <h1 className="text-3xl font-semibold">Itinerary Details</h1>
              <div className="text-2xl font-normal text-gray-400">
                {formattedDate}, {itinerary.city}
              </div>
              <div className="flex flex-col gap-5">
                <div className="mr-5 mt-6 flex flex-col gap-3 border-b-2 pb-4">
                  <h2 className="text-4xl font-semibold">Events</h2>
                  {itinerary.events.map((event, index) => (
                    <div
                      key={index}
                      className="mb-2 flex flex-col gap-3 rounded-xl border-2 p-6"
                    >
                      <div className="flex items-end justify-between gap-5 text-2xl font-semibold">
                        <div className="flex gap-2">
                          <div className="text-black">{event.event}</div>
                          <div className=" flex items-center text-base text-gray-500">
                            <MdLocationPin />
                            {event.locationEvent}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-2xl font-semibold text-gray-500">
                            Price:{' '}
                          </div>
                          <div className="text-2xl"> ${event.priceEvent}</div>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex gap-2 text-lg">
                          <div className="font-semibold">Activity:</div>
                          {event.typeOfActivity}{' '}
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between border-t-2 pt-2">
                        {' '}
                        <div className="flex items-end gap-2">
                          <CiClock1 size={25} />
                          <div className="text-xl font-semibold text-gray-500">
                            Time:
                          </div>
                          <div className="text-xl font-semibold text-gray-400">
                            {event.time}
                          </div>
                        </div>
                        <Stars rating={event.rating} />
                      </div>

                      {/* Displaying placeholder for eventID */}
                    </div>
                  ))}
                </div>
                <div className="mr-5 mt-6 flex flex-col gap-3 border-b-2 pb-4">
                  <h2 className="text-4xl font-semibold">Restaurants</h2>
                  {itinerary.restaurants.map((restaurant, index) => (
                    <div
                      key={index}
                      className="mb-2 flex flex-col gap-3 rounded-xl border-2 p-6"
                    >
                      <div className="flex items-end justify-between gap-5 text-2xl font-semibold">
                        <div className="flex gap-2">
                          <div className="text-black">
                            {restaurant.restaurant}
                          </div>
                          <div className=" flex items-center text-base text-gray-500">
                            <MdLocationPin />
                            {restaurant.locationRestaurant}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-2xl font-semibold text-gray-500">
                            Price:{' '}
                          </div>
                          <div className="text-2xl">
                            {' '}
                            ${restaurant.priceRestaurant}
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex">
                          <div className="flex gap-2 text-lg">
                            <div className="font-semibold">Cuisine:</div>
                            {restaurant.cuisine}{' '}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between border-t-2 pt-2">
                        {' '}
                        <div className="flex items-end  gap-2">
                          <CiClock1 size={25} />
                          <div className="text-xl font-semibold text-gray-500">
                            Time:
                          </div>
                          <div className="text-xl font-semibold text-gray-400">
                            {restaurant.time}
                          </div>
                        </div>
                        <Stars rating={restaurant.rating} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mr-5 mt-6 flex flex-col gap-3 border-b-2 pb-4">
                  <h2 className="text-4xl font-semibold">Hotel</h2>
                  <div className="mb-2 flex flex-col gap-3 rounded-xl border-2 p-6">
                    <div className="flex items-end justify-between gap-5 text-2xl font-semibold">
                      <div className="flex gap-2">
                        <div className="text-black">
                          {itinerary.hotel.hotel}
                        </div>
                        <div className=" flex items-center text-base text-gray-500">
                          <MdLocationPin />
                          {itinerary.hotel.locationHotel}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="text-2xl font-semibold text-gray-500">
                          Price:{' '}
                        </div>
                        <div className="text-2xl">
                          {' '}
                          ${itinerary.hotel.priceHotel}
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex items-center gap-2 text-lg">
                        <div className="font-semibold">Booking:</div>
                        <a
                          href={itinerary.hotel.bookingURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 transition-colors duration-200 ease-in-out hover:text-blue-800"
                        >
                          <MdOutlineHotel className="text-xl" />
                          Book Hotel Here
                        </a>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between border-t-2 pt-2">
                      {' '}
                      <div className="flex items-end  gap-2">
                        <CiClock1 size={25} />
                        <div className="text-xl font-semibold text-gray-500">
                          Time:
                        </div>
                        <div className="text-xl font-semibold text-gray-400">
                          {itinerary.hotel.time}
                        </div>
                      </div>
                      <Stars rating={itinerary.hotel.rating} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grow ">
              {/* Sticky card */}
              <div className="sticky top-32 flex  grow flex-col justify-between rounded-xl border-2 p-7 shadow-xl">
                <div className="text-2xl font-bold">Quick Overview</div>
                <div className="mt-6 flex flex-col gap-2">
                  <div className="text-semibold text-xl text-gray-400">
                    Date
                  </div>
                  <div className="flex gap-3 rounded-xl border-2 px-5 py-2">
                    <CiCalendar size={25} />
                    <div className="text-xl font-semibold text-black">
                      {' '}
                      {formattedDate}
                    </div>
                  </div>
                </div>
                <div className="mb-2 mt-5 flex flex-col gap-2 border-b-2 border-t-2 pb-4 pt-4">
                  <div className="text-2xl font-semibold text-black">
                    Quantities
                  </div>
                  <div className="flex justify-between text-xl text-black">
                    <div className="font-normal">Restaurants:</div>
                    {itinerary.restaurants.length}
                  </div>
                  <div className="flex justify-between text-xl text-black">
                    <div className="font-normal"> Events:</div>
                    {itinerary.events.length}
                  </div>
                  <div className="flex justify-between text-xl text-black">
                    {' '}
                    <div className="font-normal">Hotels:</div> 1
                  </div>
                </div>

                <button
                  className="mt-3 flex justify-center rounded-xl bg-amber-500 py-2 text-2xl font-semibold text-white"
                  onClick={saveItinerary}
                >
                  Save Itinerary
                </button>
                <div className=" mt-6 flex items-end justify-between">
                  <div className="text-xl  text-gray-600">Total</div>
                  <div className="text-3xl font-semibold">
                    {' '}
                    ${itinerary.totalPrice}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
