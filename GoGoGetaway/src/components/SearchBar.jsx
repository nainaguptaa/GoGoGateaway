import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';
import { FaSearch } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
const SearchBar = () => {
  const [search, setSearch] = useState(''); // Initialize state
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    // Call handleResize initially in case the initial window size is mobile
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleChange = (event) => {
    setSearch(event.target.value); // Update state on change
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    navigate(`/search?q=${encodeURIComponent(search)}`); // Use navigate to change the URL
  };
  if (isMobile) {
    return (
      <>
        {' '}
        <FaSearch size={30} />
      </>
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
