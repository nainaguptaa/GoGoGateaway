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

router.post("/follow/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUser = req.body.currentUser;
    // Add the current user to the followed user's followers list
    const userRef = db.collection('users').doc(userId);
    const user = await userRef.get();
    if (!user.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userDoc = user.data();
    if (!userDoc.followers.includes(currentUser)) {
      userDoc.followers.push(currentUser);
      await userRef.update({ followers: userDoc.followers });
    }
    // Add the followed user to the current user's following list
    const currentUserRef = db.collection('users').doc(currentUser);
    const currentUserDoc = (await currentUserRef.get()).data();
    if (!currentUserDoc.following.includes(userId)) {
      currentUserDoc.following.push(userId);
      await currentUserRef.update({ following: currentUserDoc.following });
    }
    return res.json({ message: 'User followed successfully' });
  } catch (error) {
    console.error('Error following user:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
})

router.post("/unfollow/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUser = req.body.currentUser;
    // Remove the current user from the followed user's followers list
    const userRef = db.collection('users').doc(userId);
    const user = await userRef.get();
    if (!user.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userDoc = user.data();
    const index = userDoc.followers.indexOf(currentUser);
    if (index !== -1) {
      userDoc.followers.splice(index, 1);
      await userRef.update({ followers: userDoc.followers });
    }
    // Remove the followed user from the current user's following list
    const currentUserRef = db.collection('users').doc(currentUser);
    const currentUserDoc = (await currentUserRef.get()).data();
    const followingIndex = currentUserDoc.following.indexOf(userId);
    if (followingIndex !== -1) {
      currentUserDoc.following.splice(followingIndex, 1);
      await currentUserRef.update({ following: currentUserDoc.following });
    }
    return res.json({ message: 'User unfollowed successfully' });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
})



module.exports = router;