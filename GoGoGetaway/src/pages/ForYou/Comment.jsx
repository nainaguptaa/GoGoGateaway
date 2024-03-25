import React, { useState, useEffect } from "react";
import { CgProfile } from 'react-icons/cg';
import {
  FaRegHeart,
  FaHeart,
} from 'react-icons/fa';
const Comment = ({ comment }) => {

  const [userData, setUserData] = useState(null);
  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
  };

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Perform a fetch operation to get user data based on comment.userId
        const response = await fetch(`http://localhost:3000/users/${comment.userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();

        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Call the fetchUserData function when the component mounts
    fetchUserData();

    // Cleanup function (optional)
    return () => {
      // Perform any cleanup, such as aborting the fetch operation
    };
  }, [comment.userId]); // Dependency array ensures that fetchUserData is called when comment.userId changes

  const timeAgo = (firebaseTimestamp) => {
    const milliseconds = new Date() - firebaseTimestamp._seconds * 1000;
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return `${seconds}s ago`;
    }
  };

  const handleLikeButton = async (commentID) => {
    // Implement like functionality
    console.log("Like button clicked for itinerary ID:", commentID);
    setLiked(!liked);


    // add the comment to the comments array
    try {
      if (!liked) {
        //Increment like count
        comment.likeCount++;
        // Send the comment to the server
        const response = await fetch(`http://localhost:8080/itineraries/comments/${commentID}/like/increment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to like comment');
        }
      }
      else {
        //Decrement like count
        comment.likeCount--;

        // Send the comment to the server
        const response = await fetch(`http://localhost:8080/itineraries/comments/${commentID}/like/decrement`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to unlike comment');
        }
      }

    } catch (error) {
      console.error('Error liking comment:', error);
      // Handle error appropriately, such as displaying an error message
    }
  }

  return (

    <div className="flex flex-col gap-2">
      <div className="flex w-full justify-between items-start">
        <div className="flex flex-1 gap-2">
          {!imageError ?
            <img
              src={userData?.photoURL}
              onError={handleImageError}
              alt="Profile"
              className="w-12 rounded-full"
            />
            :
            <CgProfile className="h-10 w-10" />
          }
          <div className="flex gap-2">
            <h1 className="font-bold">
              {userData && userData.username}
            </h1>
            <p className="break-words">
              {comment.text}
            </p>
          </div>
        </div>
        {liked ? (
          <FaHeart
            className="ease cursor-pointer text-rose-500 transition duration-200 hover:text-rose-500"
            onClick={() => handleLikeButton(comment.id)}
          />
        ) : (
          <FaRegHeart
            className="ease cursor-pointer  transition duration-200 hover:text-rose-500"
            onClick={() => handleLikeButton(comment.id)}
          />
        )}
      </div>
      <div className="flex gap-2 text-xs text-gray-400 px-2">
        <p>
          {timeAgo(comment.timestamp)}
        </p>
        <p>
          {comment?.likeCount} likes
        </p>
      </div>
    </div>

  );
};

export default Comment;
