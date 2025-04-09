import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { jwtDecode } from 'jwt-decode';

function ResourceList() {
  const [resources, setResources] = useState([]);
  const [category, setCategory] = useState('');
  const token = localStorage.getItem('token');
  const isAdmin = token ? jwtDecode(token).isAdmin : false;

  useEffect(() => {
    const url = category 
      ? `${import.meta.env.VITE_API_URL}/resources?category=${category}` 
      : `${import.meta.env.VITE_API_URL}/resources`;
    axios.get(url)
      .then((response) => {
        console.log('Resources fetched:', response.data);
        setResources(response.data.map(r => ({ ...r, key: r.id }))); // Ensure unique key
      })
      .catch((error) => console.error('Error fetching resources:', error));
  }, [category]);

  const handleSearch = (searchResults) => {
    setResources(searchResults.map(r => ({ ...r, key: r.id })));
  };

  return (
    <div className="container">
      <h2>Shared Resources</h2>
      {isAdmin && (
        <Link to="/admin">
          <button style={{
            padding: '0.5rem 1rem',
            background: '#ff4b5c',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1.2rem',
            cursor: 'pointer',
            marginBottom: '1rem',
          }}>
            Admin Panel
          </button>
        </Link>
      )}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem' }}
      >
        <option value="">All Categories</option>
        <option value="Math">Math</option>
        <option value="Physics">Physics</option>
        <option value="CS">Computer Science</option>
        <option value="Other">Other</option>
      </select>
      <SearchBar onSearch={handleSearch} />
      <ul className="resource-list">
        {resources.map((resource, index) => (
          <li
            key={resource.id}
            className="resource-card"
            style={{
              animation: `bounceIn 0.6s ease-in-out ${index * 0.1}s both`,
            }}
          >
            <Link
              to={`/resources/${resource.id}`}
              style={{
                textDecoration: 'none',
                color: '#ff4b5c',
                display: 'block',
                padding: '10px',
              }}
            >
              {resource.title} ({resource.category || 'Uncategorized'}) - ID: {resource.id}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResourceList;