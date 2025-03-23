import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function ResourceList() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/resources')
      .then((response) => setResources(response.data))
      .catch((error) => console.error('Error fetching resources:', error));
  }, []);

  const handleSearch = (searchResults) => {
    setResources(searchResults);
  };

  return (
    <div className="container">
      <h2>Shared Resources</h2>
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
            <Link to={`/resources/${resource.id}`}>{resource.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResourceList;