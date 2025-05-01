import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    const token = localStorage.getItem('token');
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/'; // Redirect to home
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">Resource Hub</Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/upload">Upload</Link></li>
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/register">Register</Link></li>
                {token ? (
                    <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;