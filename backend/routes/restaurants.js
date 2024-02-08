const express = require("express");
const router = express.Router();

// Import the Firebase Admin SDK instance
const admin = require('firebase-admin');

// Get a reference to the Firestore database
const db = admin.firestore();

// Define your route handler
router.get("/", async (req, res) => {
  try {
    // Fetch data from Firestore
    const restaurantsSnapshot = await db.collection('restaurants').get();
    const restaurants = restaurantsSnapshot.docs.map(doc => doc.data());

    // Respond with the fetched restaurants data
    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;