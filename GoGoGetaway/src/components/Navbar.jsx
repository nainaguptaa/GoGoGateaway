import React from 'react';
import { useUserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { currentUser } = useUserContext();
  console.log(currentUser);
  const navigate = useNavigate();
  return (
    <div className="flex justify-between bg-light-blue px-24 py-12">
      <h1
        className="cursor-pointer text-xl"
        onClick={() => navigate('/foryou')}
      >
        GoGoGetaway
      </h1>
      <div className="flex items-center justify-evenly gap-16 font-poppins">
        <nav>
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
        </nav>
        {currentUser && currentUser.username ? (
          <button
            className="btn cursor-pointer bg-blue-400 text-lg text-white"
            onClick={() => navigate('/profile')}
          >
            Profile
          </button>
        ) : (
          <button
            className="btn cursor-pointer bg-blue-400 text-lg text-white"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
