import React, { useEffect, useState } from 'react';
import './Discover.css';

function Discover() {
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://wardrobestudio.net/discover/missing')
      .then(res => res.json())
      .then(setAnalysis)
      .catch(() => setError('Failed to load wardrobe analysis.'));
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!analysis) return <p>Loading...</p>;

  return (
    <div className="screen">
      <h2>🛍️ What You're Missing</h2>

      <h3>📉 Least-Owned Categories</h3>
      <ul>
        {analysis.missing_categories.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>

      <h3>🛒 Suggestions to Buy</h3>
      <div className="product-grid">
        {analysis.suggestions.map((p, i) => (
          <div key={i} className="product-card">
            <img src={p.image} alt={p.name} />
            <p>{p.name}</p>
            <a href={p.url} target="_blank" rel="noreferrer">Buy →</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Discover;
