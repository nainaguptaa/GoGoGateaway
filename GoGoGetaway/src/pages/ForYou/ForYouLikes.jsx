import React from 'react';
import {
  FaRegHeart,
  FaHeart,
  FaShare,
  FaRegCommentAlt,
  FaCommentAlt,
} from 'react-icons/fa';

import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';
export default function ForYouLikes({ isMobile, itinerariesDummy, index }) {
  return (
    <div className="h-70 absolute bottom-40 right-6 z-10 mb-12 flex flex-col gap-6 rounded-xl  bg-white/60 px-2 py-4 text-sm sm:mb-8 sm:ml-4 sm:text-lg lg:static lg:right-16 lg:bg-transparent">
      <div className="flex flex-col items-center gap-2">
        <FaRegHeart
          size={30}
          className="ease  cursor-pointer text-rose-500 transition duration-200 hover:text-rose-500"
          onClick={() => console.log(itinerariesDummy[index])}
        />

        <div className=" font-bold">{itinerariesDummy[index].likes}</div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FaRegCommentAlt size={30} />

        <div className=" font-bold">{itinerariesDummy[index].comments}</div>
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
