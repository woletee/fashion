import React, { useEffect, useState } from 'react';
import './Outfit.css';

function Outfit() {
  const [weeklyOutfits, setWeeklyOutfits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [weather, setWeather] = useState('');

  const handleGetSuggestions = () => {
    setLoading(true);
    setError('');

    fetch('https://wardrobestudio.net/outfit/weekly')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.outfits)) {
          setWeeklyOutfits(data.outfits);
        } else {
          setError(data.detail || 'Unexpected response format.');
        }
      })
      .catch(err => {
        console.error('Failed to get outfit suggestion:', err);
        setError('Error fetching suggestion. Try again later.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch('https://wardrobestudio.net/recommendation/today')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.outfits)) {
          setWeeklyOutfits(data.outfits);
        } else {
          setError(data.detail || 'Unexpected response format.');
        }
        setWeather(data.weather);
        setSuggestion(data.suggestion);
      })
      .catch(err => {
        console.error('❌ Failed to get outfit suggestions:', err);
        setError('Error fetching outfit suggestions.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="screen">
      <h2 style={{ marginBottom: '20px', fontSize: '26px' }}>🌈 Weekly Outfit Recommendations</h2>

      <button className="fetch-button" onClick={handleGetSuggestions} disabled={loading}>
        {loading ? '✨ Generating Your Looks...' : "🧥 Get This Week's Looks!"}
      </button>

      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
      <h2>Today’s Weather</h2>
      <p>{weather}</p>

      {!loading && weeklyOutfits.length > 0 && (
        <div className="week-grid">
          {weeklyOutfits.map((entry, idx) => (
            <div key={idx} className="day-card">
              <h4>{entry.day}</h4>
              {entry.outfits.map((outfit, i) => (
                <div key={i} className="outfit-group">
                  <div className="outfit-images">
                    {[outfit.top, outfit.bottom, outfit.shoes].map((item, j) =>
                      item ? (
                        <div key={j} className="outfit-item">
                          <img
                            src={`https://wardrobestudio.net${item.image}`}
                            alt={item.name}
                          />
                          <p>{item.name}</p>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      <h3>Recommended Outfit</h3>
      <p>{suggestion}</p>
    </div>
  );
}

export default Outfit;
