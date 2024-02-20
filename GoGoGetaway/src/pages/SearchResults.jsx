import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ForYouLeft from './ForYou/ForYouLeft';
const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q'); // Get the search query from the URL
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock an async search function
  const search = async (query) => {
    setLoading(true);
    // Here you would typically make an API call with the query
    // For demonstration, we'll just filter an array of mock items
    const mockItems = [
      { id: 1, name: 'Funny Cat Video' },
      { id: 2, name: 'Hilarious Dog Compilation' },
      { id: 3, name: 'Amazing Nature Clips' },
    ];
    const filteredItems = mockItems.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );

    setTimeout(() => {
      setResults(filteredItems);
      setLoading(false);
    }, 500); // Simulate network delay
  };

  // Effect hook to perform search when the query changes
  useEffect(() => {
    if (query) {
      search(query);
    } else {
      setResults([]); // Clear results if there's no query
    }
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
                {results.map((result) => (
                  <li key={result.id}>{result.name}</li>
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
