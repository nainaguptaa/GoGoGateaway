function generateUniqueId() {
  return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export const handleEventSubmit = async (
  eventState,
  itineraries,
  setItineraries,
  setIsDialogOpen,
  setEventState,
  editingItem,
  setEditingItem,
  toast,
) => {
  const requiredFields = [
    'time',
    'event',
    'ratingEvent',

    'locationEvent',
    'priceEvent',
  ];
  const missingFieldNames = requiredFields
    .filter((field) => !eventState[field])
    .map((field) => {
      // Map field names to a more user-friendly format if needed
      switch (field) {
        case 'time':
          return 'Time';
        case 'event':
          return 'Event Name';
        case 'ratingEvent':
          return 'Rating';

        case 'locationEvent':
          return 'Location';
        case 'priceEvent':
          return 'Price';
        default:
          return field.charAt(0).toUpperCase() + field.slice(1); // Capitalize the first letter
      }
    });

  // Check if there are any missing fields
  if (missingFieldNames.length > 0) {
    const missingFieldsMsg = missingFieldNames.join(', ');

    // Display custom error toast with specific missing fields
    toast({
      variant: 'destructive',
      title: 'Missing Information',
      description: `Please fill in the following fields: ${missingFieldsMsg}.`,
    });
    return; // Exit the function early
  }
  const updatedEventState = {
    ...eventState,
    typeOfActivity: eventState.typeOfActivity || 'sightseeing', // Default to 'sightseeing' if undefined
  };

  setItineraries((prevItineraries) => {
    let updatedEvents;
    let priceDifference = 0; // This will be used to adjust the totalPrice

    if (editingItem.id) {
      // Edit mode: update the existing event and calculate price difference
      updatedEvents = prevItineraries.events.map((event) => {
        console.log('calc', eventState.priceEvent, event.priceEvent);
        if (event.id === editingItem.id) {
          priceDifference =
            parseFloat(updatedEventState.priceEvent) -
            parseFloat(event.priceEvent);
          return { ...event, ...updatedEventState };
        }
        return event;
      });
    } else {
      // Add mode: append a new event and add its price to totalPrice
      const newEvent = { ...updatedEventState, id: generateUniqueId() };
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

export const handleRestaurantSubmit = async (
  resState,
  itineraries,
  setItineraries,
  setIsDialogOpen,
  setResState,
  editingItem,
  setEditingItem,
  toast,
) => {
  console.log('add restaunt');
  const requiredFields = [
    'time',
    'restaurant',
    'ratingRestaurant',
    'cuisine',
    'locationRestaurant',
    'priceRestaurant',
  ];

  const missingFieldNames = requiredFields
    .filter((field) => !resState[field])
    .map((field) => {
      // Customize this mapping as needed to make field names user-friendly
      switch (field) {
        case 'time':
          return 'Time';
        case 'restaurant':
          return 'Restaurant Name';
        case 'ratingRestaurant':
          return 'Rating';
        case 'cuisine':
          return 'Cuisine';
        case 'locationRestaurant':
          return 'Location';
        case 'priceRestaurant':
          return 'Price';
        default:
          return field.charAt(0).toUpperCase() + field.slice(1); // Capitalize the first letter
      }
    });

  if (missingFieldNames.length > 0) {
    const missingFieldsMsg = missingFieldNames.join(', ');
    toast({
      variant: 'destructive',
      title: 'Missing Information',
      description: `Please fill in the following fields: ${missingFieldsMsg}.`,
    });
    return; // Exit the function early if any required field is missing
  }
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

export const handleHotelSubmit = async (
  hotelState,
  itineraries,
  setItineraries,
  setIsDialogOpen,
  setHotelState,
  editingItem,
  setEditingItem,
  toast,
) => {
  const requiredFields = [
    'time',
    'hotel',
    'ratingHotel',
    'bookingURL',

    'locationHotel',
    'priceHotel',
  ];
  const missingFieldNames = requiredFields
    .filter((field) => !hotelState[field])
    .map((field) => {
      // Customize this mapping as needed to make field names user-friendly
      switch (field) {
        case 'time':
          return 'Time';
        case 'hotel':
          return 'Hotel Name';
        case 'ratingHotel':
          return 'Rating';
        case 'bookingURL':
          return 'Booking URL';

        case 'locationHotel':
          return 'Location';
        case 'priceHotel':
          return 'Price';
        default:
          return field.charAt(0).toUpperCase() + field.slice(1); // Capitalize the first letter
      }
    });

  if (missingFieldNames.length > 0) {
    const missingFieldsMsg = missingFieldNames.join(', ');
    toast({
      variant: 'destructive',
      title: 'Missing Information',
      description: `Please fill in the following fields: ${missingFieldsMsg}.`,
    });
    return; // Exit the function early if any required field is missing
  }
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

    locationHotel: '',
    priceHotel: 0,
  });
  setIsDialogOpen(false);
  setEditingItem({ id: null, type: null });
};
