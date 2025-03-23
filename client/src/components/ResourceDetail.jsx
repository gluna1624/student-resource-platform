import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ResourceDetail() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5001/resources/${id}`)
      .then((response) => setResource(response.data))
      .catch((error) => console.error('Error fetching resource:', error));
  }, [id]);

  if (!resource) return <div className="loading">Loading...</div>;

  return (
    <div className="resource-detail">
      <h2>{resource.title}</h2>
      <p>{resource.description}</p>
    </div>
  );
}

export default ResourceDetail;