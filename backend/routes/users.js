const express = require("express");
const router = express.Router();

// Import the Firebase Admin SDK instance
const admin = require('firebase-admin');

// Get a reference to the Firestore database
const db = admin.firestore();

// Define your route handler
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const userRef = db.collection('users').doc(userId);
    const user = await userRef.get();
    if (!user.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user.data());
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});



module.exports = router;