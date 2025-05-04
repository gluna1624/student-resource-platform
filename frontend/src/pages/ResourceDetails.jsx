import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ResourceDetails.css';

const ResourceDetails = () => {
  const { resource_id } = useParams();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/comments/${resource_id}`);
        setComments(response.data);
      } catch (err) {
        setError('Failed to load comments');
      }
    };
    fetchComments();
  }, [resource_id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:8080/api/comments',
        { resource_id, comment_text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentText('');
      const response = await axios.get(`http://localhost:8080/api/comments/${resource_id}`);
      setComments(response.data);
    } catch (err) {
      setError('Failed to post comment');
    }
  };

  return (
    <div className="resource-details">
      <h2>Resource Comments</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        <button type="submit">Post Comment</button>
      </form>
      <div className="comments">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p><strong>{comment.username}</strong> ({new Date(comment.created_at).toLocaleString()}):</p>
            <p>{comment.comment_text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceDetails;