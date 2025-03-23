import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPanel() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/resources', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(res => setResources(res.data));
  }, []);

  const deleteResource = (id) => {
    axios.delete(`http://localhost:5001/resources/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(() => setResources(resources.filter(r => r.id !== id)));
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      {resources.map(r => (
        <div key={r.id} style={{ margin: '1rem 0' }}>
          {r.title} - {r.description}
          <button
            onClick={() => deleteResource(r.id)}
            style={{ marginLeft: '1rem', padding: '0.5rem', background: '#ff4b5c', color: '#fff', border: 'none', borderRadius: '4px' }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}