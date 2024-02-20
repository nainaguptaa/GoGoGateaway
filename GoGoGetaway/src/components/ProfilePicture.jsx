import React from 'react';
import { useUserContext } from '../context/userContext';
const ProfilePicture = () => {
  const { user, currentUser } = useUserContext();
  const isGoogleUser = currentUser.googleUser;

  // Extract the first letter of currentUser's email if needed
  const firstLetter = currentUser.email ? currentUser.email[0] : '';
  console.log(user.profileURL);
  return (
    <div>
      {isGoogleUser ? (
        // If a Google user, display the profile image
        <img src={user.photoURL} alt="Profile" className="w-12 rounded-full" />
      ) : (
        // If not a Google user, display an element with the first letter of the email
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-400 text-lg font-semibold text-white ">
          {firstLetter.toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
