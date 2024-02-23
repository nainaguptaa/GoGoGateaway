import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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
    priceEvent: 0,
  });
  const [hotelState, setHotelState] = useState({
    time: '',
    hotel: '',
    ratingHotel: '',
    bookingURL: '',
    imageURL: '',
    locationHotel: '',
    priceHotel: 0,
  });
  const [resState, setResState] = useState({
    time: '',
    restaurant: '',
    ratingRestaurant: '',
    cuisine: '',
    locationRestaurant: '',
    priceRestaurant: 0,
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
    totalPrice: 0,
  });
  // After each add/update operation, call this function to update the totalPrice

  const saveItineraryToAPI = async () => {
    console.log(itineraries);
    if (!currentUser) {
      console.log('not logged in');
      setPopup((prev) => !prev);
    }
    // Calculate the total price from events, restaurants, and the hotel
    const totalEventsPrice = itineraries.events.reduce(
      (acc, curr) => acc + parseFloat(curr.priceEvent || 0),
      0,
    );
    const totalRestaurantsPrice = itineraries.restaurant.reduce(
      (acc, curr) => acc + parseFloat(curr.priceRestaurant || 0),
      0,
    );
    const hotelPrice = parseFloat(itineraries.hotel?.priceHotel || 0); // Optional chaining in case hotel is null

    // Sum up all the prices
    const totalPrice = totalEventsPrice + totalRestaurantsPrice + hotelPrice;

    // Include the totalPrice in the itineraries object
    const itineraryData = {
      ...itineraries,
      userId: currentUser.id, // Add the currentUser.id
      totalPrice, // Update the totalPrice with the calculated value
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/itineraries/create',
        itineraryData,
      );
      console.log('Success:', response.data);
      navigate('/my-trips');
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
      let priceDifference = 0; // This will be used to adjust the totalPrice

      if (editingItem.id) {
        // Edit mode: update the existing event and calculate price difference
        updatedEvents = prevItineraries.events.map((event) => {
          console.log('calc', eventState.priceEvent, event.priceEvent);
          if (event.id === editingItem.id) {
            priceDifference =
              parseFloat(eventState.priceEvent) - parseFloat(event.priceEvent);
            return { ...event, ...eventState };
          }
          return event;
        });
      } else {
        // Add mode: append a new event and add its price to totalPrice
        const newEvent = { ...eventState, id: generateUniqueId() };
        updatedEvents = [...prevItineraries.events, newEvent];
        priceDifference = parseFloat(newEvent.priceEvent); // Assuming newEvent.price exists
      }
      console.log('price difference', priceDifference);
      // Ensure the price difference is a number; if not, set it to 0
      if (isNaN(priceDifference)) priceDifference = 0;

      const updatedTotalPrice = prevItineraries.totalPrice + priceDifference;

      const updatedItineraries = {
        ...prevItineraries,
        events: updatedEvents,
        totalPrice: updatedTotalPrice,
      };
      sessionStorage.setItem('itineraries', JSON.stringify(updatedItineraries));
      return updatedItineraries;
    });

    // Assuming you have a function to reset the event state and other states as before
    setEventState({
      event: '',
      ratingEvent: '',
      typeOfActivity: 'sightseeing', // Assuming you want to reset to default value
      locationEvent: '',
      price: 0, // Reset price or ensure it's correctly reset elsewhere
    });
    setIsDialogOpen(false);
    setEditingItem({ id: null, type: null }); // Reset editing state
  };

  const handleHotelSubmit = (e) => {
    e.preventDefault();
    console.log(editingItem);
    setItineraries((prevItineraries) => {
      let priceDifference = 0;

      const isEditingHotel = editingItem.id && editingItem.type === 'Hotel';
      const oldPrice = isEditingHotel
        ? parseFloat(prevItineraries.hotel?.priceHotel || 0)
        : 0;
      const newPrice = parseFloat(hotelState.priceHotel);
      console.log(isEditingHotel);
      console.log(oldPrice);
      priceDifference = newPrice - oldPrice;

      if (isNaN(priceDifference)) priceDifference = 0;

      const updatedHotel = {
        ...hotelState,
        id: isEditingHotel ? editingItem.id : generateUniqueId(),
      };

      const updatedTotalPrice = prevItineraries.totalPrice + priceDifference;

      const updatedItineraries = {
        ...prevItineraries,
        hotel: updatedHotel,
        totalPrice: updatedTotalPrice,
      };

      sessionStorage.setItem('itineraries', JSON.stringify(updatedItineraries));
      return updatedItineraries;
    });

    setHotelState({
      hotel: '',
      ratingHotel: '',
      bookingURL: '',
      imageURL: '',
      locationHotel: '',
      priceHotel: 0,
    });
    setIsDialogOpen(false);
    setEditingItem({ id: null, type: null });
  };

  const handleRestaurantSubmit = (e) => {
    e.preventDefault();

    setItineraries((prevItineraries) => {
      let updatedRestaurants;
      let priceDifference = 0; // This will be used to adjust the totalPrice

      if (editingItem.id) {
        // Edit mode: update the existing event and calculate price difference
        updatedRestaurants = prevItineraries.restaurant.map((restaurant) => {
          if (restaurant.id === editingItem.id) {
            priceDifference =
              parseFloat(resState.priceRestaurant) -
              parseFloat(restaurant.priceRestaurant);
            return { ...restaurant, ...resState };
          }
          return restaurant;
        });
      } else {
        // Add mode: append a new event and add its price to totalPrice
        const newRestaurant = { ...resState, id: generateUniqueId() };
        updatedRestaurants = [...prevItineraries.restaurant, newRestaurant];
        priceDifference = parseFloat(newRestaurant.priceRestaurant); // Assuming newEvent.price exists
      }
      if (isNaN(priceDifference)) priceDifference = 0;
      const updatedTotalPrice = prevItineraries.totalPrice + priceDifference;

      const updatedItineraries = {
        ...prevItineraries,
        restaurant: updatedRestaurants,
        totalPrice: updatedTotalPrice,
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
      let priceToDeduct = 0;
      let updatedItineraries = {};

      if (itemType === 'Event') {
        const item = prevItineraries.events.find((item) => item.id === itemId);
        priceToDeduct = parseFloat(item?.priceEvent || 0);
        updatedList = prevItineraries.events.filter(
          (item) => item.id !== itemId,
        );
        updatedItineraries = { ...prevItineraries, events: updatedList };
      } else if (itemType === 'Restaurant') {
        const item = prevItineraries.restaurant.find(
          (item) => item.id === itemId,
        );
        priceToDeduct = parseFloat(item?.priceRestaurant || 0);
        updatedList = prevItineraries.restaurant.filter(
          (item) => item.id !== itemId,
        );
        updatedItineraries = { ...prevItineraries, restaurant: updatedList };
      } else if (itemType === 'Hotel') {
        // Assuming there can only be one hotel, setting it to null effectively "deletes" it
        priceToDeduct = parseFloat(prevItineraries.hotel?.priceHotel || 0);
        updatedItineraries = { ...prevItineraries, hotel: null };
      } else {
        // If none of the types match, just return the previous state
        return prevItineraries;
      }

      // Update the totalPrice by subtracting the price of the deleted item
      const updatedTotalPrice = prevItineraries.totalPrice - priceToDeduct;

      // Ensure the total price doesn't go below zero
      updatedItineraries.totalPrice = Math.max(0, updatedTotalPrice);

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
                Add To Your Itinerary -- {itineraries.totalPrice}
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
