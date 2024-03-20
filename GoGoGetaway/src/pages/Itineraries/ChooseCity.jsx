import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import canadianCities from '../../dummyData/canadian-cities.json';
export default function ChooseCity({
  city,
  setCity,
  handleChange,
  toTitleCase,
}) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [localCity, setLocalCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    // Automatically open the dialog when the URL is '/create'
    if (location.pathname === '/create') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [location]);

  useEffect(() => {
    // Filter cities based on the input
    if (localCity) {
      const matchedCities = canadianCities.filter(([cityName]) =>
        cityName.toLowerCase().startsWith(localCity.toLowerCase()),
      );
      setSuggestions(matchedCities);
    } else {
      setSuggestions([]);
    }
  }, [localCity]);

  const handleSaveChanges = () => {
    setCity({
      target: {
        value: localCity,
      },
    });
  };

  const handleSuggestionClick = (cityName) => {
    console.log('Selected city:', cityName);
    setLocalCity(toTitleCase(cityName)); // Update the local state with the selected city
    setSuggestions([]); // Clear suggestions
    console.log(2, suggestions);
    // Directly update the parent component's state with the new city
    setCity({
      target: {
        value: cityName,
      },
    });
  };
  //   console.log(suggestions);

  return (
    <DialogContent className=" sm:max-w-[425px] md:max-w-[60rem] md:text-lg">
      <DialogHeader className="md:text-lg">
        <DialogTitle>Select City</DialogTitle>
        <DialogDescription>Please Select City to Continue</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col items-center gap-4">
        <Label htmlFor="city" className="text-right md:text-lg">
          City
        </Label>
        <Input
          id="city"
          value={localCity}
          onChange={(e) => setLocalCity(e.target.value)}
          className="col-span-3"
          autoComplete="off"
        />
        {suggestions.length > 1 && (
          <ul className=" absolute bottom-[-13rem] m-3 h-[16rem] w-11/12 list-none overflow-y-scroll rounded bg-gray-100 text-foreground shadow-xl dark:bg-card dark:text-primary">
            {suggestions.map(([cityName, cityCode], index) => (
              <li
                key={`${cityName}-${cityCode}-${index}`} // Updated key to ensure uniqueness
                onClick={() => handleSuggestionClick(cityName)}
                className="cursor-pointer p-2 hover:bg-gray-200"
              >
                {cityName}, {cityCode}
              </li>
            ))}
          </ul>
        )}
      </div>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
