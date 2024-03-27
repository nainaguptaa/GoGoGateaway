import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

export default function ItineraryCardMobile({
  formattedDate,
  itinerary,
  saveItinerary,
}) {
  return (
    <div className="fixed bottom-[0rem]  w-full border-t-2 bg-card">
      <div className="z-10 flex items-center justify-between gap-2 p-3">
        <div className="flex w-1/4 flex-col ">
          <div className="text-[0.85rem] font-medium">
            ${itinerary.totalPrice}
          </div>
          <div className="text-[0.75rem]">{formattedDate}</div>
        </div>
        <Drawer>
          <DrawerTrigger asChild>
            <div className="grow text-base underline underline-offset-1">
              Quantities
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Quantities</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 pb-0">
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
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
        <button
          className="flex justify-center rounded-xl bg-amber-500 px-2 py-2 text-sm font-semibold text-white"
          onClick={saveItinerary}
        >
          Save Itinerary
        </button>
      </div>
    </div>
  );
}
