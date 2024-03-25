import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  let query = searchParams.get('q');
  // Capitalize the first letter of the query
  query = query.charAt(0).toUpperCase() + query.slice(1);

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/itineraries/?city=${query}`);
      setResults(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <div className="flex flex-col h-screen justify-start items-center pt-2">
      <h2 className="font-serif text-3xl font-light text-white-800 mb-4">Search Results for: {query}</h2>
      {loading ? (
        <p className="text-lg text-blue-500">Loading...</p>
      ) : results.length > 0 ? (
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((itinerary) => (
              <div key={itinerary.id} className="cursor-pointer rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden" onClick={() => navigate(`/itineraries?id=${itinerary.id}`)}>
                <img src={itinerary.images[0]} alt="Itinerary" className="h-56 w-full object-cover" />
                <div className="p-4 bg-white">
                  <h3 className="text-xl font-light text-gray-900">{itinerary.name}</h3>
                  <p className="text-gray-600">{itinerary.city}</p>
                  <p className="font-light text-gray-800">Total Price: ${itinerary.totalPrice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-lg text-red-500">No search results found for {query}</p>
      )}
    </div>
  );
};

export default SearchResults;