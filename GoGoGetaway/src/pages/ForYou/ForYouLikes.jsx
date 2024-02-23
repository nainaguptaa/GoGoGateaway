import React, { useState } from 'react';
import {
  FaRegHeart,
  FaHeart,
  FaShare,
  FaRegCommentAlt,
  FaCommentAlt,
} from 'react-icons/fa';
import axios from 'axios'; // Make sure to install axios with npm or yarn
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';
export default function ForYouLikes({ isMobile, itinerariesProp, index }) {
  const [itineraries, setItineraries] = useState(
    itinerariesProp.map((itinerary) => ({
      ...itinerary,
      liked: false, // Initialize all itineraries as not liked
    })),
  );

  const [liked, setLiked] = useState(false);
  const handleLikeButton = async (itineraryId, index) => {
    const itinerary = itineraries[index];
    const newLikedState = !itinerary.liked; // Toggle the liked state
    const likeChange = newLikedState ? 1 : -1; // Increment if liking, decrement if unliking

    // Optimistically update the UI
    const newItineraries = [...itineraries];
    newItineraries[index] = {
      ...itinerary,
      likeCount: itinerary.likeCount + likeChange,
      liked: newLikedState,
    };
    setItineraries(newItineraries);

    try {
      // Send the request to the server to increment or decrement the like count
      const endpoint = newLikedState
        ? `http://localhost:8080/itineraries/increment-like/${itineraryId}`
        : `http://localhost:8080/itineraries/decrement-like/${itineraryId}`; // Assume you have a decrement-like endpoint
      await axios.post(endpoint);
    } catch (error) {
      console.error('Error updating like count:', error);
      // Optionally, revert the optimistic update here
    }
  };

  return (
    <div className="h-70 absolute bottom-40 right-6 z-10 mb-12 flex flex-col gap-6 rounded-xl  bg-white/60 px-2 py-4 text-sm sm:mb-8 sm:ml-4 sm:text-lg lg:static lg:right-16 lg:bg-transparent">
      <div className="flex flex-col items-center gap-2">
        {itineraries[index].liked ? (
          <FaHeart
            size={30}
            className="ease cursor-pointer text-rose-500 transition duration-200 hover:text-rose-500"
            onClick={() => handleLikeButton(itineraries[index].id, index)}
          />
        ) : (
          <FaRegHeart
            size={30}
            className="ease cursor-pointer text-rose-500 transition duration-200 hover:text-rose-500"
            onClick={() => handleLikeButton(itineraries[index].id, index)}
          />
        )}

        <div className=" font-bold">{itineraries[index].likeCount}</div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FaRegCommentAlt size={30} />

        <div className=" font-bold">{itineraries[index].commentCount}</div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FaRegBookmark size={30} />
        {/* <div className="text-lg font-bold">
          {itinerariesDummy[index].likes}
        </div> */}
      </div>
      <div className="flex flex-col items-center gap-2">
        <FaShare size={30} />
        <div className=" font-bold">Share</div>
      </div>
    </div>
  );
}
