import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';
import { FaSearch } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { IoIosArrowBack } from 'react-icons/io';
const SearchBar = ({ isMobile, iconSize }) => {
  const [search, setSearch] = useState(''); // Initialize state
  const navigate = useNavigate();
  const handleChange = (event) => {
    setSearch(event.target.value); // Update state on change
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    navigate(`/search?q=${encodeURIComponent(search)}`); // Use navigate to change the URL
  };
  if (isMobile) {
    return (
      <div className="flex items-center gap-2 py-3">
        <div className="shrink-0">
          {' '}
          <IoIosArrowBack size={30} />
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex items-center gap-2 rounded-2xl bg-gray-100 px-4 py-3">
            <FaSearch size={15} />
            <input
              type="text"
              value={search} // Bind the input value to the component's state
              onChange={handleChange} // Update the state when input changes
              placeholder="Search"
              className="w-[20rem] bg-transparent outline-none"
            />
          </div>

          <button type="submit" className="font-medium text-orange-500">
            Search
          </button>
        </form>
      </div>
    );
  }
  return (
    // <div className="flex w-full justify-center ">
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 rounded-2xl border-2 px-4 py-3"
    >
      <FaSearch size={15} />
      <input
        type="text"
        value={search} // Bind the input value to the component's state
        onChange={handleChange} // Update the state when input changes
        placeholder="Search"
        className="w-96 bg-transparent outline-none"
      />
    </form>
    // </div>
  );
};

export default SearchBar;
