import React from 'react';
import { useUserContext } from '../context/userContext';
const Profile = () => {
  const { currentUser, logout } = useUserContext();
  return (
    <div>
      {currentUser.username}
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Profile;
