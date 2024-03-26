
import React from 'react';
import { useParams } from 'react-router-dom';

export default function MyTrips() {
  const { username } = useParams();

  return (
    <div>
      <h1>My Trips</h1>
      <p>Username: {username}</p>
    </div>
  );
}