import { useState } from 'react';
import axios from 'axios';

const AddCommentForm = ({ itineraryId }) => {
  const [commentText, setCommentText] = useState('');
  const apiURL = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiURL}/itineraries/${itineraryId}/comments`, {
        userId: 'user123', // This should be dynamically set based on the logged-in user
        text: commentText,
      });
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};
import PropTypes from 'prop-types';

AddCommentForm.propTypes = {
  itineraryId: PropTypes.string.isRequired,
};
export default AddCommentForm;
