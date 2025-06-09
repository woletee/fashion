import React, { useEffect, useState } from 'react';

function Discover() {
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://wardrobestudio.net/wardrobe/discover')
      .then(res => res.json())
      .then(data => {
        if (data.suggestions && Array.isArray(data.suggestions)) {
          setSuggestions(data.suggestions);
        } else {
          setError('No suggestions found.');
        }
      })
      .catch(err => {
        console.error('❌ Error fetching suggestions:', err);
        setError('Failed to load suggestions.');
      });
  }, []);

  return (
    <div className="screen">
      <h2>Discover New Items</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!error && suggestions.length === 0 && <p>Loading suggestions...</p>}

      <ul>
        {suggestions.map((item, idx) => (
          <li key={idx}>
            {item}{' '}
            <a
              href={`https://www.google.com/search?q=buy+${encodeURIComponent(item)}`}
              target="_blank"
              rel="noreferrer"
              style={{ marginLeft: '8px' }}
            >
              🔍 Find Online
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Discover;
