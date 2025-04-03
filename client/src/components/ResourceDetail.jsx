import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ResourceDetail() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5001/resources/${id}`).then(res => setResource(res.data));
    axios.get(`http://localhost:5001/resources/${id}/comments`).then(res => setComments(res.data));
  }, [id]);

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    axios.post(`http://localhost:5001/resources/${id}/comments`, { content: newComment }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(res => {
      setComments([...comments, res.data]);
      setNewComment('');
    }).catch(err => console.error('Error posting comment:', err));
  };

  if (!resource) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>{resource.title}</h2>
      <p>{resource.description}</p>
      <p><strong>Category:</strong> {resource.category || 'Uncategorized'}</p>
      <p><strong>Uploaded by:</strong> <Link to={`/users/${resource.user_id}`}>{resource.username}</Link></p>
      {resource.file_name && (
        <div>
          <h3>File</h3>
          <p>
            <a
              href={`http://localhost:5001/resources/${id}/file`}
              download={resource.file_name}
              style={{ color: '#ff4b5c', textDecoration: 'none' }}
            >
              Download {resource.file_name}
            </a>
          </p>
        </div>
      )}
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id} style={{ margin: '0.5rem 0' }}>
            <strong><Link to={`/users/${comment.user_id}`}>{comment.username}</Link>:</strong> {comment.content}
          </li>
        ))}
      </ul>
      {localStorage.getItem('token') ? (
        <div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            style={{ width: '100%', height: '100px', marginTop: '1rem' }}
          />
          <button
            onClick={handleCommentSubmit}
            style={{
              padding: '0.5rem 1rem',
              background: '#ff4b5c',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              marginTop: '0.5rem',
            }}
          >
            Submit Comment
          </button>
        </div>
      ) : (
        <p>Log in to add a comment.</p>
      )}
    </div>
  );
}