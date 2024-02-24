import React, { useState, useEffect, lazy } from 'react';
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
import { RxDashboard } from 'react-icons/rx';
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
import MobileSidebar from './MobileSidebar';
const Navbar = ({ isMobile }) => {
  const { currentUser, user, logout, signPopup, setSignPopup } =
    useUserContext();
  const { theme } = useTheme();
  const navigate = useNavigate();
  console.log(signPopup);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  if (isMobile) {
    return (
      <>
        {/* <MobileSidebar /> */}
        <div className="fixed top-0 z-50 flex w-full items-center  justify-between bg-card px-6 py-6">
          {' '}
          {/* <img
            src={theme == 'light' ? LogoOnly : LogoOnly}
            className="w-20 cursor-pointer "
            onClick={() => navigate('/foryou')}
            alt="logo"
          /> */}
          <GiHamburgerMenu
            size={35}
            onClick={() => setSidebarOpen((prev) => !prev)}
          />
          <SearchBar isMobile={isMobile} />
        </div>
        <MobileSidebar
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />
      </>
    );
  }
  return (
    <div className="fixed left-0 top-0 z-20 flex w-full items-center justify-between border-b-2 bg-white px-12 py-6 dark:bg-card">
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

      <div className="font-poppins flex items-center justify-evenly  gap-4">
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
                  onClick={() => navigate('/my-trips')}
                >
                  <RxDashboard size={25} />
                  <div>My Trips</div>
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
              onClick={() => setSignPopup(true)}
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
