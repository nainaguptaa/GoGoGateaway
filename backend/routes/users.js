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

router.get("/username/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const userRef = db.collection("users").where("username", "==", username);
    const user = await userRef.get();
    if (user.empty) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user.docs[0].data());
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});


router.post("/follow/:id", async (req, res) => {
  try {
    const followedUserId = req.params.id;
    const currentUser = req.body.currentUser;

    // Retrieve the username of the followed user
    const followedUserRef = db.collection("users").doc(followedUserId);
    const followedUserSnapshot = await followedUserRef.get();

    if (!followedUserSnapshot.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Retrieve the followed user's data
    const followedUserData = followedUserSnapshot.data();
    const followedUsername = followedUserData.username;

    // Retrieve the current user's data
    const currentUserRef = db.collection("users").doc(currentUser);
    const currentUserSnapshot = await currentUserRef.get();
    const currentUserData = currentUserSnapshot.data();

    // Add the current user to the followed user's followers list
    const followedUserFollowers = followedUserData.followers || [];
    if (!followedUserFollowers.some((user) => user.userId === currentUser)) {
      followedUserFollowers.push({
        userId: currentUser,
        username: currentUserData.username,
        photoURL: currentUserData.photoURL,
      });
      await followedUserRef.update({ followers: followedUserFollowers });
    }

    // Add the followed user to the current user's following list
    const currentUserFollowing = currentUserData.following || [];
    if (!currentUserFollowing.some((user) => user.userId === followedUserId)) {
      currentUserFollowing.push({
        userId: followedUserId,
        username: followedUsername,
        photoURL: followedUserData.photoURL,
      });
      await currentUserRef.update({ following: currentUserFollowing });
    }

    // Get updated current user data
    const updatedCurrentUserSnapshot = await currentUserRef.get();
    const updatedCurrentUserData = updatedCurrentUserSnapshot.data();

    return res.json(updatedCurrentUserData);
  } catch (error) {
    console.error("Error following user:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/unfollow/:id", async (req, res) => {
  try {
    const followedUserId = req.params.id;
    const currentUser = req.body.currentUser;

    // Remove the current user from the followed user's followers list
    const followedUserRef = db.collection("users").doc(followedUserId);
    const followedUserSnapshot = await followedUserRef.get();

    if (!followedUserSnapshot.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const followedUserData = followedUserSnapshot.data();
    const followedUserFollowers = followedUserData.followers || [];
    const updatedFollowers = followedUserFollowers.filter(
      (user) => user.userId !== currentUser
    );

    await followedUserRef.update({ followers: updatedFollowers });

    // Remove the followed user from the current user's following list
    const currentUserRef = db.collection("users").doc(currentUser);
    const currentUserSnapshot = await currentUserRef.get();

    if (!currentUserSnapshot.exists) {
      return res.status(404).json({ error: "Current user not found" });
    }

    const currentUserData = currentUserSnapshot.data();
    const currentUserFollowing = currentUserData.following || [];
    const updatedFollowing = currentUserFollowing.filter(
      (user) => user.userId !== followedUserId
    );

    await currentUserRef.update({ following: updatedFollowing });

    // Get updated current user data
    const updatedCurrentUserSnapshot = await currentUserRef.get();
    const updatedCurrentUserData = updatedCurrentUserSnapshot.data();

    return res.json(updatedCurrentUserData);
  } catch (error) {
    console.error("Error unfollowing user:", error);
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
