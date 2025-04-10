import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Resource {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  user_id: number | null;
}

const ResourceList: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    axios
      .get<Resource[]>('http://localhost:5001/resources', { params: { category } })
      .then((response) => setResources(response.data))
      .catch((error) => console.error('Error fetching resources:', error));
  }, [category]);

  return (
    <div className="resource-list">
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All</option>
        <option value="Math">Math</option>
        <option value="Physics">Physics</option>
      </select>
      {resources.map((resource) => (
        <Link to={`/resources/${resource.id}`} key={resource.id}>
          <div className="resource-card">{resource.title}</div>
        </Link>
      ))}
    </div>
  );
};

export default ResourceList;