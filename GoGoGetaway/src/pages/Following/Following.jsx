import React, { useState, useEffect } from 'react';
import ForYouLeft from '../ForYou/ForYouLeft';
import ItineraryList from '@/components/ItineraryList/ItineraryList';
import { useUserContext } from '@/context/userContext';
import axios from 'axios';
import itinerariesDummy from '../../dummyData/dummyItinerary.json';
import { useNavigate } from 'react-router-dom';
export default function Following({ isMobile, iconSize }) {
  const navigate = useNavigate();
  const { currentUser } = useUserContext();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const postsPerPage = 5;
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const getItemSize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1536) {
      // for very large screens, e.g., 2k displays
      return 950; // or any size suitable for large screens
    } else if (screenWidth >= 1280) {
      // for desktops
      return 800; // or any size suitable for medium screens
    } else if (screenWidth >= 1024) {
      return 850;
    } else if (screenWidth >= 768) {
      return 800;
    } else {
      // for tablets and mobiles
      return 780; // or any size suitable for small screens
    }
  };
  const [itemSize, setItemSize] = useState(getItemSize());

  // Adjust the itemSize on window resize
  useEffect(() => {
    const handleResize = () => {
      setItemSize(getItemSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const apiURL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchItineraries = async () => {
      const userId = currentUser.id;
      try {
        //
        const response = await axios.get(
          `${apiURL}/itineraries/followed-itineraries/${userId}`,
        );

        const data = response.data;
        console.log(data);
        setItineraries(data);
        setDisplayedPosts(data.slice(0, postsPerPage));
      } catch (error) {
        console.error('Failed to fetch itineraries:', error);
        // setItineraries(itinerariesDummy);
      }
    };
    fetchItineraries();
  }, [postsPerPage]);
  return (
    <div className={itineraries.length == 0 && 'overflow-hidden'}>
      {!isMobile && <ForYouLeft />}
      {itineraries.length == 0 ? (
        <div className="ml-[16rem] flex h-screen w-full flex-col items-center justify-center">
          <h2 className="mb-4 text-lg font-semibold">No Itineraries to Show</h2>
          <p className="text-md mb-3 text-gray-600">
            It looks like you're not following any itineraries yet.
          </p>
          <p className="text-md mb-6 text-gray-600">
            Start exploring and follow itineraries to see them appear here.
          </p>
          <button
            onClick={() => navigate('/foryou')}
            className="rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
          >
            Discover Itineraries
          </button>
        </div>
      ) : (
        <ItineraryList
          itineraries={itineraries}
          isMobile={isMobile}
          iconSize={iconSize}
          itemSize={itemSize}
        />
      )}
    </div>
  );
}
