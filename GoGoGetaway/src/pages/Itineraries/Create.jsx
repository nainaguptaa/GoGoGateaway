import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Event from './Event';
import Hotel from './Hotel';
import Restaurant from './Restaurant';
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
import { Label } from '@/components/ui/label';
import ForYouLeft from '../ForYou/ForYouLeft';
import { DatePickerDemo } from '@/components/ui/DatePicker';
import ChooseCity from './ChooseCity';

const Create = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({});
  const [editingIndex, setEditingIndex] = useState({ id: null, type: null });
  const [editingItem, setEditingItem] = useState({ id: null, type: null });
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
  useEffect(() => {
    const savedItineraries = sessionStorage.getItem('itineraries');
    if (savedItineraries) {
      setItineraries(JSON.parse(savedItineraries));
    }
  }, []);
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

  //   const handleEventSubmit = (e) => {
  //     e.preventDefault();
  //     setItineraries((prevItineraries) => {
  //       let updatedEvents = [...prevItineraries.events];
  //       if (editingIndex !== null) {
  //         console.log('editing');
  //         // Update existing item
  //         updatedEvents[editingIndex] = eventState;
  //       } else {
  //         // Add new ite
  //         console.log('addingh');
  //         console.log(eventState);
  //         updatedEvents.push(eventState);
  //       }
  //       const updatedItineraries = { ...prevItineraries, events: updatedEvents };
  //       sessionStorage.setItem('itineraries', JSON.stringify(updatedItineraries));
  //       //   return { ...prevItineraries, events: updatedEvents };
  //       return updatedItineraries;
  //     });
  //     // Reset state
  //     setEventState({
  //       event: '',
  //       ratingEvent: '',
  //       typeOfActivity: 'sightseeing', // Assuming you want to reset to default value
  //       locationEvent: '',
  //     });
  //     setIsDialogOpen(false);
  //     setEditingIndex(null); // Reset editing index
  //   };
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
  //   const handleEditItemClick = (index) => {
  //     console.log(index);
  //     const item = getSortedItineraries()[index];
  //     console.log(item);
  //     if (item.category === 'event') {
  //       setEventState({ ...item });
  //     } else if (item.category === 'hotel') {
  //       setHotelState({ ...item });
  //     } else if (item.category === 'restaurant') {
  //       setResState({ ...item });
  //     }

  //     setOpenEditor(true);
  //     // setSelectedCategory(item.category);
  //     // setIsDialogOpen(true);

  //     setEditingIndex(index); // Store the index of the item being edited
  //   };
  console.log(selectedCategory);
  const handleEditItemClick = (item) => {
    console.log(item);
    setEditingItem({ id: item.id, type: item.category }); // Assuming 'category' field holds 'Event', 'Restaurant', or 'Hotel'
    console.log(editingItem);
    if (item.category === 'Event') {
      setEventState({ ...item });
    } else if (item.category === 'Hotel') {
      setHotelState({ ...item });
    } else if (item.category === 'Restaurant') {
      setResState({ ...item });
    }

    setOpenEditor((prev) => !prev);
    setSelectedCategory(item.category);
    console.log(1, selectedCategory);
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
  return (
    <div className="bg-background flex h-screen overflow-scroll">
      {/* <ForYouLeft /> */}
      <div className="bg-card  flex flex-grow flex-col gap-2  px-8 py-8">
        {/* <h1 className="text-3xl font-bold">Create Itinerary</h1> */}
        <div className=" b flex items-center gap-4 border-b-2 pb-4 ">
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
            <ChooseCity city={itineraries.city} setCity={handleCityChange} />
          </Dialog>
        </div>
        <div className=" flex flex-row ">
          <div className="w-11/12">
            <div className="ml-4 mt-3 flex-col text-lg font-semibold">
              Add To Your Itinerary
            </div>

            <div className="ml-5 mt-6 ">
              <ol className="relative  border-l border-neutral-300 dark:border-neutral-500">
                {getSortedItineraries().map((item, index) => (
                  <>
                    <div
                      key={item.id || index}
                      className="ease flex cursor-pointer transition duration-500 hover:bg-zinc-200 dark:hover:bg-stone-600"
                    >
                      {' '}
                      <li
                        key={index}
                        className="b mb-3 flex items-center  gap-4"
                        onClick={() => handleEditItemClick(item)}
                      >
                        <div className="flex items-center  pt-3">
                          <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500"></div>

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
              <div className="flex w-1/4 items-center justify-between ">
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
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when
                          you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddItinerary}>
                        {selectedCategory == 'Event' && (
                          <>
                            asdfasdf event
                            <Event
                              handleChange={handleChange('Event')}
                              eventState={eventState}
                              setEventState={setEventState}
                            />
                            <button onClick={handleEventSubmit}>
                              Add Event
                            </button>
                          </>
                        )}
                        {selectedCategory == 'Restaurant' && (
                          <>
                            RESTAN{' '}
                            <Restaurant
                              handleChange={handleChange('Restaurant')}
                              resState={resState}
                              setResState={setResState}
                            ></Restaurant>
                            <button onClick={handleRestaurantSubmit}>
                              Add Restaurant
                            </button>
                          </>
                        )}

                        {selectedCategory == 'Hotel' && (
                          <>
                            <Hotel
                              handleChange={handleChange('Hotel')}
                              hotelState={hotelState}
                              setHotelState={setHotelState}
                            ></Hotel>
                            <button onClick={handleHotelSubmit}>
                              Add Hotel
                            </button>
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
              <div className="mt-96">Events List</div>
              <div className="text-lg">{itineraries.city}</div>
              <div className="text-lg">{itineraries.name}</div>
              <div>
                <h2 className="text-2xl font-semibold">Events</h2>
                <div className="flex gap-2">
                  {' '}
                  {itineraries.events.length > 0 ? (
                    itineraries.events.map((event, index) => (
                      <div
                        key={index}
                        className="rounded-xl border-2 p-3 shadow-md"
                      >
                        <p className="flex gap-2">
                          <strong>Time:</strong>{' '}
                          <div className="text-normal">{event.time}</div>
                        </p>
                        <p>
                          <strong>Event:</strong> {event.event}
                        </p>
                        <p>
                          <strong>Rating:</strong> {event.ratingEvent}
                        </p>
                        <p>
                          <strong>Type of Activity:</strong>{' '}
                          {event.typeOfActivity}
                        </p>
                        <p>
                          <strong>Location:</strong> {event.locationEvent}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No events added.</p>
                  )}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Hotel</h2>
                {itineraries.hotel ? (
                  <div className="rounded-xl border-2 p-3 shadow-md">
                    <p>
                      <strong>Hotel:</strong> {itineraries.hotel.hotel}
                    </p>
                    <p>
                      <strong>Rating:</strong> {itineraries.hotel.ratingHotel}
                    </p>
                    <p>
                      <strong>Booking URL:</strong>{' '}
                      <a
                        href={itineraries.hotel.bookingURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {itineraries.hotel.bookingURL}
                      </a>
                    </p>
                    <p>
                      <strong>Image URL:</strong>{' '}
                      <a
                        href={itineraries.hotel.imageURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {itineraries.hotel.imageURL}
                      </a>
                    </p>
                    <p>
                      <strong>Location:</strong>{' '}
                      {itineraries.hotel.locationHotel}
                    </p>
                  </div>
                ) : (
                  <p>No hotel added.</p>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Restaurants</h2>
                <div className="flex gap-2">
                  {' '}
                  {itineraries.restaurant.length > 0 ? (
                    itineraries.restaurant.map((restaurant, index) => (
                      <div
                        key={index}
                        className="rounded-xl border-2 p-3 shadow-md"
                      >
                        <p>
                          <strong>Restaurant:</strong> {restaurant.restaurant}
                        </p>
                        <p>
                          <strong>Rating:</strong> {restaurant.ratingRestaurant}
                        </p>
                        <p>
                          <strong>Cuisine:</strong> {restaurant.cuisine}
                        </p>
                        <p>
                          <strong>Location:</strong>{' '}
                          {restaurant.locationRestaurant}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No restaurants added.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="0 flex grow justify-center">
            {' '}
            <div className="text-3xl font-semibold">
              {itineraries.city} Trip
            </div>
          </div>
        </div>
      </div>{' '}
    </div>
  );
};

export default Create;
