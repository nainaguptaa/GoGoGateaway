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
      const itineraryRef = await db.collection('itineraries').add(data);
      console.log(data);
      console.log('Itinerary created successfully');
      res.status(200).json({ message: 'Itinerary created successfully' });
    } catch (error) {
      console.error('Error creating itinerary:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;