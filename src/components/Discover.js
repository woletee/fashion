import React, { useState } from 'react';
import './Discover.css'; // Optional CSS for styling

function Discover() {
  const [recommendations, setRecommendations] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDiscoverData = () => {
    setLoading(true);
    setError('');

    Promise.all([
      fetch('https://wardrobestudio.net/discover/recommendations').then(res => res.json()),
      fetch('https://wardrobestudio.net/discover/trending').then(res => res.json())
    ])
      .then(([recData, trendData]) => {
        if (Array.isArray(recData.suggestions)) {
          setRecommendations(recData.suggestions);
        } else {
          setError('Could not load wardrobe suggestions.');
        }

        if (Array.isArray(trendData.trending)) {
          setTrending(trendData.trending);
        } else {
          setError('Could not load trending fashion.');
        }
      })
      .catch(err => {
        console.error('❌ Error fetching discover data:', err);
        setError('Failed to load discover info.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="screen">
      <h2 style={{ marginBottom: '20px' }}>🔎 Discover</h2>

      <button className="fetch-button" onClick={fetchDiscoverData} disabled={loading}>
        {loading ? '🔄 Loading suggestions...' : '✨ Discover What to Wear Next'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}

      {!loading && recommendations.length > 0 && (
        <div>
          <h3 style={{ marginTop: '30px' }}>🧩 What You Might Need Next</h3>
          <div className="suggestions-grid">
            {recommendations.map((item, idx) => (
              <div key={idx} className="suggestion-card">
                <img src={item.image} alt={item.name} className="item-img" />
                <h4>{item.name}</h4>
                <p>{item.reason}</p>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  🛒 Buy Now
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && trending.length > 0 && (
        <div>
          <h3 style={{ marginTop: '30px' }}>🔥 Trending Now</h3>
          <div className="suggestions-grid">
            {trending.map((item, idx) => (
              <div key={idx} className="suggestion-card">
                <img src={item.image} alt={item.name} className="item-img" />
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  👗 Explore
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Discover;
