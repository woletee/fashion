import React, { useEffect, useState } from 'react';
import './Discover.css';

function Discover() {
  const [analysis, setAnalysis] = useState(null);
  const [trending, setTrending] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch wardrobe analysis
    fetch('https://wardrobestudio.net/wardrobe/discover')
      .then(res => res.json())
      .then(setAnalysis)
      .catch(() => setError('Failed to load wardrobe analysis.'));

    // Fetch trending items
    fetch('https://wardrobestudio.net/discover/trending')
      .then(res => res.json())
      .then(data => {
        setTrending(data.trending || []);
        if (data.suggestions && Array.isArray(data.suggestions)) {
          setSuggestions(data.suggestions);
        } else {
          setSuggestions([]);
        }
      })
      .catch(err => {
        console.error('❌ Error fetching suggestions:', err);
        setError('Failed to load trending or suggestions.');
      });
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!analysis) return <p>Loading analysis...</p>;

  return (
    <div className="screen">
      <h2>📘 What You're Missing</h2>
      <h2>Discover New Items</h2>

      <h3>📎 Least-Owned Categories</h3>
      <ul>
        {analysis.missing.map((cat, i) => (
          <li key={i}>{cat}</li>
        ))}
      </ul>

      <h3>🧠 Smart Suggestions</h3>
      {suggestions.length === 0 ? (
        <p>Loading suggestions...</p>
      ) : (
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
                Find Online
              </a>
            </li>
          ))}
        </ul>
      )}

      <h3>🛒 Suggestions to Buy</h3>
      {analysis.suggestions.length === 0 ? (
        <p>No suggestions available — you're well stocked!</p>
      ) : (
        <div className="product-grid">
          {analysis.suggestions.map((p, i) => (
            <div key={i} className="product-card">
              <img src={p.image} alt={p.name} />
              <p><strong>{p.name}</strong></p>
              <a href={p.url} target="_blank" rel="noreferrer">🛍 Buy</a>
            </div>
          ))}
        </div>
      )}

      {trending.length > 0 && (
        <>
          <h3>🔥 Trending Picks</h3>
          <div className="product-grid">
            {trending.map((p, i) => (
              <div key={i} className="product-card">
                <img src={p.image} alt={p.name} />
                <p>{p.name}</p>
                <a href={p.url} target="_blank" rel="noreferrer">Explore →</a>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Discover;
