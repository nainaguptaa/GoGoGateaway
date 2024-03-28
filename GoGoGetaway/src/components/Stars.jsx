import React from 'react';
import { IoIosStar } from 'react-icons/io';
import { IoStarHalfOutline } from 'react-icons/io5';
import { IoIosStarOutline } from 'react-icons/io';
const Stars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  const starStyle = { color: '#FFD700' };
  return (
    <>
      <div className="flex items-center gap-2 ">
        {' '}
        <div className="flex">
          {[...Array(fullStars)].map((_, index) => (
            <IoIosStar size={20} key={index} style={starStyle} />
          ))}
          {halfStar === 1 && <IoStarHalfOutline style={starStyle} size={20} />}
          {[...Array(emptyStars)].map((_, index) => (
            <IoIosStarOutline key={index} size={20} style={starStyle} />
          ))}
        </div>
        <div className="mr-2 text-black">{rating}</div>{' '}
      </div>
    </>
  );
};

export default Stars;
