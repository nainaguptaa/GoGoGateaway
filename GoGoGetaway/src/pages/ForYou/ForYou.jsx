import Navbar from '@/components/Navbar';
import React, { useState, useEffect, useRef } from 'react';
import ForYouLeft from './ForYouLeft';
import itinerariesDummy from '../../dummyData/dummyItinerary.json';
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
      <div className="dark:bg-card bg-card flex w-[65rem] flex-col rounded-[5rem] border-2 border-orange-300 px-6 pb-20 pt-12 shadow-lg dark:border-amber-500">
        <div className="mb-2 flex items-center gap-3 ">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 bg-blue-200 text-lg font-semibold text-white dark:border-cyan-500">
            s
          </div>
          <div className="flex flex-col">
            <div className="text-4xl font-semibold">
              {itinerariesDummy[index].title}
            </div>
            <div className="flex items-center gap-4">
              <div className="font-lg text-xl">
                {itinerariesDummy[index].user}
              </div>
              <div className="text-md font-lg items-center text-gray-500">
                {`${calculateDaysAgo(itinerariesDummy[index].posted)} days ago`}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-end gap-3">
          <img
            src={itinerariesDummy[index].images[0]}
            // alt={`Slide ${imgIndex}`}
            className="z-10 max-h-[32rem] w-[55rem] max-w-[60rem] object-cover"
          />
          <div className="ml-4 flex flex-col gap-6">
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
            {/* <div className="flex flex-col items-center gap-2">
              <FaRegBookmark size={30} />
              <div className="text-lg font-bold">
                {itinerariesDummy[index].likes}
              </div>
            </div> */}
            <div className="flex flex-col items-center gap-2">
              <PiShareFat size={30} />
              <div className="text-lg font-bold">Share</div>
            </div>
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
