import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function UserProfile() {
  const { id } = useParams();
  const [resources, setResources] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5001/users/${id}/resources`)
      .then(res => setResources(res.data));
    axios.get('http://localhost:5001/resources') // Hack to get username; ideally, add a /users/:id endpoint
      .then(res => {
        const userResource = res.data.find(r => r.user_id === parseInt(id));
        if (userResource) setUsername(userResource.username);
      });
  }, [id]);

  return (
    <div className="container">
      <h2>{username ? `${username}'s Profile` : 'User Profile'}</h2>
      <h3>Uploaded Resources</h3>
      <ul className="resource-list">
        {resources.map((resource, index) => (
          <li
            key={resource.id}
            className="resource-card"
            style={{
              animation: `bounceIn 0.6s ease-in-out ${index * 0.1}s both`,
            }}
          >
            <Link to={`/resources/${resource.id}`}>{resource.title} ({resource.category || 'Uncategorized'})</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}