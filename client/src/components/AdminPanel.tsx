import React, { useEffect, useState } from 'react'; // Added React import
import axios, { AxiosResponse } from 'axios';

interface Resource {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  user_id: number | null;
}

export default function AdminPanel() {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    axios
      .get<Resource[]>('http://localhost:5001/resources', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res: AxiosResponse<Resource[]>) => setResources(res.data))
      .catch((err: unknown) => console.error('Error fetching resources:', err));
  }, []);

  const deleteResource = (id: number) => {
    axios
      .delete(`http://localhost:5001/resources/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(() => setResources(resources.filter((r: Resource) => r.id !== id)))
      .catch((err: unknown) => console.error('Error deleting resource:', err));
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      {resources.map((r: Resource) => {
        return (
          <div key={String(r.id)} style={{ margin: '1rem 0' }}>
            {r.title} - {r.description ?? 'No description'}
            <button
              onClick={() => deleteResource(r.id)}
              style={{
                marginLeft: '1rem',
                padding: '0.5rem',
                background: '#ff4b5c',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}