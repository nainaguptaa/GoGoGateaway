import Navbar from '@/components/Navbar';
import React, { useState, useEffect, useRef } from 'react';
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
const ForYou = () => {
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

  const Row = ({ index, style }) => (
    <div style={style} className=" px-20 pt-12">
      <div className="flex w-[65rem] items-end">
        <div
          className=" dark:bg-card bg-card flex cursor-pointer flex-col gap-2 overflow-hidden rounded-2xl border-2"
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
            className="z-10 max-h-[32rem] w-[55rem] max-w-[60rem] object-cover"
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
        <div className="mb-8 ml-4 flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <FaHeart
              size={30}
              className="ease cursor-pointer text-rose-500 transition duration-200 hover:text-rose-500"
            />
            <div className="text-lg font-bold">
              {itinerariesDummy[index].likes}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaRegCommentAlt size={30} />
            <div className="text-lg font-bold">
              {itinerariesDummy[index].comments}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaRegBookmark size={30} />
            {/* <div className="text-lg font-bold">
                {itinerariesDummy[index].likes}
              </div> */}
          </div>
          <div className="flex flex-col items-center gap-2">
            <PiShareFat size={30} />
            <div className="text-lg font-bold">Share</div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="flex h-screen">
      <ForYouLeft />
      <div className="ml-64 flex flex-grow gap-2 overflow-hidden">
        <List
          className="flex gap-2"
          height={window.innerHeight} // Adjust based on your layout
          itemCount={itinerariesDummy.length}
          itemSize={750} // Adjust based on the average height of your posts
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
