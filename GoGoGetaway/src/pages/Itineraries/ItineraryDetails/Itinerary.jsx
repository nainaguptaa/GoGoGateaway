import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

import ItineraryComments from '../ItineraryComments';
import Stars from '@/components/Stars';
import { CiCalendar } from 'react-icons/ci';
import { MdLocationPin } from 'react-icons/md';
import { MdOutlineHotel } from 'react-icons/md';
// import itinerary from '../../dummyData/dumdum.json';
import itinerariesDummy from '../../../dummyData/dummyItinerary.json';
import { useUserContext } from '@/context/userContext';
import { CiClock1 } from 'react-icons/ci';
import axios from 'axios';
import ItineraryStickyCard from './ItineraryCard';
import ItineraryCardMobile from './ItineraryCardMobile';
import ItineraryCarousel from './ItineraryCarousel';
import { useNavigate } from 'react-router-dom';
export default function Itinerary({ iconSize }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser, setSignPopup } = useUserContext();
  const location = useLocation();
  const [itinerary, setItinerary] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [events, setEvents] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [itineraryId, setItineraryId] = useState('');
  const apiURL = import.meta.env.VITE_API_URL;
  // Function to toggle comments visibility
  const toggleComments = () => {
    setShowComments(!showComments);
  };
  // console.log(itinerary);
  useEffect(() => {
    const fetchItinerary = async () => {
      const queryParams = new URLSearchParams(location.search);

      const id = queryParams.get('id');
      setItineraryId(id);

      try {
        // Update the URL to point to your backend API endpoint
        const response = await axios.get(`${apiURL}/itineraries/${id}`);
        setItinerary(response.data);
      } catch (error) {
        // setItinerary(itinerariesDummy)
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
    if (!currentUser) {
      setSignPopup(true);
      return;
    }
    try {
      // Replace 'userId' with the actual logged-in user's ID
      const userId = currentUser.id;
      console.log('saving', currentUser.id);
      console.log(itineraryId);
      // Replace 'YOUR_BACKEND_ENDPOINT' with the actual backend endpoint URL
      const response = await axios.post(
        `${apiURL}/users/${userId}/save-itinerary`,
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
    setTimeout(() => {
      navigate(`/user/${currentUser.username}`); // Replace '/your-destination-route' with your actual route
    }, 1000);
  };
  return (
    <>
      <div className="lg:flex lg:flex-col lg:px-40 lg:py-8">
        <div className="hidden text-4xl font-semibold lg:block">
          {itinerary.name}
        </div>

        <ItineraryCarousel itinerary={itinerary} />

        <div className="px-2 py-4">
          <div className="flex ">
            <div className="flex w-full flex-col lg:w-2/3 ">
              <h1 className="hidden text-3xl font-semibold lg:block">
                Itinerary Details
              </h1>
              <div className="block max-w-[15rem]  text-2xl font-medium lg:hidden">
                {itinerary.name}
              </div>
              <div className="max-w-[15rem]  text-xl font-normal">
                {itinerary.city}
              </div>
              <div className=" max-w-[15rem] text-xl font-normal text-gray-400">
                {formattedDate}
              </div>
              <div className="mb-20 flex flex-col gap-5  lg:pr-4">
                <div className="mr-5 mt-6 flex w-full flex-col gap-3 border-b-2 pb-4">
                  <h2 className="text-3xl font-semibold lg:text-4xl">Events</h2>
                  {itinerary.events.map((event, index) => (
                    <div
                      key={index}
                      className="mb-2 flex flex-col gap-3 rounded-xl border-2 p-3 lg:p-6"
                    >
                      <div className="gap:2 flex max-w-[15rem] flex-col justify-between   lg:flex-row lg:items-end lg:gap-5">
                        <div className="flex flex-col gap-0.5 lg:flex-row lg:gap-2 ">
                          <div className="text-xl font-medium lg:text-2xl lg:font-semibold">
                            {event.event}
                          </div>
                          <div className=" flex items-center gap-2 text-base text-gray-500">
                            <div className="shrink-0">
                              {' '}
                              <MdLocationPin />
                            </div>
                            {event.locationEvent}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex">
                        <div className="flex gap-2 text-lg">
                          <div className="font-semibold">Activity:</div>
                          {event.typeOfActivity}{' '}
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end gap-2">
                        <div className="text-lg font-semibold text-gray-500 lg:text-2xl">
                          Price:{' '}
                        </div>
                        <div className="text-lg lg:text-2xl">
                          {' '}
                          ${event.priceEvent}
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between border-t-2 pt-2 lg:flex-row">
                        {' '}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center  gap-1">
                            {' '}
                            <CiClock1 size={iconSize} />
                            <div className="text-lg font-semibold text-gray-500">
                              Time:
                            </div>
                          </div>

                          <div className="text-lg font-semibold text-gray-400">
                            {event.time}
                          </div>
                        </div>
                        <Stars rating={event.rating} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mr-5 mt-6 flex w-full flex-col gap-3 border-b-2 pb-4">
                  <h2 className="text-4xl font-semibold">Restaurants</h2>
                  {itinerary.restaurants.map((restaurant, index) => (
                    <div
                      key={index}
                      className="mb-2 flex flex-col gap-3 rounded-xl border-2 p-3 lg:p-6"
                    >
                      <div className="gap:2 flex max-w-[10rem] flex-col justify-between bg-red-100 lg:flex-row lg:items-end lg:gap-5">
                        <div className="flex  flex-col gap-0.5 lg:flex-row lg:gap-2">
                          <div className="text-xl font-medium lg:text-2xl lg:font-semibold">
                            {restaurant.restaurant}
                          </div>
                          <div className=" flex  items-center gap-2  text-base text-gray-500">
                            <div className="shrink-0">
                              {' '}
                              <MdLocationPin />
                            </div>

                            {restaurant.locationRestaurant}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex">
                        <div className="flex">
                          <div className="flex gap-2 text-lg">
                            <div className="font-semibold">Cuisine:</div>
                            {restaurant.cuisine}{' '}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end gap-2">
                        <div className="text-lg font-semibold text-gray-500 lg:text-2xl">
                          Price:{' '}
                        </div>
                        <div className="text-lg lg:text-2xl">
                          {' '}
                          ${restaurant.priceRestaurant}
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between border-t-2 pt-2 lg:flex-row">
                        {' '}
                        <div className="flex items-center  gap-2">
                          <div className="gap-1s flex  items-center">
                            {' '}
                            <CiClock1 size={iconSize} />
                            <div className="text-lg font-semibold text-gray-500">
                              Time:
                            </div>
                          </div>

                          <div className="text-lg font-semibold text-gray-400">
                            {restaurant.time}
                          </div>
                        </div>
                        <Stars rating={restaurant.rating} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mr-5 mt-6 flex w-full flex-col gap-3 border-b-2  pb-4">
                  <h2 className="text-4xl font-semibold">Hotel</h2>
                  <div className="mb-2 flex flex-col gap-3 rounded-xl border-2 p-3 lg:p-6">
                    <div className="gap:2  flex max-w-[15rem] flex-col justify-between   lg:flex-row lg:items-end lg:gap-5">
                      <div className="flex flex-col gap-0.5 lg:flex-row lg:gap-2 ">
                        <div className="text-xl font-medium lg:text-2xl lg:font-semibold">
                          {itinerary.hotel.hotel}
                        </div>
                        <div className=" flex items-center gap-2 text-base text-gray-500">
                          <div className="shrink-0">
                            {' '}
                            <MdLocationPin />
                          </div>
                          {itinerary.hotel.locationHotel}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex max-w-[15rem] bg-red-200">
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
                    <div className="mt-3 flex justify-end gap-2">
                      <div className="text-lg font-semibold text-gray-500 lg:text-2xl">
                        Price:{' '}
                      </div>
                      <div className="text-lg lg:text-2xl">
                        {' '}
                        ${itinerary.hotel.priceHotel}
                      </div>
                    </div>
                    <div className="mt-2 flex  justify-between border-t-2 pt-2  lg:flex-row">
                      {' '}
                      <div className="flex items-center  gap-2">
                        <div className="flex items-center gap-1 ">
                          {' '}
                          <CiClock1 size={iconSize} />
                          <div className="text-lg font-semibold text-gray-500">
                            Time:
                          </div>
                        </div>

                        <div className="text-lg font-semibold text-gray-400">
                          {itinerary.hotel.time}
                        </div>
                      </div>
                      <Stars rating={itinerary.hotel.rating} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block lg:grow">
              <ItineraryStickyCard
                formattedDate={formattedDate}
                itinerary={itinerary}
                saveItinerary={saveItinerary}
              />
            </div>
          </div>
        </div>
        <ItineraryCardMobile
          formattedDate={formattedDate}
          itinerary={itinerary}
          saveItinerary={saveItinerary}
        />
      </div>
    </>
  );
}
