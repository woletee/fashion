import React, { useState } from 'react';
import './Outfit.css'; // Optional styling

function Outfit() {
  const [weeklyOutfits, setWeeklyOutfits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const parseOutfitsByDay = (rawText) => {
    const lines = rawText.split('\n').map(line => line.trim()).filter(line => line !== '');
    const result = [];
    let currentDay = null;

    for (const line of lines) {
      if (/^- [A-Za-z]+:/.test(line)) {
        // New day section
        currentDay = {
          day: line.replace(/^- /, '').replace(':', ''),
          outfits: []
        };
        result.push(currentDay);
      } else if (line.startsWith('-') && currentDay) {
        currentDay.outfits.push(line.replace(/^- /, ''));
      }
    }

    return result;
  };

  const handleGetSuggestions = () => {
    setLoading(true);
    setError('');

    fetch('https://wardrobestudio.net/outfit/weekly')
      .then(res => res.json())
      .then(data => {
        if (typeof data.outfits === 'string') {
          const structured = parseOutfitsByDay(data.outfits);
          setWeeklyOutfits(structured);
        } else {
          setError(data.detail || 'Unexpected response format.');
        }
      })
      .catch(err => {
        console.error('❌ Failed to get outfit suggestions:', err);
        setError('Error fetching outfit suggestions.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="screen">
      <h2 style={{ marginBottom: '20px', fontSize: '26px' }}>🌈 Weekly Outfit Recommendations</h2>

      <button className="fetch-button" onClick={handleGetSuggestions} disabled={loading}>
        {loading ? '✨ Generating Your Looks...' : "🧥 Get This Week's Looks!"}
      </button>

      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}

      {!loading && weeklyOutfits.length > 0 && (
        <div className="week-grid">
          {weeklyOutfits.map((entry, idx) => (
            <div key={idx} className="day-card">
              <h4>{entry.day}</h4>
              <ul>
                {entry.outfits.map((outfit, i) => (
                  <li key={i}>{outfit}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Outfit;
