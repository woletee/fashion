import React, { useEffect, useState } from 'react';

function Discover() {
  const [wardrobe, setWardrobe] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://wardrobestudio.net/wardrobe/items')
      .then(res => res.json())
      .then(data => {
        console.log("🧥 Wardrobe:", data);
        setWardrobe(data);
      })
      .catch(err => console.error('Error loading wardrobe:', err));
  }, []);

  const handleGetRecommendations = async () => {
    setLoading(true);
    try {
      const imageUrls = wardrobe.map(item => `https://wardrobestudio.net/${item.image_url}`);
      console.log("📤 Sending image URLs:", imageUrls);

      const res = await fetch('https://backend-fashion-6.onrender.com/discover/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_urls: imageUrls }),
      });

      const data = await res.json();
      console.log("✅ Got recommendations:", data);
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
    setLoading(false);
  };

  return (
    <div className="screen">
      <h2>Discover Recommendations</h2>

      <button onClick={handleGetRecommendations} disabled={loading}>
        {loading ? 'Analyzing wardrobe...' : 'Get Recommendations'}
      </button>

      {Array.isArray(recommendations) && recommendations.length > 0 && (
        <div className="recommendation-box">
          <h3>What’s Missing in Your Wardrobe:</h3>
          <div className="recommendation-grid">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="recommendation-item" style={{ marginBottom: '20px' }}>
                <img
                  src={rec.image_url}
                  alt={rec.missing_item}
                  style={{ width: '120px', borderRadius: '8px' }}
                />
                <p>You might need more <strong>{rec.missing_item}</strong></p>
                <a href={rec.suggest_link} target="_blank" rel="noopener noreferrer">
                  Shop Now
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
