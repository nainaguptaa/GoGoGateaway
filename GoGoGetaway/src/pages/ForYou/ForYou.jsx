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
import ForYouLikes from './ForYouLikes';
const ForYou = ({ isMobile }) => {
  const [itineraries, setItineraries] = useState([]);
  const navigate = useNavigate();
  const [displayedPosts, setDisplayedPosts] = useState([]);
  // State to track the current page
  const [page, setPage] = useState(1);
  // Number of posts to display per "page"
  const postsPerPage = 5;
  // Simulate fetching data from Firebase
  // useEffect(() => {
  //   // Set itineraries from itinerariesDummy
  //   setItineraries(dumdum);
  //   // Load initial posts
  //   setDisplayedPosts(dumdum.slice(0, postsPerPage));
  // }, []);

  // Define the function to fetch itineraries
  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await fetch('http://localhost:8080/itineraries/all'); // Adjust the URL as needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        console.log(data);
        setItineraries(data);
        setDisplayedPosts(data.slice(0, postsPerPage));
      } catch (error) {
        console.error('Failed to fetch itineraries:', error);
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

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    // Check if we've scrolled to the bottom of the content
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      // 5px threshold to trigger before exactly reaching the bottom
      // Calculate the next page and update the state if there are more posts to show
      const nextPage = page + 1;
      const nextPosts = itinerariesDummy.slice(0, nextPage * postsPerPage);

      if (nextPosts.length > displayedPosts.length) {
        setDisplayedPosts(nextPosts);
        setPage(nextPage);
      }
    }
  };
  const calculateDaysAgo = (postedDate) => {
    const posted = new Date(postedDate);
    const now = new Date();
    const difference = now - posted; // Difference in milliseconds
    const daysAgo = Math.floor(difference / (1000 * 60 * 60 * 24));
    return daysAgo;
  };

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
  // console.log(itineraries);
  // console.log(itinerariesDummy);
  // console.log(dumdum);
  const Row = ({ index, style }) => (
    <div style={style} className="mx:px-20 px-4 lg:px-14 lg:pt-8 ">
      <div className="flex h-full  items-end md:h-[48rem] md:items-center md:justify-center">
        <div
          className="flex cursor-pointer flex-col gap-2 overflow-hidden sm:h-[47rem] md:h-[46rem] md:w-[55rem] lg:w-[65rem] lg:rounded-2xl  lg:border-2 lg:bg-card lg:dark:bg-card 2xl:w-[75rem]"
          onClick={() => navigate(`/itineraries?id=${itineraries[index].id}`)}
        >
          {/* <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"> */}
          {/* {itinerariesDummy[index].images.map((image, imgIndex) => (
              <img
                key={imgIndex}
                src={image}
                alt={`Image ${imgIndex}`}
                className="h-32 w-full object-cover md:h-48 lg:h-64" // Adjust height as needed
              />
            ))} */}
          <img
            src={itineraries[index].hotel.imageURL}
            // alt={`Slide ${imgIndex}`}
            loading="lazy"
            className="z-10 h-[39rem]  object-cover md:h-[38rem] lg:h-[38rem] 2xl:max-h-[38rem]"
          />
          <div className="flex justify-between px-4 pb-3">
            <div className="flex flex-col">
              {' '}
              <div className="text-3xl font-bold">
                {itineraries[index].name}
              </div>
              <div className="text-xl font-semibold">
                {itineraries[index].city}
              </div>
            </div>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('en-CA', {
                style: 'currency',
                currency: 'CAD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(itineraries[index].totalPrice)}{' '}
              Total
            </div>
          </div>
          {/* </div> */}
        </div>
        <ForYouLikes
          isMobile={isMobile}
          itinerariesProp={itineraries}
          index={index}
        />
      </div>
    </div>
  );

  // if (isMobile) {
  //   return <>sdf</>;
  // }
  // console.log(isMobile);
  return (
    <div className="flex h-screen">
      {!isMobile && <ForYouLeft />}
      <div className="flex flex-grow gap-2 overflow-hidden  lg:ml-[14rem] xl:ml-64">
        <List
          className="flex lg:gap-12 2xl:gap-24 "
          height={window.innerHeight} // Adjust based on your layout
          itemCount={itineraries.length}
          itemSize={itemSize} // Dynamically adjusted
          width={'100%'} // Adjust as necessary
        >
          {/* <div className="flex flex-colgap-2"></div> */}
          {Row}
        </List>
      </div>
    </div>
  );
};

export default ForYou;
