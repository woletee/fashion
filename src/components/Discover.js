import React, { useEffect, useState } from 'react';
import './Discover.css';

function Discover() {
  const [analysis, setAnalysis] = useState(null);
  const [trending, setTrending] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://wardrobestudio.net/discover/analysis')
      .then(res => res.json())
      .then(setAnalysis)
      .catch(() => setError('Failed to load wardrobe analysis.'));

    fetch('https://wardrobestudio.net/discover/trending')
      .then(res => res.json())
      .then(setTrending)
      .catch(() => setError('Failed to load trending items.'));
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!analysis) return <p>Loading...</p>;

  return (<div className="screen">
    <h2>🔍 Discover What to Wear Next</h2>
    <h3>Your Wardrobe Gaps</h3>
    <ul>{analysis.missing.map((c,i)=><li key={i}>{c}</li>)}</ul>

    <h3>Suggested Items to Buy</h3>
    <div className="product-grid">
      {analysis.suggestions.map((p,i)=>(
        <div key={i} className="product-card">
          <img src={p.image} alt={p.name}/>
          <p>{p.name}</p>
          <a href={p.url} target="_blank" rel="noreferrer">Buy →</a>
        </div>
      ))}
    </div>

    <h3>🔥 Trending Now</h3>
    <div className="product-grid">
      {trending.map((p,i)=>(
        <div key={i} className="product-card">
          <img src={p.image} alt={p.name}/>
          <p>{p.name}</p>
          <a href={p.url} target="_blank" rel="noreferrer">Explore</a>
        </div>
      ))}
    </div>
  </div>);
}

export default Discover;
