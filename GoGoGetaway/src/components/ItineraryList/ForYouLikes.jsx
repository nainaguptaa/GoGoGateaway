import React, { useEffect, useState } from 'react';
import {
  FaRegHeart,
  FaHeart,
  FaShare,
  FaRegCommentAlt,
  FaCommentAlt,
  FaTimes,
} from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import { IoMdCheckmark } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import axios from 'axios'; // Make sure to install axios with npm or yarn
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';
import { Input } from '@/components/ui/input';
import { set } from 'date-fns';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/userContext';
import Comment from '../../pages/ForYou/Comment';
import { Link, useNavigate } from 'react-router-dom';
const apiURL = import.meta.env.VITE_API_URL;
export default function ForYouLikes({
  isMobile,
  itinerariesProp,
  index,
  iconSize,
}) {
  const [itineraries, setItineraries] = useState(
    itinerariesProp.map((itinerary) => ({
      ...itinerary,
      liked: false, // Initialize all itineraries as not liked
      favourites: false, //
    })),
  );

  const [liked, setLiked] = useState(itineraries[index].isLiked);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(false);
  const [savedItineraries, setSavedItineraries] = useState([]);
  const { currentUser, updateCurrentUser } = useUserContext();
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.following) {
      setFollowing(
        currentUser.following.some(
          (user) => user.userId === itineraries[index].userId,
        ),
      );
    }
  }, [currentUser, itineraries, index]);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const handleLikeButton = async (itineraryId, index) => {
    const itinerary = itineraries[index];
    console.log(itineraryId);
    setLiked((prev) => !prev);
    const newLikedState = !liked; // Toggle the liked state

    // We only proceed with the request if the like state changes
    // if (liked !== newLikedState) {
    const likeChange = newLikedState ? 1 : -1; // Increment if liking, decrement if unliking
    const userId = currentUser.id;
    // Optimistically update the UI
    const newItineraries = [...itineraries];
    newItineraries[index] = {
      ...itinerary,
      likeCount: itinerary.likeCount + likeChange,
      liked: newLikedState,
    };
    setItineraries(newItineraries);

    try {
      // Determine the correct endpoint based on the new liked state
      const endpoint = newLikedState
        ? `${apiURL}/itineraries/increment-like/${itineraryId}`
        : `${apiURL}/itineraries/decrement-like/${itineraryId}`;
      await axios.post(endpoint);

      // Optionally, manage adding/removing from liked items if needed
      // This is just an example and might need to be adapted based on your backend logic
      const likedEndpointAction = newLikedState
        ? 'add-to-liked'
        : 'remove-from-liked';
      const likedEndpoint = `${apiURL}/users/${userId}/${likedEndpointAction}`;
      await axios.post(likedEndpoint, {
        itineraryId: itineraryId,
      });
    } catch (error) {
      console.error('Error updating like count:', error);
      // Optionally, revert the optimistic update here
    }
    // }
  };

  useEffect(() => {
    // Assuming currentUser.savedItineraries is an array of saved itinerary IDs
    const savedItineraryIds = new Set(currentUser.savedItineraries || []);

    // Update itineraries with saved state
    const updatedItineraries = itineraries.map((itinerary) => ({
      ...itinerary,
      saved: savedItineraryIds.has(itinerary.id),
    }));
    setItineraries(updatedItineraries);
  }, [currentUser.savedItineraries]);
  const handleSaveItineraryWithAnimation = async (itineraryId) => {
    if (!itineraries[index].saved) {
      setAnimate(true); // Trigger animation
      await handleSaveItinerary(itineraryId); // Call your existing save function
      setTimeout(() => setAnimate(false), 500); // Reset animation state after 500ms
    }
  };
  const handleSaveItinerary = async (itineraryId) => {
    console.log(currentUser);
    try {
      // Proceed to save the itinerary if not already saved
      const saveResponse = await axios.post(
        `${apiURL}/itineraries/users/${currentUser.id}/save-itinerary`,
        {
          itineraryId,
        },
      );

      if (saveResponse.status === 200) {
        // Optimistically update the UI to reflect the saved state
        const updatedItineraries = itineraries.map((itinerary) => {
          if (itinerary.id === itineraryId) {
            return { ...itinerary, saved: true };
          }
          return itinerary;
        });
        setItineraries(updatedItineraries);
      }
    } catch (error) {
      console.error('Error saving itinerary:', error);
    }
  };

  const openComments = async (itineraryId) => {
    setComment('');
    try {
      // Fetch comments for the itinerary
      const response = await fetch(
        `${apiURL}/itineraries/${itineraryId}/comments`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const comments = await response.json();
      setComments(comments);
    } catch (error) {
      console.error('Error opening comments:', error);
      // Handle error appropriately, such as displaying an error message
    }
  };

  const submitComment = async (itineraryId, comment) => {
    // add the comment to the comments array
    try {
      // Send the comment to the server
      const response = await fetch(
        `${apiURL}/itineraries/${itineraryId}/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: comment, userId: currentUser.id }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      // Extract the newly added comment from the response
      const newComment = await response.json();

      // Update the comments state to include the newly added comment
      setComments((prevComments) => [...prevComments, newComment]);

      console.log('Comment submitted successfully');

      //Get itenerary for itineraryId
      const itinerary = itineraries.find(
        (itinerary) => itinerary.id === itineraryId,
      );
      //Increment comment count
      itinerary.commentCount++;

      setItineraries([...itineraries]);

      setComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      // Handle error appropriately, such as displaying an error message
    }
  };

  const handleFollowButton = async (userId) => {
    try {
      if (following) {
        // Unfollow logic
        const response = await fetch(`${apiURL}/users/unfollow/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ currentUser: currentUser.id }),
        });
        if (!response.ok) {
          throw new Error('Failed to unfollow user');
        }
        //Update the current user's with the response
        const updatedUser = await response.json();
        if (updatedUser) {
          // Update the current user context with the updated user data
          updateCurrentUser(updatedUser);
        }

        console.log('User unfollowed successfully');
      } else {
        // Follow logic
        const response = await fetch(`${apiURL}/users/follow/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ currentUser: currentUser.id }),
        });
        //Update the current user's with the response
        const updatedUser = await response.json();
        if (updatedUser) {
          // Update the current user context with the updated user data
          updateCurrentUser(updatedUser);
        }
        console.log(currentUser);
        if (!response.ok) {
          throw new Error('Failed to follow user');
        }
        console.log('User followed successfully');
      }

      // Toggle following state
      setFollowing(!following);
      // Trigger animation
      setAnimate(true);
    } catch (error) {
      console.error('Error:', error);
      // Handle error appropriately, such as displaying an error message
    }
  };

  const handleProfileLink = async (userId) => {
    //get the user id and navigate to the user's profile from this url `http://localhost:8080/users/${userId}`
    try {
      console.log(userId);
      const response = await fetch(`${apiURL}/users/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      const user = await response.json();
      //Go to url of http://localhost:5173/user/syriltj1 using react router
      navigate(`/user/${user.username}`);
    } catch (error) {
      console.error('Error:', error);
      // Handle error appropriately, such as displaying an error message
    }
  };

  return (
    <div className="h-70 absolute bottom-40 right-6 z-10 mb-12 flex flex-col gap-6 rounded-xl  bg-white/60 px-2 py-4 text-sm sm:mb-8 sm:ml-4 sm:text-lg lg:static lg:right-16 lg:bg-transparent">
      <div className="relative flex flex-col items-center ">
        <Link onClick={() => handleProfileLink(itineraries[index].userId)}>
          {itineraries[index]?.userPhoto ? (
            <img
              src={itineraries[index]?.userPhoto}
              alt="Profile"
              className="mb-1 w-12 rounded-full"
            />
          ) : (
            <CgProfile className="mb-1 h-12 w-12" />
          )}
        </Link>

        <Button
          className={`absolute -bottom-0.5 h-5 max-w-5 rounded-full bg-rose-400 px-1 text-justify text-white transition-all duration-300 ease-in-out hover:bg-rose-500 ${
            following ? 'animate-bounce-2' : animate ? 'animate-shake' : ''
          }`}
          onClick={() => handleFollowButton(itineraries[index].userId)}
        >
          {following ? <IoMdCheckmark /> : <GoPlus />}
        </Button>
      </div>

      <div className="flex flex-col items-center gap-2">
        {liked ? (
          <FaHeart
            size={iconSize}
            className="ease cursor-pointer text-rose-500 transition duration-200 hover:text-rose-500"
            onClick={() => handleLikeButton(itineraries[index].id, index)}
          />
        ) : (
          <FaRegHeart
            size={iconSize}
            className="ease cursor-pointer text-black transition duration-200 hover:text-rose-500"
            onClick={() => handleLikeButton(itineraries[index].id, index)}
          />
        )}

        <div className=" font-bold">{itineraries[index].likeCount}</div>
      </div>
      <div className="flex flex-col items-center gap-2">
        {
          <Drawer>
            <DrawerTrigger>
              <FaRegCommentAlt
                size={iconSize}
                onClick={() => openComments(itineraries[index].id)}
              />
            </DrawerTrigger>
            <DrawerContent className="h-4/6 lg:w-1/2 lg:justify-self-center">
              <DrawerHeader className="flex items-center gap-4">
                <DrawerClose className="text-xl">
                  <FaTimes />
                </DrawerClose>
                <DrawerTitle className="justify-self-center text-3xl">
                  Comments
                </DrawerTitle>
              </DrawerHeader>
              <div className="grid grid-cols-1 gap-y-6 overflow-scroll p-4">
                {comments ? (
                  comments.map((comment, index) => (
                    <Comment key={index} comment={comment} />
                  ))
                ) : (
                  <div>Loading comments...</div>
                )}
              </div>
              <DrawerFooter className="flex flex-row items-center">
                <Input
                  className="border-slate-500"
                  placeholder="Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  className="h-full w-1/4"
                  onClick={() => submitComment(itineraries[index].id, comment)}
                >
                  Comment
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        }
        <div className=" font-bold">{itineraries[index].commentCount}</div>
      </div>
      <div className="flex flex-col items-center gap-2">
        {itineraries[index].saved ? (
          <FaBookmark
            size={iconSize}
            className={`cursor-pointer text-rose-500 ${animate ? 'animate-bounce' : ''}`} // Filled icon for saved, with bounce animation
            onClick={() =>
              handleSaveItineraryWithAnimation(itineraries[index].id)
            }
          />
        ) : (
          <FaRegBookmark
            size={iconSize}
            className="cursor-pointer text-gray-900" // Outlined icon for not saved
            onClick={() =>
              handleSaveItineraryWithAnimation(itineraries[index].id)
            }
          />
        )}
      </div>
    </div>
  );
}
