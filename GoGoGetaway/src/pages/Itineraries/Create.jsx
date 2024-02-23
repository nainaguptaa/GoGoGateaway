import React, { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import Event from './Event';
import Hotel from './Hotel';
import Restaurant from './Restaurant';
// const Event = lazy(() => import('./Event'));
// const Hotel = lazy(() => import('./Hotel'));
// const Restaurant = lazy(() => import('./Restaurant'));
import { CiCirclePlus } from 'react-icons/ci';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { DatePickerDemo } from '@/components/ui/DatePicker';
import ChooseCity from './ChooseCity';
import ItineraryOverview from './ItineraryOverview';
import SearchableMap from '@/components/SearchableMap';
import { useUserContext } from '@/context/userContext';
import SignUpReminder from '@/components/SignUpReminder';
const Create = () => {
  const location = useLocation();
  const { currentUser, signPopup } = useUserContext();
  const [formData, setFormData] = useState({});
  const [editingIndex, setEditingIndex] = useState({ id: null, type: null });
  const [editingItem, setEditingItem] = useState({ id: null, type: null });
  const [popup, setPopup] = useState(false);
  // Define handleChange function
  const [eventState, setEventState] = useState({
    time: '',
    event: '',
    ratingEvent: '',
    typeOfActivity: 'sightseeing', // Assuming a default value
    locationEvent: '',
  });
  const [hotelState, setHotelState] = useState({
    time: '',
    hotel: '',
    ratingHotel: '',
    bookingURL: '',
    imageURL: '',
    locationHotel: '',
  });
  const [resState, setResState] = useState({
    time: '',
    restaurant: '',
    ratingRestaurant: '',
    cuisine: '',
    locationRestaurant: '',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [itineraries, setItineraries] = useState({
    city: '',
    name: '',
    date: new Date(),
    events: [],
    restaurant: [],
    hotel: null,
  });
  console.log(popup, signPopup);
  const saveItineraryToAPI = async () => {
    if (!currentUser) {
      console.log('not logged in');
      setPopup((prev) => !prev);
    }
    try {
      const response = await axios.post(
        'http://localhost:8080/itineraries/create',
        itineraries,
      );
      console.log('Success:', response.data);
      //   console.log('Itinerary saved successfully:', response.data);
      // Handle success scenario, e.g., showing a success message or updating state
    } catch (error) {
      console.error('Error posting itinerary:', error);
      // Handle error scenario, e.g., showing an error message
    }
  };
  //   useEffect(() => {
  //     const savedItineraries = sessionStorage.getItem('itineraries');
  //     if (savedItineraries) {
  //       setItineraries(JSON.parse(savedItineraries));
  //     }
  //   }, []);

  const handleChange = (type) => (e) => {
    const { name, value } = e.target;
    if (type === 'Event') {
      setEventState((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (type === 'Hotel') {
      setHotelState((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (type === 'Restaurant') {
      setResState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  // Submit handlers for events and restaurants
  const handleSubmit = (type, item) => () => {
    setItineraries((prev) => ({
      ...prev,
      [type]: [...prev[type], item],
    }));
    // Reset the specific form if necessary
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleAddItinerary = (category, details) => {
    if (category === 'Hotel' && itineraries.hotel) {
      alert('You can only add one hotel.');
      return;
    }

    setItineraries((prev) => {
      if (category === 'Hotel') {
        return { ...prev, hotel: details };
      } else {
        return {
          ...prev,
          [category]: [...prev[category], details],
        };
      }
    });
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    setItineraries((prevItineraries) => {
      let updatedEvents;
      if (editingItem.id) {
        // Edit mode: update the existing event
        updatedEvents = prevItineraries.events.map((event) =>
          event.id === editingItem.id ? { ...event, ...eventState } : event,
        );
      } else {
        // Add mode: append a new event
        updatedEvents = [
          ...prevItineraries.events,
          { ...eventState, id: generateUniqueId() },
        ];
      }
      const updatedItineraries = { ...prevItineraries, events: updatedEvents };
      sessionStorage.setItem('itineraries', JSON.stringify(updatedItineraries));
      return updatedItineraries;
    });
    setEventState({
      event: '',
      ratingEvent: '',
      typeOfActivity: 'sightseeing', // Assuming you want to reset to default value
      locationEvent: '',
    });
    setIsDialogOpen(false);
    setEditingItem({ id: null, type: null }); // Reset editing state
  };

  const handleHotelSubmit = (e) => {
    e.preventDefault();
    setItineraries((prevItineraries) => {
      // For hotel, since you can only have one, you directly replace it.
      // If you want to support editing, check if an `editingItem` is set.
      const updatedHotel =
        editingItem.id && editingItem.type === 'hotel'
          ? { ...hotelState, id: editingItem.id }
          : { ...hotelState, id: generateUniqueId() };

      const updatedItineraries = { ...prevItineraries, hotel: updatedHotel };
      sessionStorage.setItem('itineraries', JSON.stringify(updatedItineraries));
      return updatedItineraries;
    });
    setHotelState({
      hotel: '',
      ratingHotel: '',
      bookingURL: '',
      imageURL: '',
      locationHotel: '',
    });
    setIsDialogOpen(false);
    setEditingItem({ id: null, type: null }); // Reset editing state
  };

  const handleRestaurantSubmit = (e) => {
    e.preventDefault();
    setItineraries((prevItineraries) => {
      let updatedRestaurants;
      if (editingItem.id) {
        // Edit mode: update the existing restaurant
        updatedRestaurants = prevItineraries.restaurant.map((restaurant) =>
          restaurant.id === editingItem.id
            ? { ...restaurant, ...resState }
            : restaurant,
        );
      } else {
        // Add mode: append a new restaurant
        updatedRestaurants = [
          ...prevItineraries.restaurant,
          { ...resState, id: generateUniqueId() },
        ];
      }
      const updatedItineraries = {
        ...prevItineraries,
        restaurant: updatedRestaurants,
      };
      sessionStorage.setItem('itineraries', JSON.stringify(updatedItineraries));
      return updatedItineraries;
    });
    setResState({
      restaurant: '',
      ratingRestaurant: '',
      cuisine: '',
      locationRestaurant: '',
    });
    setIsDialogOpen(false);
    setEditingItem({ id: null, type: null }); // Reset editing state
  };

  const getSortedItineraries = () => {
    // Merge events and restaurants
    // console.log(itineraries);
    const items = [
      ...itineraries.events.map((e) => ({ ...e, category: 'Event' })),
      ...itineraries.restaurant.map((r) => ({ ...r, category: 'Restaurant' })),
    ];

    // Add hotel if exists
    if (itineraries.hotel) {
      items.push({ ...itineraries.hotel, category: 'Hotel' });
    }

    // Sort by time (assuming time is in a sortable format, e.g., 'HH:MM')
    return items.sort((a, b) => {
      const timeA = a.time || ''; // Handle undefined time
      const timeB = b.time || ''; // Handle undefined time
      return timeA.localeCompare(timeB);
    });
  };

  const [itineraryName, setItineraryName] = useState('');

  // Function to update state based on input changes
  const handleNameChange = (event) => {
    const newName = event.target.value;
    setItineraries((prevItineraries) => {
      const updatedItineraries = {
        ...prevItineraries,
        name: newName,
      };
      sessionStorage.setItem('itineraries', JSON.stringify(updatedItineraries));
      return updatedItineraries;
    });
  };

  // Handle changes to the itinerary date
  const handleDateChange = (date) => {
    setItineraries((prevItineraries) => {
      const updatedItineraries = {
        ...prevItineraries,
        date: date,
      };
      sessionStorage.setItem('itineraries', JSON.stringify(updatedItineraries));
      return updatedItineraries;
    });
  };
  const handleCityChange = (event) => {
    const newCity = event.target.value;
    setItineraries((prevItineraries) => {
      const updatedItineraries = {
        ...prevItineraries,
        city: newCity,
      };
      sessionStorage.setItem('itineraries', JSON.stringify(updatedItineraries));
      return updatedItineraries;
    });
  };
  const [isCityOpen, setIsCityOpen] = useState(false);
  useEffect(() => {
    // Consider auto-opening only based on navigation to `/create`, without auto-closing when city is selected

    if (!itineraries.city) {
      setIsCityOpen(true);
    } else {
      setIsCityOpen(false);
    }
    // Remove `itineraries.city` from dependencies to prevent auto-closing when it changes
  }, [itineraries.name]);
  const [openEditor, setOpenEditor] = useState(false);

  const handleEditItemClick = (item) => {
    setEditingItem({ id: item.id, type: item.category }); // Assuming 'category' field holds 'Event', 'Restaurant', or 'Hotel'

    if (item.category === 'Event') {
      setEventState({ ...item });
    } else if (item.category === 'Hotel') {
      setHotelState({ ...item });
    } else if (item.category === 'Restaurant') {
      setResState({ ...item });
    }

    setOpenEditor((prev) => !prev);
    setSelectedCategory(item.category);
    // setIsDialogOpen(true);
    // setSelectedCategory(item.category); // Make sure the dialog opens with the correct category selected
  };
  function generateUniqueId() {
    return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  const handleDeleteItem = (itemId, itemType) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this item?',
    );
    if (!isConfirmed) {
      return; // User cancelled the deletion
    }

    setItineraries((prevItineraries) => {
      let updatedList;
      let updatedItineraries = {};

      if (itemType === 'Event') {
        updatedList = prevItineraries.events.filter(
          (item) => item.id !== itemId,
        );
        updatedItineraries = { ...prevItineraries, events: updatedList };
      } else if (itemType === 'Restaurant') {
        updatedList = prevItineraries.restaurant.filter(
          (item) => item.id !== itemId,
        );
        updatedItineraries = { ...prevItineraries, restaurant: updatedList };
      } else if (itemType === 'Hotel') {
        // Assuming there can only be one hotel, setting it to null effectively "deletes" it
        updatedItineraries = { ...prevItineraries, hotel: null };
      } else {
        // If none of the types match, just return the previous state
        return prevItineraries;
      }

      // Now, save the updated itineraries back to session storage
      sessionStorage.setItem('itineraries', JSON.stringify(updatedItineraries));

      return updatedItineraries;
    });
  };
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Set the confirmation message
      event.preventDefault(); // Prevent the default browser behavior
      event.returnValue = ''; // Chrome requires returnValue to be set
    };

    // Add event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  //   console.log(selectedCategory);

  //   THIS IS THE API FUNCTIONM

  const toTitleCase = (text) => {
    return text
      .toLowerCase() // First, make the entire string lowercase.
      .split(' ') // Split the string into an array of words.
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word.
      .join(' '); // Join the words back into a single string.
  };
  const LoadingFallback = () => <div>Loading...</div>;

  return (
    <div className="flex h-screen overflow-scroll">
      {popup && <SignUpReminder className="" setPopup={setPopup} />}
      {/* <ForYouLeft /> */}
      <div className="  flex flex-grow flex-col gap-2  px-8 py-8">
        {/* <h1 className="text-3xl font-bold">Create Itinerary</h1> */}
        <div className="sticky flex items-center gap-4 border-b-2 bg-card p-3 ">
          <Input
            type="text"
            value={itineraries.name}
            onChange={handleNameChange}
            placeholder="My Itinerary"
            className="w-3/5"
          />
          <DatePickerDemo
            date={itineraries.date}
            setDate={handleDateChange}
            className="text-lg"
          />
          <Dialog open={isCityOpen} onOpenChange={setIsCityOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsCityOpen(true)}>Change City</Button>
            </DialogTrigger>
            <ChooseCity
              city={itineraries.city}
              setCity={handleCityChange}
              toTitleCase={toTitleCase}
            />
          </Dialog>
          <Button
            onClick={saveItineraryToAPI}
            className="rounded bg-blue-500 px-4 py-6 font-bold text-white hover:bg-blue-700"
          >
            Save Itinerary
          </Button>
        </div>
        <div className="flex pb-20">
          <div className="w-8/12 ">
            <div className="rounded-xl  border-2 bg-card px-5 py-6">
              <div className="text-4xl font-normal">
                {toTitleCase(itineraries.city)} Trip
              </div>
              <div className="ml-4 mt-3 flex-col text-lg font-semibold">
                Add To Your Itinerary
              </div>

              <div className="ml-7 mt-6 w-4/6">
                <ol className="relative  w-4/5 border-l border-neutral-300 dark:border-neutral-500">
                  {getSortedItineraries().map((item, index) => (
                    <>
                      <div
                        key={item.id || index}
                        className="ease flex cursor-pointer justify-between py-5 pr-4 transition duration-500 hover:bg-slate-100 dark:hover:bg-stone-600"
                        onClick={() => handleEditItemClick(item)}
                      >
                        {' '}
                        <li
                          key={index}
                          className="b 0 mb-3 flex  w-2/5 items-center gap-6"
                        >
                          <div className="flex items-center  pt-3">
                            <div className="-ml-[12px] mr-3 h-[22px] w-[22px] rounded-full bg-neutral-300 dark:bg-neutral-500"></div>

                            <p className="b text-neutral-500 dark:text-neutral-300 md:text-lg">
                              {item.time}
                            </p>
                          </div>
                          <div className="flex flex-col justify-center ">
                            <h4 className=" text-xl font-semibold">
                              {item.event || item.hotel || item.restaurant}
                            </h4>
                            <p className=" text-neutral-500 dark:text-neutral-300">
                              {item.category}
                              {/* You can add more item-specific details here */}
                            </p>
                          </div>
                        </li>
                        {editingItem.id === item.id && (
                          <div className="ml-9 flex items-center justify-center gap-2 text-lg">
                            <Button
                              onClick={() => {
                                //   setOpenEditor((prev) => !prev);
                                //   setEditingItem(null);

                                console.log(selectedCategory);
                                setIsDialogOpen(true);
                              }}
                              className="bg-green-400"
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() =>
                                handleDeleteItem(item.id, item.category)
                              }
                              className="bg-red-400"
                            >
                              Delete
                            </Button>
                          </div>
                        )}
                      </div>
                    </>
                  ))}
                </ol>
                <div className="-ml-[1rem] flex w-1/4 items-center justify-between ">
                  <div className="flex items-center gap-2 text-xl">
                    <Dialog
                      open={isDialogOpen}
                      onOpenChange={setIsDialogOpen}
                      // isOpen={isDialogOpen}
                      // onDismiss={() => setIsDialogOpen(false)}
                    >
                      <DialogTrigger asChild>
                        <button
                          variant="outline"
                          //   className="bg-red-400"
                          onClick={() => {
                            setIsDialogOpen(true);

                            setEventState('');
                            setResState('');
                            setHotelState('');
                            setEditingItem({ id: null, type: null });
                          }}
                        >
                          <CiCirclePlus size={40} className="cursor-pointer" />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={handleAddItinerary}>
                          {selectedCategory == 'Event' && (
                            <>
                              <DialogHeader>
                                <DialogTitle>
                                  {editingItem.id ? 'Edit' : ' Add event'}
                                </DialogTitle>
                                <DialogDescription>
                                  Add event to your itinerary
                                </DialogDescription>
                              </DialogHeader>
                              <Event
                                handleChange={handleChange('Event')}
                                eventState={eventState}
                                setEventState={setEventState}
                              />
                              <Button onClick={handleEventSubmit}>
                                {editingItem.id ? 'Edit' : ' Add To Itinerary'}
                              </Button>
                            </>
                          )}
                          {selectedCategory == 'Restaurant' && (
                            <>
                              <DialogHeader>
                                <DialogTitle>
                                  {editingItem.id ? 'Edit' : ' Add Restaurant'}
                                </DialogTitle>
                                <DialogDescription>
                                  Add Restaurant to your itinerary
                                </DialogDescription>
                              </DialogHeader>
                              <Restaurant
                                handleChange={handleChange('Restaurant')}
                                resState={resState}
                                setResState={setResState}
                              ></Restaurant>
                              <Button onClick={handleRestaurantSubmit}>
                                {editingItem.id ? 'Edit' : ' Add To Itinerary'}
                              </Button>
                            </>
                          )}

                          {selectedCategory == 'Hotel' && (
                            <>
                              <DialogHeader>
                                <DialogTitle>
                                  {editingItem.id ? 'Edit' : ' Add Hotel'}
                                </DialogTitle>
                                <DialogDescription>
                                  Add Hotel to your itinerary
                                </DialogDescription>
                              </DialogHeader>
                              <Hotel
                                handleChange={handleChange('Hotel')}
                                hotelState={hotelState}
                                setHotelState={setHotelState}
                              ></Hotel>
                              <Button onClick={handleHotelSubmit}>
                                {editingItem.id ? 'Edit' : ' Add To Itinerary'}
                              </Button>
                            </>
                          )}
                        </form>
                      </DialogContent>
                    </Dialog>

                    <Select
                      value={selectedCategory} // Control the selected value
                      onValueChange={handleCategoryChange} // Handle changes
                    >
                      {' '}
                      {/* Ensure your Select component can accept and handle an `onChange` prop */}
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          <SelectItem value="Event">Event</SelectItem>
                          <SelectItem value="Restaurant">Restaurant</SelectItem>
                          <SelectItem value="Hotel">Hotel</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <ItineraryOverview itineraries={itineraries} />
          </div>
          <div className="flex grow flex-col items-center  gap-10   text-lg">
            <div className="w-[30rem] overflow-hidden rounded-xl border-2 bg-card shadow-sm">
              {' '}
              <SearchableMap searchAddress={itineraries.city} loading="lazy" />
              <div className="p-5 text-xl font-semibold">
                {toTitleCase(itineraries.city)}
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
    </div>
  );
};

export default Create;
