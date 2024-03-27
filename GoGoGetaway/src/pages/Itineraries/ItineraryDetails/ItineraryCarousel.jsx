import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
export default function ItineraryCarousel({ itinerary }) {
  return (
    <>
      <Carousel className="w-full">
        <CarouselContent>
          {itinerary.images.map((image, index) => (
            <CarouselItem key={index}>
              <img
                src={image}
                alt="Itinerary Image"
                className="h-[23rem] w-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex" />
        <CarouselNext className="hidden lg:flex" />
      </Carousel>
    </>
  );
}
