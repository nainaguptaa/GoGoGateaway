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

    
      const [hotelsSnapshot, restaurantsSnapshot, eventsSnapshot] = await Promise.all([
          db.collection('hotels').where('location', '==', location).get(),
          db.collection('restaurants').where('location', '==', location).get(),
          db.collection('events').where('location', '==', location).get(),
      ]);


      const hotels = hotelsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Hotels:', hotels);
      const restaurants = restaurantsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Restuarants', restaurants);
      const events = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('events', events);


      const itinerariesSnapshot = await db.collection('itineraries').get();
      const itineraries = [];

      itinerariesSnapshot.forEach(doc => {
          const data = doc.data();

        
          if ((data.hotelId && hotels.some(hotel => hotel.id === data.hotelId)) || 
              (data.restaurantIds && restaurants.some(restaurant => data.restaurantIds.includes(restaurant.id))) || 
              (data.eventId && events.some(event => event.id === data.eventId))) {
              
         
              const itineraryHotels = data.hotelId ? hotels.filter(hotel => hotel.id === data.hotelId) : [];
              const itineraryRestaurants = data.restaurantIds ? restaurants.filter(restaurant => data.restaurantIds.includes(restaurant.id)) : [];
              const itineraryEvents = data.eventId ? events.filter(event => event.id === data.eventId) : [];

              itineraries.push({ 
                  id: doc.id, 
                  ...data,
                  hotels: itineraryHotels,
                  restaurants: itineraryRestaurants,
                  events: itineraryEvents
              });
          }
      });

      res.json(itineraries);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // Fetch data from Firestore
    const itinerary = await db.collection('itineraries').doc(id).get();
    const itineraryData = itinerary.data();

    // Respond with the fetched itinerary data
    res.json(itineraryData);
  } catch (error) {
    console.error('Error fetching itinerary data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
);

module.exports = router;