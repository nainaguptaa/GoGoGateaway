import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import itinerariesDummy from '../../dummyData/dummyItinerary.json';
export default function Itinerary() {
  const location = useLocation();
  const [itinerary, setItinerary] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const title = queryParams.get('q');
    const id = queryParams.get('id');

    // Assuming id is unique and you want to match it precisely
    const matchingItinerary = itinerariesDummy.find(
      (itin) => itin.id.toString() === id && itin.title === title,
    );

    setItinerary(matchingItinerary);
  }, [location]);

  if (!itinerary) {
    return <div>No itinerary found.</div>;
  }
  return (
    <div>
      <h2>{itinerary.title}</h2>
      <p>Posted by: {itinerary.user}</p>
      <p>{`${itinerary.posted} (days ago calculation could be added here)`}</p>
      <div>
        {itinerary.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className="object-cover"
          />
        ))}
      </div>
      {/* Display other details */}
    </div>
  );
}
