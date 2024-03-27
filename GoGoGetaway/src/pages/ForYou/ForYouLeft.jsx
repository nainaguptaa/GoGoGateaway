import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaUserFriends } from 'react-icons/fa'; // Import icons from react-icons
import { useUserContext } from '@/context/userContext';
export default function ForYouLeft({ iconSize }) {
  const [active, setActive] = useState('For You');
  const [followingList, setFollowingList] = useState([]);
  const navigationLinks = [
    { name: 'For You', path: '/foryou', icon: <FaHome size={iconSize} /> },
    {
      name: 'Following',
      path: '/following',
      icon: <FaUserFriends size={iconSize} />,
    },
    // ... more navigation links
  ];
  const location = useLocation();
  useEffect(() => {
    setActive();
  }, []);

  const { currentUser } = useUserContext();

  useEffect(() => {
    setFollowingList(currentUser.following);
  }, [currentUser.following]);

  return (
    <div className="fixed flex h-full w-64 flex-col border-r-2 border-gray-200 pt-6 sm:w-44 md:w-64">
      <div className="">
        {navigationLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-4 p-5 text-xl font-bold text-teal-400 no-underline transition duration-100 hover:bg-gray-400  hover:text-white hover:dark:bg-gray-700'
                : 'ease duration-400 hover:white flex items-center gap-4 p-5 text-xl font-bold  no-underline transition hover:bg-gray-400  hover:text-white hover:dark:bg-gray-700'
            }
            // This function dynamically sets the class based on the active state
          >
            <div className="shrink-0"> {link.icon}</div>

            <span>{link.name}</span>
          </NavLink>
        ))}
      </div>

      <div>
        <p className="px-5 py-2 text-sm uppercase">Following accounts</p>
        {/* Dynamically render following accounts here */}
        {/* Example of a single account link */}
        {followingList.map((following) => (
          <Link
            key={following.username}
            to={`/user/${following.username}`}
            className="flex items-center px-5 py-2 hover:bg-gray-700"
          >
            <img
              src={following.photoURL}
              alt="User"
              className="mr-3 h-8 w-8 rounded-full"
            />
            <div>
              <p className="font-bold">{following.username}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
