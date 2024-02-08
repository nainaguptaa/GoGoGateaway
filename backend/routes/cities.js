const express = require("express");
const router = express.Router();

// Import the Firebase Admin SDK instance
const admin = require('firebase-admin');

// Get a reference to the Firestore database
const db = admin.firestore();

// Define your route handler
router.get("/", async (req, res) => {
  try {
    const city = req.query.city;
    //get the hotels with the same city
    const hotels = await db.collection('hotels').where('location', '==', city).get();
    const hotelSnapshot = hotels.docs.map(doc => doc.data());
    // Respond with the fetched cities data
    res.json(hotelSnapshot);
  } catch (error) {
    console.error('Error fetching cities data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;