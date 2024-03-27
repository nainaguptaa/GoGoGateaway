import Navbar from '@/components/Navbar';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import ForYouLeft from './ForYouLeft';

import itinerariesDummy from '../../dummyData/dummyItinerary.json';
import dumdum from '../../dummyData/dumdum.json';
import { useNavigate } from 'react-router-dom';
const ROW_HEIGHT = 100;

import { FixedSizeList as List } from 'react-window';
import {
  FaRegHeart,
  FaHeart,
  FaShare,
  FaRegCommentAlt,
  FaCommentAlt,
} from 'react-icons/fa';

import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';
const BUFFER = 5;
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { PiShareFat } from 'react-icons/pi';
import ForYouLikes from '../../components/ItineraryList/ForYouLikes';
import ItineraryList from '@/components/ItineraryList/ItineraryList';
const ForYou = ({ isMobile, iconSize }) => {
  const [itineraries, setItineraries] = useState([]);
  const navigate = useNavigate();
  const [displayedPosts, setDisplayedPosts] = useState([]);
  // State to track the current page
  const [page, setPage] = useState(1);
  // Number of posts to display per "page"
  const postsPerPage = 5;
  // Define the function to fetch itineraries
  const apiURL =
    import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL_DEPLOY;
  console.log('using, ', apiURL);
  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await fetch(`${apiURL}/itineraries/all`); // Adjust the URL as needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        setItineraries(data);
        setDisplayedPosts(data.slice(0, postsPerPage));
      } catch (error) {
        console.error('Failed to fetch itineraries:', error);
        setItineraries(itinerariesDummy);
      }
    };
    fetchItineraries();
  }, [postsPerPage]);

  useEffect(() => {
    const handleResize = () => {
      setItemSize(getItemSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
  return (
    <div className="flex h-screen">
      {!isMobile && <ForYouLeft />}
      <ItineraryList
        itineraries={itineraries}
        isMobile={isMobile}
        iconSize={iconSize}
        itemSize={itemSize}
      />
    </div>
  );
};

export default ForYou;
