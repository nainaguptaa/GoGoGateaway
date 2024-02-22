import Navbar from '@/components/Navbar';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import ForYouLeft from './ForYouLeft';

import itinerariesDummy from '../../dummyData/dummyItinerary.json';
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
const ForYou = ({ isMobile }) => {
  const navigate = useNavigate();
  const [displayedPosts, setDisplayedPosts] = useState([]);
  // State to track the current page
  const [page, setPage] = useState(1);
  // Number of posts to display per "page"
  const postsPerPage = 5;

  useEffect(() => {
    // Load initial posts
    setDisplayedPosts(itinerariesDummy.slice(0, postsPerPage));
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

  const Row = ({ index, style }) => (
    <div style={style} className="mx:px-20 px-4 lg:px-14 lg:pt-8 ">
      <div className="flex h-full  items-end md:h-[48rem] md:items-center md:justify-center">
        <div
          className="lg:dark:bg-card lg:bg-card flex cursor-pointer flex-col gap-2 overflow-hidden sm:h-[47rem] md:h-[46rem] md:w-[55rem]  lg:w-[65rem] lg:rounded-2xl lg:border-2 2xl:w-[75rem]"
          onClick={() =>
            navigate(`/itineraries?id=${itinerariesDummy[index].id}`)
          }
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
            src={itinerariesDummy[index].images[0]}
            // alt={`Slide ${imgIndex}`}
            loading="lazy"
            className="z-10 h-[39rem]  object-cover md:h-[38rem] lg:h-[38rem] 2xl:max-h-[38rem]"
          />
          <div className="flex justify-between px-4 pb-3">
            <div className="flex flex-col">
              {' '}
              <div className="text-3xl font-bold">
                {itinerariesDummy[index].title}
              </div>
              <div className="text-xl font-semibold">
                {itinerariesDummy[index].location}
              </div>
              <div className="mt-2 text-xl font-semibold text-gray-400">
                {itinerariesDummy[index].tripLength} days
              </div>
            </div>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('en-CA', {
                style: 'currency',
                currency: 'CAD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(itinerariesDummy[index].price)}{' '}
              Total
            </div>
          </div>
          {/* </div> */}
        </div>
        <div className="h-70 absolute bottom-40 right-6 z-10 mb-12 flex flex-col gap-6 rounded-xl bg-transparent px-2 py-4 text-sm sm:mb-8 sm:ml-4 sm:bg-transparent sm:text-lg lg:static lg:right-16">
          <div className="flex flex-col items-center gap-2">
            <FaHeart
              size={30}
              className="ease  cursor-pointer text-rose-500 transition duration-200 hover:text-rose-500"
            />
            <div className=" font-bold">{itinerariesDummy[index].likes}</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaCommentAlt size={30} />
            <div className=" font-bold">{itinerariesDummy[index].comments}</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaBookmark size={30} />
            {/* <div className="text-lg font-bold">
                {itinerariesDummy[index].likes}
              </div> */}
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaShare size={30} />
            <div className=" font-bold">Share</div>
          </div>
        </div>
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
          itemCount={itinerariesDummy.length}
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
