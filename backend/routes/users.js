const express = require("express");
const router = express.Router();

// Import the Firebase Admin SDK instance
const admin = require("firebase-admin");

// Get a reference to the Firestore database
const db = admin.firestore();

// Define your route handler
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const userRef = db.collection("users").doc(userId);
    const user = await userRef.get();
    if (!user.exists) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user.data());
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/:userId/save-itinerary", async (req, res) => {
  const userId = req.params.userId; // Retrieve the user ID from the URL parameters
  const itineraryId = req.body.itineraryId; // Assuming the itinerary ID is sent in the request body

  if (!itineraryId) {
    return res.status(400).json({ error: "Missing itinerary ID" });
  }

  try {
    // Reference to the user's document in the 'users' collection
    const userRef = db.collection("users").doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = doc.data();

    // Check if the itineraryId already exists in the savedItineraries array
    if (
      userData.savedItineraries &&
      userData.savedItineraries.includes(itineraryId)
    ) {
      // Itinerary is already saved
      return res.status(409).json({ message: "Itinerary already saved" });
    }

    // Atomically add the itinerary ID to the 'savedItineraries' array field in the user's document
    await userRef.update({
      savedItineraries: admin.firestore.FieldValue.arrayUnion(itineraryId),
    });

    res.status(200).json({ message: "Itinerary saved successfully" });
  } catch (error) {
    console.error("Error saving itinerary:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/:userId/add-to-liked", async (req, res) => {
  const userId = req.params.userId; // Retrieve the user ID from the URL parameters
  const itineraryId = req.body.itineraryId; // Assuming the itinerary ID is sent in the request body

  if (!itineraryId) {
    return res.status(400).json({ error: "Missing itinerary ID" });
  }

  try {
    // Reference to the user's document in the 'users' collection
    const userRef = db.collection("users").doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the itineraryId already exists in the savedItineraries array

    // Atomically add the itinerary ID to the 'savedItineraries' array field in the user's document
    await userRef.update({
      likedItineraries: admin.firestore.FieldValue.arrayUnion(itineraryId),
    });

    res.status(200).json({ message: "Itinerary liked successfully" });
  } catch (error) {
    console.error("Error saving itinerary:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
