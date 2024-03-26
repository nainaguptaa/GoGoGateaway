// ItineraryList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ForYouLikes from './ForYouLikes';
import { FixedSizeList as List } from 'react-window';

const ItineraryList = ({ itineraries, isMobile, iconSize, itemSize }) => {
  const navigate = useNavigate();
  const Row = ({ index, style }) => (
    <div style={style} className="mx:px-20 px-4 lg:px-14 lg:pt-8 ">
      <div className="flex h-full items-end md:h-[48rem] md:items-center md:justify-center">
        <div
          className="flex cursor-pointer flex-col gap-2 overflow-hidden sm:h-[47rem] md:h-[46rem] md:w-[55rem] lg:w-[65rem] lg:rounded-2xl lg:border-2 lg:bg-card lg:dark:bg-card 2xl:w-[75rem]"
          onClick={() => navigate(`/itineraries?id=${itineraries[index].id}`)}
        >
          <div className="h-[39rem] bg-red-300 sm:h-[39rem] sm:w-full md:h-[38rem] lg:h-[38rem] 2xl:max-h-[38rem]">
            <img
              src={itineraries[index].images[0]}
              loading="lazy"
              className="z-10 h-full w-full object-cover"
            />
          </div>

          <div className="flex justify-between px-4 pb-3">
            <div className="flex flex-col">
              <div className="text-3xl font-bold">
                {itineraries[index].name}
              </div>
              <div className="text-xl font-semibold">
                {itineraries[index].city}
              </div>
            </div>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('en-CA', {
                style: 'currency',
                currency: 'CAD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(itineraries[index].totalPrice)}{' '}
              Total
            </div>
          </div>
        </div>
        <ForYouLikes
          isMobile={isMobile}
          itinerariesProp={itineraries}
          index={index}
          iconSize={iconSize}
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-grow gap-2 overflow-hidden lg:ml-[14rem] xl:ml-64">
      <List
        className="flex lg:gap-12 2xl:gap-24 "
        height={window.innerHeight}
        itemCount={itineraries.length}
        itemSize={itemSize}
        width={'100%'}
      >
        {Row}
      </List>
    </div>
  );
};

export default ItineraryList;
