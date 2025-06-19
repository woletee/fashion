import React, { useEffect, useState } from 'react';
import './Discover.css';

function Discover() {
  const [analysis, setAnalysis] = useState(null);
  const [trending, setTrending] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch analysis data
    fetch('https://wardrobestudio.net/discover/analysis')
      .then(res => res.json())
      .then(setAnalysis)
      .catch(() => setError('Failed to load wardrobe analysis.'));

    // Optional: Fetch trending data if needed
    fetch('https://wardrobestudio.net/discover/trending')
      .then(res => res.json())
      .then(setTrending)
      .catch(() => setError('Failed to load trending items.'));
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!analysis) return <p>Loading...</p>;

  return (
    <div className="screen">
      <h2>📘 What You're Missing</h2>

      <h3>📎 Least-Owned Categories</h3>
      <ul>
        {analysis.missing.map((cat, i) => (
          <li key={i}>{cat}</li>
        ))}
      </ul>

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

      {/* Optional: Show trending items */}
      {trending.length > 0 && (
        <>
          <h3> Trending Picks</h3>
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
