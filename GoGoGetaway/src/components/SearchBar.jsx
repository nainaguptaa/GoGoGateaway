import React, { useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search term

  // Function to handle the input change
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submit action

    const baseUrl = '/search';

    // Constructing the query parameters string from the form inputs
    const queryParams = new URLSearchParams({
      city: searchTerm,
    }).toString();

    // Final search URL
    const searchUrl = `${baseUrl}?${queryParams}`;
    navigate(`${baseUrl}?${queryParams}`); // Navigate to the search page with the search term
  };
  return (
    <div className="absolute bottom-neg-4 left-14 right-14 flex flex-col justify-center gap-4 rounded-xl border bg-white p-8 shadow-md">
      <div className="text-xl font-semibold">Search Destinations</div>
      <form
        className="flex w-1/3 items-center gap-4 rounded-md border px-8 py-4"
        onSubmit={handleSearchSubmit}
      >
        <CiLocationOn size={25} />
        <input
          type="text"
          className="w-full border-b-2 outline-none"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Enter destination" // optional, for user guidance
        />
        <button
          type="submit"
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
