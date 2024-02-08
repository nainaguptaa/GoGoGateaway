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
    const hotelsSnapshot = await db.collection('hotels').get();
    const hotels = hotelsSnapshot.docs.map(doc => doc.data());

    // Respond with the fetched hotels data
    res.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;