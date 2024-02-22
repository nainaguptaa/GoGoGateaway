import React, { useState, useEffect } from 'react';
import { useUserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import ProfilePicture from './ProfilePicture';
import { CgProfile } from 'react-icons/cg';
import { IoPersonOutline } from 'react-icons/io5';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CiLogout } from 'react-icons/ci';
import Logo from '../assets/LogosFive/logo-transparent-svg.svg';
import LogoDark from '../assets/LogosFour/logo-transparent-svg.svg';
import LogoOnly from '../assets/LogosFour/logo-only.svg';
import { FaHome } from 'react-icons/fa';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ModeToggle } from './ModeToggle';
import { useTheme } from '@/components/theme-provider';
const Navbar = ({ isMobile }) => {
  const { currentUser, user, logout } = useUserContext();
  const { theme } = useTheme();
  const navigate = useNavigate();

  if (isMobile) {
    return (
      <>
        <div className="flex w-full items-center justify-between  px-6 py-6">
          {' '}
          {/* <img
            src={theme == 'light' ? LogoOnly : LogoOnly}
            className="w-20 cursor-pointer "
            onClick={() => navigate('/foryou')}
            alt="logo"
          /> */}
          <GiHamburgerMenu size={35} />
          <SearchBar isMobile={isMobile} />
        </div>
      </>
    );
  }
  return (
    <div className="dark:bg-card fixed left-0 top-0 z-20 flex w-full items-center justify-between border-b-2 bg-white px-12 py-6">
      <div className="flex items-center gap-8 ">
        <img
          src={theme == 'light' ? Logo : LogoDark}
          className="w-44 cursor-pointer "
          onClick={() => navigate('/foryou')}
          alt="logo"
        />

        {/* <div className="text-3xl font-bold text-orange-400 dark:text-orange-500">
          GoGoGetaway
        </div> */}
        <SearchBar />
      </div>

      <div className="flex items-center justify-evenly gap-4  font-poppins">
        <button
          onClick={() => navigate('/create')}
          className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-white"
        >
          <div className="text-lg">Create</div>
          <div className="text-lg font-bold">+</div>
        </button>
        <ModeToggle />
        {/* <nav>
          <ul className="flex list-none space-x-8">
            <li>
              <a href="#" className="text-lg hover:text-blue-700">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-lg hover:text-blue-700">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-lg hover:text-blue-700">
                Deals
              </a>
            </li>
          </ul>
        </nav> */}
        {currentUser && currentUser.username ? (
          <>
            {' '}
            <DropdownMenu>
              <DropdownMenuTrigger>
                {' '}
                <ProfilePicture />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="mr-4 mt-4 w-56 text-lg">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center gap-2"
                  onClick={() => navigate('/')}
                >
                  <FaHome size={25} />
                  <div>Home</div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-2"
                  onClick={() => navigate('/profile')}
                >
                  <IoPersonOutline size={25} />
                  <div>Profile</div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-2"
                  onClick={logout}
                >
                  <CiLogout size={25} />
                  <div>Log Out</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <button
              className="btn cursor-pointer bg-blue-400 text-lg text-white"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
