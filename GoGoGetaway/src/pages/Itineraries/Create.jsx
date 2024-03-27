import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Event from './Event';
import Hotel from './Hotel';
import Restaurant from './Restaurant';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import {
  handleEventSubmit,
  handleRestaurantSubmit,
  handleHotelSubmit,
} from '@/helpers/submitCreateHandlers';
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
import Footer from '@/components/Footer';
const Create = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, signPopup } = useUserContext();
  const [formData, setFormData] = useState({});
  const [editingIndex, setEditingIndex] = useState({ id: null, type: null });
  const [editingItem, setEditingItem] = useState({ id: null, type: null });
  const [popup, setPopup] = useState(false);
  const { toast } = useToast();
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

    locationHotel: '',
    priceHotel: 0,
  });
  const [resState, setResState] = useState({
    time: '',
    restaurant: '',
    ratingRestaurant: '',
    cuisine: 'Italian',
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
    images: [],
  });
  const apiURL = import.meta.env.VITE_API_URL;
  // After each add/update operation, call this function to update the totalPrice
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false); // New state to track drag status

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true); // Set is dragging state to true
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false); // Set is dragging state to false
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false); // Reset drag status
    const files = e.dataTransfer.files; // Access files
    if (files && files.length > 0) {
      setSelectedImages([...files]); // Update state with dropped files
    }
  };
  const handleFileChange = (event) => {
    setSelectedImages([...event.target.files]);
  };
  const saveItineraryToAPI = async () => {
    console.log(itineraries);
    if (!currentUser) {
      console.log('not logged in');
      setPopup((prev) => !prev);
      return; // Exit the function if not logged in
    }

    const requiredFields = [
      'city',
      'name',
      'date',
      // Assuming events, restaurants, and hotel information are also required, adjust as needed
      'events',
      'restaurant',
      'hotel',
    ];

    const missingFieldNames = requiredFields
      .filter(
        (field) =>
          !itineraries[field] ||
          (Array.isArray(itineraries[field]) &&
            itineraries[field].length === 0),
      )
      .map((field) => {
        // Map field names to a more user-friendly format
        switch (field) {
          case 'city':
            return 'City';
          case 'name':
            return 'Itinerary Name';
          case 'date':
            return 'Date';
          case 'events':
            return 'Events';
          case 'restaurant':
            return 'Restaurants';
          case 'hotel':
            return 'Hotel';
          default:
            return field.charAt(0).toUpperCase() + field.slice(1); // Capitalize the first letter
        }
      });
    if (selectedImages.length === 0) {
      missingFieldNames.push('Selected Images');
    }
    // Check if there are any missing fields and notify the user
    if (missingFieldNames.length > 0) {
      const missingFieldsMsg = missingFieldNames.join(', ');

      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: `Please fill in the following fields: ${missingFieldsMsg}.`,
      });
      return; // Exit the function early if there are missing fields
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
    const hotelPrice = parseFloat(itineraries.hotel?.priceHotel || 0);

    const totalPrice = totalEventsPrice + totalRestaurantsPrice + hotelPrice;

    const uploadImages = async () => {
      const formData = new FormData();
      selectedImages.forEach((image) => {
        formData.append('files', image);
      });

      try {
        console.log('all image uplaod(');
        const response = await axios.post(
          `${apiURL}/cloudinaryUpload/image`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        return response.data.results.map((result) => result.url); // Return an array of image URLs
      } catch (error) {
        console.error('Upload error', error);
        throw new Error('Failed to upload images');
      }
    };
    try {
      // Upload images first and wait for the URLs
      const imageUrls = await uploadImages();
      // Append image URLs to the itinerary data
      const itineraryDataWithImages = {
        ...itineraries,
        images: imageUrls, // Add the image URLs to the itinerary data
        userId: currentUser.id,
        photoURL: currentUser.photoURL,
        totalPrice, // Assume this function calculates the total price
      };

      // Then, submit the complete itinerary data including image URLs
      const response = await axios.post(
        `${apiURL}/itineraries/create`,
        itineraryDataWithImages,
      );
      console.log('Itinerary saved successfully:', response.data);
      navigate('/foryou');
      sessionStorage.removeItem('itineraries');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (type) => (e) => {
    const { name, value } = e.target;
    let roundedTime = roundTimeToNearestFive(value); // Round time to nearest multiple of five
    if (type === 'Event') {
      setEventState((prev) => ({
        ...prev,
        [name]: roundedTime,
      }));
    } else if (type === 'Hotel') {
      setHotelState((prev) => ({
        ...prev,
        [name]: roundedTime,
      }));
    } else if (type === 'Restaurant') {
      setResState((prev) => ({
        ...prev,
        [name]: roundedTime,
      }));
    }
  };
  const roundTimeToNearestFive = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const roundedMinutes = Math.round(minutes / 5) * 5; // Round minutes to nearest multiple of five
    const roundedHours = hours + Math.floor(roundedMinutes / 60);
    const formattedHours = String(roundedHours).padStart(2, '0');
    const formattedMinutes = String(roundedMinutes % 60).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
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

  const eventSubmit = (e) => {
    e.preventDefault();
    handleEventSubmit(
      eventState,
      itineraries,
      setItineraries,
      setIsDialogOpen,
      setEventState,
      editingItem,
      setEditingItem,
      toast,
    );
  };

  const restaurantSubmit = (e) => {
    e.preventDefault();
    handleRestaurantSubmit(
      resState,
      itineraries,
      setItineraries,
      setIsDialogOpen,
      setResState,
      editingItem,
      setEditingItem,
      toast,
    );
  };
  const hotelSubmit = (e) => {
    e.preventDefault();
    handleHotelSubmit(
      hotelState,
      itineraries,
      setItineraries,
      setIsDialogOpen,
      setHotelState,
      editingItem,
      setEditingItem,
      toast,
    );
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
  const handleUploadSuccess = (imageUrls) => {
    setItineraries((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...imageUrls], // Append new image URLs to the existing array
    }));
  };
  return (
    <div className="top-[20rem] flex h-screen flex-col">
      {popup && <SignUpReminder className="" setPopup={setPopup} />}
      {/* <ForYouLeft /> */}
      <div className=" flex h-[200rem] flex-grow flex-col gap-2     ">
        {/* <h1 className="text-3xl font-bold">Create Itinerary</h1> */}
        <div className="h-[15rem]top-0 sticky flex flex-col items-center gap-2 border-b-2 bg-card p-3 ">
          <div className="w-full pt-[1rem] text-xl font-semibold sm:text-3xl">
            {itineraries.city}
          </div>
          <div className="flex w-full flex-col gap-2 sm:flex-row  sm:items-end">
            <div className="flex w-full flex-row gap-2 sm:w-2/3 ">
              {' '}
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
            </div>
            <div className="flex flex-col justify-between gap-3 sm:flex-row">
              {' '}
              <Dialog open={isCityOpen} onOpenChange={setIsCityOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="w-full"
                    onClick={() => setIsCityOpen(true)}
                  >
                    Change City
                  </Button>
                </DialogTrigger>
                <ChooseCity
                  city={itineraries.city}
                  setCity={handleCityChange}
                  toTitleCase={toTitleCase}
                />
              </Dialog>
              <Button
                onClick={saveItineraryToAPI}
                className="btn-fill w-full bg-amber-500  font-bold text-white hover:bg-blue-700"
              >
                Save Itinerary
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse px-2 pb-64   sm:px-8 lg:flex-row">
          <div className="w-full sm:w-9/12 ">
            <div className="border-2  bg-card px-5 py-6 sm:rounded-xl">
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
                              <Button onClick={eventSubmit}>
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
                              <Button onClick={restaurantSubmit}>
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
                              <Button onClick={hotelSubmit}>
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
              <div className="mt-5 text-lg font-semibold">Upload Images</div>
              <div
                className={`mt-4 rounded-lg border-2 ${
                  isDragging
                    ? 'border-blue-500 bg-blue-100'
                    : 'border-dashed border-gray-300'
                } px-4 py-3 shadow-sm`}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <label class="block h-full w-full cursor-pointer">
                  <input
                    type="file"
                    multiple
                    class="hidden"
                    onChange={handleFileChange}
                  />
                  <div class="flex h-full flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-8 w-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
                      />
                    </svg>
                    <p class="mt-1 text-sm text-gray-600">
                      Drag and drop files here, or click to select files
                    </p>
                    {selectedImages.length > 0 && (
                      <p class="mt-2 text-sm font-semibold text-cyan-500">
                        {selectedImages.length} file
                        {selectedImages.length > 1 ? 's' : ''} selected
                      </p>
                    )}
                  </div>
                </label>
              </div>
            </div>
            <ItineraryOverview itineraries={itineraries} />
          </div>
          <div className="flex w-full grow flex-col  items-center  gap-10 text-lg">
            <div className=" mb-4 w-full overflow-hidden bg-card shadow-sm sm:rounded-xl sm:border-2">
              {' '}
              <SearchableMap
                className="h-[4rem]"
                searchAddress={itineraries.city}
                loading="lazy"
              />
              <div className="p-5 text-xl font-semibold">
                {toTitleCase(itineraries.city)}
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>{' '}
    </div>
  );
};

export default Create;
