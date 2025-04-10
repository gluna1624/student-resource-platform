import React, { useState, ChangeEvent } from 'react'; // Added React and ChangeEvent
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState<string>(''); // Typed as string
  const [password, setPassword] = useState<string>(''); // Typed as string
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post<{ token: string }>('http://localhost:5001/login', { username, password });
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      alert('Login failed');
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        value={username}
        onChange={handleUsernameChange}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}