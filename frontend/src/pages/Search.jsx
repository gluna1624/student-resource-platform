import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './Search.css';

function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('query') || '');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) {
                setResults([]);
                setError('Please enter a search term');
                return;
            }
            try {
                const response = await axios.get('http://localhost:8080/api/resources/search', {
                    params: { query }
                });
                setResults(response.data);
                setError(response.data.length === 0 ? 'No results found for this query.' : '');
            } catch (err) {
                setResults([]);
                setError('Search failed. Please try again.');
            }
        };
        fetchResults();
    }, [query]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query) {
            setError('Please enter a search term');
            return;
        }
        setSearchParams({ query });
    };

    return (
        <div className="search-container">
            <h1>Search Resources</h1>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search by title or subject..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {error && <p className="error">{error}</p>}
            <div className="results">
                {results.length > 0 ? (
                    results.map((result) => (
                        <div key={result.resource_id} className="result-item">
                            <h3>{result.title}</h3>
                            <p>{result.description}</p>
                            <p>By: {result.username}</p>
                        </div>
                    ))
                ) : (
                    <p>{error || 'No results found.'}</p>
                )}
            </div>
        </div>
    );
}

export default Search;