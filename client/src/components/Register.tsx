import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5001/register', { username, password });
      alert('Registered successfully! Please log in.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed—username might be taken.');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        style={{ display: 'block', margin: '1rem 0', width: '100%' }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={{ display: 'block', margin: '1rem 0', width: '100%' }}
      />
      <button
        onClick={handleRegister}
        style={{
          padding: '0.5rem 1rem',
          background: '#ff4b5c',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Register
      </button>
    </div>
  );
}