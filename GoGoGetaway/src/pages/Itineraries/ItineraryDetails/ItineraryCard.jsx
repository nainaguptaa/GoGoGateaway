import React from 'react';
import { CiCalendar } from 'react-icons/ci';

const ItineraryStickyCard = ({ formattedDate, itinerary, saveItinerary }) => {
  return (
    <div className="flex shadow-xl  lg:sticky lg:top-32 lg:grow lg:flex-col lg:justify-between lg:rounded-xl lg:border-2 lg:p-7 ">
      <div className="text-2xl font-bold">Quick Overview</div>
      <div className="mt-6 flex flex-col gap-2">
        <div className="text-semibold text-xl text-gray-400">Date</div>
        <div className="flex gap-3 rounded-xl border-2 px-5 py-2">
          <CiCalendar size={25} />
          <div className="text-xl font-semibold ">{formattedDate}</div>
        </div>
      </div>
      <div className="mb-2 mt-5 flex flex-col gap-2 border-b-2 border-t-2 pb-4 pt-4">
        <div className="text-2xl font-semibold ">Quantities</div>
        <div className="flex justify-between text-xl ">
          <div className="font-normal">Restaurants:</div>
          {itinerary.restaurants.length}
        </div>
        <div className="flex justify-between text-xl ">
          <div className="font-normal">Events:</div>
          {itinerary.events.length}
        </div>
        <div className="flex justify-between text-xl ">
          <div className="font-normal">Hotels:</div> 1
        </div>
      </div>

      <button
        className="mt-3 flex justify-center rounded-xl bg-amber-500 py-2 text-2xl font-semibold text-white"
        onClick={saveItinerary}
      >
        Save Itinerary
      </button>
      <div className="mt-6 flex items-end justify-between">
        <div className="text-xl text-gray-600">Total</div>
        <div className="text-3xl font-semibold">${itinerary.totalPrice}</div>
      </div>
    </div>
  );
};

export default ItineraryStickyCard;
