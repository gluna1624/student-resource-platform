import { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
                email,
                password
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user_id', response.data.user_id);
            alert('Login successful!');
            window.location.href = '/';
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;