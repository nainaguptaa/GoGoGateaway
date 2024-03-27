import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaUserFriends,
  FaCompass,
  FaBroadcastTower,
  FaUserAlt,
} from 'react-icons/fa'; // Import icons from react-icons
import { ModeToggle } from './ModeToggle';
import { GiHamburgerMenu } from 'react-icons/gi';
export default function MobileSidebar({ isOpen, closeSidebar }) {
  const navigationLinks = [
    { name: 'For You', path: '/foryou', icon: <FaHome size={50} /> },
    {
      name: 'Following',
      path: '/following',
      icon: <FaUserFriends size={50} />,
    },

    // ... more navigation links
  ];
  const navigate = useNavigate();
  return (
    <>
      <div className="">
        {isOpen && (
          <div
            className="fixed inset-0 z-[99] bg-black bg-opacity-50"
            onClick={closeSidebar}
          ></div>
        )}
        <div
          className={`fixed left-0 top-0 z-[100] h-full w-11/12 bg-card p-5 pb-4  pt-7 transition-transform duration-300 sm:w-4/6 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="pb-5 pl-3">
            <GiHamburgerMenu size={35} onClick={() => closeSidebar()} />
          </div>
          <div className="relative h-[82rem] ">
            {' '}
            <div className=" h-10/12 overflow-y-scroll  pt-1">
              {navigationLinks.map((link) => (
                <NavLink
                  key={link.name}
                  onClick={closeSidebar}
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
            <div className="w-full border-t-2 px-3 py-2 pt-4">
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
