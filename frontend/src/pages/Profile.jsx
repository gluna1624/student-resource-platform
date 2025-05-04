import { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [resources, setResources] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    console.log('Profile Page - Token:', token);
    const fetchData = async () => {
      if (!token) {
        setError('Please log in to view your profile');
        console.log('No token found');
        setLoading(false);
        return;
      }
      
      try {
        // Fetch user info
        console.log('Fetching user info...');
        const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('User Response:', userResponse.data);
        setUser(userResponse.data);
        
        // Only try to fetch resources if user fetch succeeded
        try {
          console.log('Fetching resources...');
          const resourcesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/resources/my-resources`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log('Resources Response:', resourcesResponse.data);
          setResources(Array.isArray(resourcesResponse.data) ? resourcesResponse.data : []);
        } catch (resourceErr) {
          console.error('Resources fetch error:', resourceErr);
          // Just set empty resources if this fails
          setResources([]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('User fetch error:', err);
        if (err.response?.status === 403 || err.response?.status === 401) {
          localStorage.removeItem('token');
          setError('Your session has expired. Please log in again.');
        } else {
          setError('Could not load profile: ' + (err.response?.data?.error || err.message));
        }
        setResources([]);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [token]);

  if (loading) {
    return <div className="profile-container"><p>Loading profile...</p></div>;
  }

  if (error) {
    return (
      <div className="profile-container">
        <h1>My Profile</h1>
        <p className="error">{error}</p>
        {error.includes('session has expired') && (
          <button onClick={() => window.location.href = '/login'}>Log In Again</button>
        )}
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      {user ? (
        <div className="user-info">
          <h2>{user.username}</h2>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Could not load user information.</p>
      )}

      <h3>My Uploaded Resources</h3>
      {resources.length > 0 ? (
        <div className="resources">
          {resources.map((resource) => (
            <div key={resource.resource_id} className="resource-item">
              <h4>{resource.title}</h4>
              <p>{resource.description || 'No description'}</p>
              <p>File: {resource.file_path}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No resources uploaded yet.</p>
      )}
    </div>
  );
}

export default Profile;