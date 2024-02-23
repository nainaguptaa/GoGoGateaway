const express = require("express");
const router = express.Router();

// Import the Firebase Admin SDK instance
const admin = require("firebase-admin");

// Get a reference to the Firestore database
const db = admin.firestore();

// Define your route handler
router.post("/create", async (req, res) => {
  try {
    const data = req.body; // Adjusted for clarity
    console.log(data);

    // Check for required fields more thoroughly
    if (!data || !data.events || !data.restaurant || !data.hotel) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Define a default imageURL
    const defaultImageURL = "www.random.com";

    // Process and add each event
    const eventPromises = data.events.map((event) =>
      db
        .collection("events")
        .doc(event.id)
        .set({
          ...event,
          ratingEvent: parseFloat(event.ratingEvent),
          imageURL: event.imageURL || defaultImageURL,
        })
    );

    // Process and add each restaurant
    const restaurantPromises = data.restaurant.map((restaurant) =>
      db
        .collection("restaurants")
        .doc(restaurant.id)
        .set({
          ...restaurant,
          ratingRestaurant: parseFloat(restaurant.ratingRestaurant),
        })
    );

    // Add the hotel
    const hotelId = data.hotel.id;
    await db
      .collection("hotels")
      .doc(hotelId)
      .set({
        ...data.hotel,
        ratingHotel: parseFloat(data.hotel.ratingHotel),
        imageURL: data.hotel.imageURL || defaultImageURL,
      });

    // Wait for all events and restaurants to be added
    await Promise.all([...eventPromises, ...restaurantPromises]);

    // Construct the itinerary object
    const itinerary = {
      userId: data.userId,
      likeCount: 0,
      commentCount: 0,
      name: data.name,
      city: data.city,
      date: data.date,
      events: data.events.map((event) => ({
        eventID: db.doc(`/events/${event.id}`),
        imageURL: event.imageURL || defaultImageURL,
      })),
      restaurants: data.restaurant.map((restaurant) => ({
        restaurantID: db.doc(`/restaurants/${restaurant.id}`),
        imageURL: defaultImageURL, // Assuming a default image for restaurants
      })),
      hotel: {
        hotelID: db.doc(`/hotels/${hotelId}`),
        imageURL: data.hotel.imageURL || defaultImageURL,
      },
      totalPrice: data.totalPrice,
    };
    console.log(itinerary);
    // Add the itinerary to the 'itineraries' collection
    const itineraryRef = await db.collection("itineraries").add(itinerary);

    console.log("Itinerary created successfully with ID:", itineraryRef.id);
    res
      .status(201)
      .json({ message: "Itinerary created successfully", id: itineraryRef.id });
  } catch (error) {
    console.error("Error creating itinerary:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  price: data.price, // Assuming price is part of the data
//rating: parseFloat(data.rating), // Assuming rating is part of the data
router.get("/all", async (req, res) => {
  try {
    const itinerariesSnapshot = await db.collection("itineraries").get();
    const itineraries = itinerariesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("\n\n", itineraries);
    res.status(200).json(itineraries);
  } catch (error) {
    console.error("Error fetching all itineraries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Increment the like count for a specific itinerary
router.post("/increment-like/:id", async (req, res) => {
  console.log(`Incrementing like for ID: ${req.params.id}`);
  try {
    const id = req.params.id;
    const itineraryRef = db.collection("itineraries").doc(id);

    // Atomically increment the like count
    await itineraryRef.update({
      likeCount: admin.firestore.FieldValue.increment(1),
    });

    res.status(200).json({ message: "Like count incremented successfully" });
  } catch (error) {
    console.error("Error incrementing like count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/decrement-like/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const itineraryRef = db.collection("itineraries").doc(id);

    // Atomically decrement the like count
    await itineraryRef.update({
      likeCount: admin.firestore.FieldValue.increment(-1),
    });

    res.status(200).json({ message: "Like count decremented successfully" });
  } catch (error) {
    console.error("Error decrementing like count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({ error: "Location parameter is required" });
    }

    // Query itineraries that include the specified location
    const itinerariesSnapshot = await db
      .collection("itineraries")
      .where("locations", "array-contains", location)
      .get();
    const itineraries = itinerariesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(itineraries);
    console.log(itineraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Fetch data from Firestore
    const itineraryRef = db.collection("itineraries").doc(id);
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
      const restaurantPromises = itineraryData.restaurant.map(
        async (restaurant) => {
          const restaurantRef = restaurant.restaurantID;
          const restaurantSnapshot = await restaurantRef.get();
          return restaurantSnapshot.data();
        }
      );
      itineraryData.restaurant = await Promise.all(restaurantPromises);
    }

    // Respond with the fetched itinerary data
    res.json(itineraryData);
    console.log("Itinerary data:", itineraryData);
  } catch (error) {
    console.error("Error fetching itinerary data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
