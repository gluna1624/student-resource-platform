import { useState } from 'react';
import axios from 'axios';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5001/resources/search?q=${query}`);
      onSearch(response.data);
    } catch (error) {
      console.error('Error searching resources:', error);
      onSearch([]);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar" style={{ marginBottom: '2rem' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search resources..."
        style={{
          width: '100%',
          padding: '1rem',
          border: '2px solid #ff8c00',
          borderRadius: '10px',
          fontSize: '1.1rem',
          backgroundColor: '#fff5e6',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        onFocus={(e) => (e.target.style.borderColor = '#ff4b5c')}
        onBlur={(e) => (e.target.style.borderColor = '#ff8c00')}
      />
      <button
        type="submit"
        style={{
          marginTop: '0.5rem',
          background: 'linear-gradient(90deg, #ff4b5c, #ff8c00)',
          color: '#fff',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '10px',
          fontSize: '1rem',
          fontWeight: '700',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
        onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;