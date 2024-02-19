import React, { useState } from 'react';
import HeroImage from '../../assets/svgs/hero5.svg';
import { Typewriter } from 'react-simple-typewriter';
import { CiLocationOn } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
const Hero = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search term
  const navigate = useNavigate(); // Hook to navigate
  const handleType = (count) => {
    // access word count number
    // console.log(count);
  };
  const handleDone = () => {
    // console.log(`Done after 5 loops!`);
  };
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
    <div className="relative flex gap-12 bg-light-blue px-24 py-12 pb-48 font-poppins">
      <div className="flex flex-col items-center justify-center gap-12">
        <div className="flex h-16 w-full ">
          {' '}
          <div className="text-5xl font-bold">
            Uncover The Secrets of{' '}
            <Typewriter
              words={['Calgary', 'Edmonton', 'Banff', 'Canmore']}
              loop={5}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
              onLoopDone={handleDone}
              onType={handleType}
            />
          </div>
        </div>

        <div className="text-lg font-normal text-secondary-text">
          Craft your dream trip with personalized recommendations and
          interactive maps tailored just for you.
        </div>
      </div>
      <img src={HeroImage} className="h-96"></img>
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
    </div>
  );
};

export default Hero;
