const express = require("express");
const router = express.Router();

// Import the Firebase Admin SDK instance
const admin = require('firebase-admin');

// Get a reference to the Firestore database
const db = admin.firestore();

// Define your route handler
router.post("/create", async (req, res) => {
  try {
    const { data } = req.body;
    console.log(data);

    if (!data || !data.event || !data.hotel || !data.restaurant) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Define a default imageURL
    const defaultImageURL = 'www.random.com';

    // Add restaurant to its collection and get the reference
    const restaurantRef = await db.collection('restaurants').add({
      name: data.restaurant,
      location: data.locationRestaurant,
      rating: parseFloat(data.ratingRestaurant),
      cuisine: data.cuisine || null, // Store null if cuisine is undefined
    });

    // Add hotel to its collection and get the reference
// Add hotel to its collection and get the reference
    const hotelRef = await db.collection('hotels').add({
      name: data.hotel,
      location: data.locationHotel,
      rating: parseFloat(data.ratingHotel),
      bookingURL: data.bookingURL,
      imageURL: data.imageURL,
    });

    // Handling a single event with a default imageURL if not provided
    const eventRef = await db.collection('events').add({
      name: data.event,
      location: data.locationEvent,
      rating: parseFloat(data.ratingEvent),
      typeOfActivity: data.typeOfActivity,
    });

    // Construct the itinerary object with references
    const itinerary = {
      events: [{
        eventID: db.doc(`/events/${eventRef.id}`),
        imageURL: defaultImageURL,
      }],
      hotel: {
        hotelID: db.doc(`/hotels/${hotelRef.id}`),
        imageURL: data.imageURL
      },
      locations: [data.locationEvent, data.locationHotel, data.locationRestaurant].filter((v, i, a) => a.indexOf(v) === i),
      restaurant: [{
        restaurantID: db.doc(`/restaurants/${restaurantRef.id}`),
        imageURL: defaultImageURL,
      }],
      price: parseFloat(data.price) || 3000,
      rating: parseFloat(data.rating) || 3,
    };

    // Add the itinerary to the 'itineraries' collection
    const itineraryRef = await db.collection('itineraries').add(itinerary);

    console.log('Itinerary created successfully with ID:', itineraryRef.id);
    res.status(201).json({ message: 'Itinerary created successfully', id: itineraryRef.id });
  } catch (error) {
    console.error('Error creating itinerary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




//  price: data.price, // Assuming price is part of the data
      //rating: parseFloat(data.rating), // Assuming rating is part of the data

router.get('/', async (req, res) => {
  try {
      const { location } = req.query;

      if (!location) {
          return res.status(400).json({ error: 'Location parameter is required' });
      }

      // Query itineraries that include the specified location
      const itinerariesSnapshot = await db.collection('itineraries').where('locations', 'array-contains', location).get();
      const itineraries = itinerariesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      res.json(itineraries);
      console.log(itineraries);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    
    // Fetch data from Firestore
    const itineraryRef = db.collection('itineraries').doc(id);
    const itinerarySnapshot = await itineraryRef.get();
    const itineraryData = itinerarySnapshot.data();
    
    // Replace hotel reference with actual hotel data
    if (itineraryData.hotel && itineraryData.hotel.hotelid) {
      const hotelRef = itineraryData.hotel.hotelid;
      const hotelSnapshot = await hotelRef.get();
      itineraryData.hotel = hotelSnapshot.data();
    }

    // Replace event references with actual event data
    if (itineraryData.event && itineraryData.event.length > 0) {
      const eventPromises = itineraryData.event.map(async (event) => {
        const eventRef = event.eventID;
        const eventSnapshot = await eventRef.get();
        return eventSnapshot.data();
      });
      itineraryData.event = await Promise.all(eventPromises);
    }

    // Replace restaurant references with actual restaurant data
    if (itineraryData.restaurant && itineraryData.restaurant.length > 0) {
      const restaurantPromises = itineraryData.restaurant.map(async (restaurant) => {
        const restaurantRef = restaurant.restaurantID;
        const restaurantSnapshot = await restaurantRef.get();
        return restaurantSnapshot.data();
      });
      itineraryData.restaurant = await Promise.all(restaurantPromises);
    }

    // Respond with the fetched itinerary data
    res.json(itineraryData);
    console.log('Itinerary data:', itineraryData);
  } catch (error) {
    console.error('Error fetching itinerary data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;