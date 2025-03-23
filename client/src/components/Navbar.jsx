import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header style={{
      background: 'linear-gradient(90deg, #ff4b5c, #ff8c00)',
      padding: '1.5rem 3rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <div style={{
        fontSize: '2rem',
        fontWeight: '700',
        color: '#fff',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
      }}>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>StudyHub</Link>
      </div>
      <nav style={{ display: 'flex', gap: '2.5rem' }}>
        <Link to="/" style={{
          color: '#fff',
          textDecoration: 'none',
          fontSize: '1.2rem',
          fontWeight: '600',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          transition: 'background 0.3s ease, transform 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.3)';
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          e.target.style.transform = 'scale(1)';
        }}>
          Home
        </Link>
        <Link to="/upload" style={{
          color: '#fff',
          textDecoration: 'none',
          fontSize: '1.2rem',
          fontWeight: '600',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          transition: 'background 0.3s ease, transform 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.3)';
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          e.target.style.transform = 'scale(1)';
        }}>
          Upload
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;