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
    // const itineraryRef = await db.collection('itineraries').add(data);
    console.log(req.body);
    console.log(data);
    console.log('Itinerary created successfully');
    res.status(200).json({ message: 'Itinerary created successfully' });
  } catch (error) {
    console.error('Error creating itinerary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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