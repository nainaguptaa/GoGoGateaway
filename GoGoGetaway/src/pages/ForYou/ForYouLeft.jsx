import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaUserFriends,
  FaCompass,
  FaBroadcastTower,
  FaUserAlt,
} from 'react-icons/fa'; // Import icons from react-icons
export default function ForYouLeft() {
  const [active, setActive] = useState('For You');
  const navigationLinks = [
    { name: 'For You', path: '/foryou', icon: <FaHome size={20} /> },
    {
      name: 'Following',
      path: '/following',
      icon: <FaUserFriends size={20} />,
    },
    // ... more navigation links
  ];
  const location = useLocation();
  useEffect(() => {
    setActive();
  }, []);
  return (
    <div className="fixed flex h-full w-64 flex-col border-r-2 border-gray-200 pt-6 sm:w-44 md:w-64">
      <div className="">
        {navigationLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-4 p-5 text-xl font-bold text-cyan-500 no-underline transition duration-100 hover:bg-gray-400  hover:text-white hover:dark:bg-gray-700'
                : 'ease duration-400 hover:white flex items-center gap-4 p-5 text-xl font-bold  no-underline transition hover:bg-gray-400  hover:text-white hover:dark:bg-gray-700'
            }
            // This function dynamically sets the class based on the active state
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </div>

      <div>
        <p className="px-5 py-2 text-sm uppercase">Following accounts</p>
        {/* Dynamically render following accounts here */}
        {/* Example of a single account link */}
        <Link
          to="/user/username"
          className="flex items-center px-5 py-2 hover:bg-gray-700"
        >
          <img
            src="path_to_profile_picture"
            alt="User"
            className="mr-3 h-8 w-8 rounded-full"
          />
          <div>
            <p className="font-bold">Username</p>
            <p className="text-sm">Name</p>
          </div>
        </Link>
        {/* ... more accounts ... */}
      </div>
    </div>
  );
}
