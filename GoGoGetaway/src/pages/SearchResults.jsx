import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ForYouLeft from './ForYou/ForYouLeft';
import axios from 'axios';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q'); // Get the search query from the URL
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // // Mock an async search function
  // const search = async (query) => {
  //   setLoading(true);
  //   // Here you would typically make an API call with the query
  //   // For demonstration, we'll just filter an array of mock items
  //   const mockItems = [
  //     { id: 1, name: 'Funny Cat Video' },
  //     { id: 2, name: 'Hilarious Dog Compilation' },
  //     { id: 3, name: 'Amazing Nature Clips' },
  //   ];
  //   const filteredItems = mockItems.filter((item) =>
  //     item.name.toLowerCase().includes(query.toLowerCase()),
  //   );

  //   setTimeout(() => {
  //     setResults(filteredItems);
  //     setLoading(false);
  //   }, 500); // Simulate network delay
  // };

  // Function to fetch data using Axios
  const fetchData = async () => {
    try {
      setLoading(true);
      // Make a GET request to the desired URL
      const response = await axios.get(`http://localhost:3000/itineraries/?location=${query}`);
      // Set the data received from the API to the state
      setResults(response.data);
      console.log(response.data);
    } finally {
      // Update loading state regardless of success or failure
      setLoading(false);
    }
  };

  // Effect hook to perform search when the query changes
  useEffect(() => {
    // Use axios to make an API call to the backend
    fetchData();
  }, [query]);
  return (
    <div>
      <div className="">
        <div className="flex h-screen">
          <ForYouLeft className="" />
          <div className="ml-64 flex flex-grow gap-2 overflow-hidden">
            <h2>Search Results for: {query}</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ul>
                {results.map((itinerary) => (
                  <div key={itinerary.id} className="itinerary">
                    <h3>Price: ${itinerary.price}</h3>
                    <p>Rating: {itinerary.rating}</p>
                    <div>
                      <img src={itinerary.hotel.imageURL} alt="Hotel" style={{ width: '100px', height: '100px' }} />
                    </div>
                    <p>Locations: {itinerary.locations.join(', ')}</p>
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
