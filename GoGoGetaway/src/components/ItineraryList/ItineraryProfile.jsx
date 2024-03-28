import { useParams, useNavigate } from 'react-router-dom';
const ItineraryProfile = ({ itinerary }) => {

  const navigate = useNavigate();

  return (
    <div key={itinerary.id}
      className="cursor-pointer rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative"
      onClick={() => navigate(`/itineraries?id=${itinerary.id}`)}>

      <img src={itinerary.images[0]} alt="Itinerary" className="h-56 w-full object-cover" />
      <div className="p-4 bg-white">
        <h3 className="text-xl font-light text-gray-900">{itinerary.name}</h3>
        <p className="text-gray-600">{itinerary.city}</p>
        <p className="font-light text-gray-800">Total Price: ${itinerary.totalPrice}</p>
        <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 p-2 rounded-lg flex items-center">
          {/* <span className="text-yellow-400 mr-2">★</span> */}
          {/* <span className="font-bold text-gray-800">{calculateAverageRating(itinerary)}</span> */}
        </div>
        {/* Add a remove button */}
        {/* <button
          type="button"
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
          onClick={(e) => {
            e.stopPropagation(); // Prevent the navigate function from being called
            removeSavedItinerary(itinerary.id);
          }}
        >
          Remove
        </button> */}
      </div>
    </div>
  )
}
export default ItineraryProfile