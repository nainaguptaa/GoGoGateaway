import { useState, useEffect } from 'react';
import axios from 'axios';

const ItineraryComments = ({ itineraryId }) => {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/itineraries/${itineraryId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [itineraryId]);

  // Add a new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    try {
      const { data } = await axios.post(`/itineraries/${itineraryId}/comments`, {
        text: newCommentText,
        userId: "YourUserIdHere" // Replace with actual user ID from your authentication logic
      });
      setComments([...comments, data.comment]); // Assuming your backend returns the added comment
      setNewCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Delete a comment
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/itineraries/${itineraryId}/comments/${commentId}`);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (loading) return <p>Loading comments...</p>;

  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.text}</p>
          <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
        </div>
      ))}
      <form onSubmit={handleAddComment}>
        <textarea
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Write a comment..."
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};
import PropTypes from 'prop-types';

ItineraryComments.propTypes = {
  itineraryId: PropTypes.string.isRequired,
};

export default ItineraryComments;