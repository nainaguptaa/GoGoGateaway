import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  // Default sort by highest rated
  const [sortCriteria, setSortCriteria] = useState('rating');

  let query = searchParams.get('q');
  query = query.charAt(0).toUpperCase() + query.slice(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/itineraries/?city=${query}`);
        setResults(response.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const calculateAverageRating = (itinerary) => {
    let totalRating = 0;
    let count = 0;

    if (itinerary.hotel && itinerary.hotel.rating) {
      totalRating += parseInt(itinerary.hotel.rating, 10);
      count += 1;
    }

    itinerary.events.forEach(event => {
      if (event.rating) {
        totalRating += parseInt(event.rating, 10);
        count += 1;
      }
    });

    itinerary.restaurants.forEach(restaurant => {
      if (restaurant.rating) {
        totalRating += parseInt(restaurant.rating, 10);
        count += 1;
      }
    });

    if (count > 0) {
      return (totalRating / count).toFixed(1); // Keeping one decimal for average
    } else {
      return "No ratings";
    }
  };

  // Sort results based on the selected criteria
  const sortedResults = results.sort((a, b) => {
    if (sortCriteria === 'price') {
      return a.totalPrice - b.totalPrice;
    } else if (sortCriteria === 'rating') {
      const ratingA = parseFloat(calculateAverageRating(a));
      const ratingB = parseFloat(calculateAverageRating(b));
      return ratingB - ratingA; // For rating, sort in descending order
    }
    return 0;
  });

  return (
<div className="flex flex-col h-screen justify-start items-center pt-2">
  <div className="w-full max-w-6xl flex justify-between items-center mb-4 px-4 py-2">
    <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">Search Results for: {query}</h2>
    <div className="sort-dropdown flex items-center">
      <label htmlFor="sortCriteria" className="mr-2 text-gray-400">Sort by:</label>
      <select id="sortCriteria" value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)} className="px-5 py-3 text-base font-medium text-center text-gray-900 bg-gray-200 border border-gray-400 rounded-lg shadow-sm dark:text-white dark:bg-gray-700">
        <option value="rating">Highest Rated</option>
        <option value="price">Price (Lowest to Highest)</option>
      </select>
    </div>
  </div>
      {loading ? (
        <p className="text-lg text-blue-500">Loading...</p>
      ) : sortedResults.length > 0 ? (
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedResults.map((itinerary) => (
              <div key={itinerary.id} className="cursor-pointer rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative" onClick={() => navigate(`/itineraries?id=${itinerary.id}`)}>
                <img src={itinerary.images[0]} alt="Itinerary" className="h-56 w-full object-cover" />
                <div className="p-4 bg-white">
                  <h3 className="text-xl font-light text-gray-900">{itinerary.name}</h3>
                  <p className="text-gray-600">{itinerary.city}</p>
                  <p className="font-light text-gray-800">Total Price: ${itinerary.totalPrice}</p>
                  {/* Display the calculated average rating as acalculated average rating as a star on the bottom right */}
                  <div style={{position: 'absolute', bottom: '10px', right: '10px', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '5px 10px', borderRadius: '10px', display: 'flex', alignItems: 'center'}}>
                    <span style={{color: '#FFD700', marginRight: '5px'}}>★</span>
                    <span style={{fontWeight: 'bold', color: '#333'}}>{calculateAverageRating(itinerary)}</span>
                  </div>
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