const express = require("express");
const router = express.Router();

<<<<<<< HEAD
router.get("/", (req, res) => {
  res.send("FIND AMAZING CITIES!");
=======
// Import the Firebase Admin SDK instance
const admin = require('firebase-admin');

// Get a reference to the Firestore database
const db = admin.firestore();

// Define your route handler
router.get("/", async (req, res) => {
  try {
    // Fetch data from Firestore
    const citiesSnapshot = await db.collection('cities').get();
    const cities = citiesSnapshot.docs.map(doc => doc.data());

    // Respond with the fetched cities data
    res.json(cities);
  } catch (error) {
    console.error('Error fetching cities data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
>>>>>>> b2a2c2dc6269b8b5787aff206f1d5a570ebf542d
});

module.exports = router;