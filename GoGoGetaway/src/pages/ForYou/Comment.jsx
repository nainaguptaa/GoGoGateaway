import React, { useState, useEffect } from "react";

const Comment = ({ comment }) => {
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Perform a fetch operation to get user data based on comment.userId
        const response = await fetch(`http://localhost:3000/users/${comment.userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        console.log("User data:", userData);
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

  return (
    <div>
      <div className="flex items-center gap-4">
        <div>{comment.text}</div>
        {userData && <div>User: {userData.username}</div>}
      </div>
    </div>
  );
};

export default Comment;
