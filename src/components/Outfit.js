import React, { useEffect, useState } from 'react';

function Outfit() {
  const [suggestion, setSuggestion] = useState('');
  const [weather, setWeather] = useState('');

  useEffect(() => {
    fetch('https://wardrobestudio.net/recommendation/today')
      .then(res => res.json())
      .then(data => {
        setWeather(data.weather);
        setSuggestion(data.suggestion);
      })
      .catch(err => {
        console.error('Failed to get outfit suggestion:', err);
        setSuggestion('Error fetching suggestion. Try again later.');
      });
  }, []);

  return (
    <div className="screen">
      <h2>Today’s Weather</h2>
      <p>{weather}</p>

      <h3>Recommended Outfit</h3>
      <p>{suggestion}</p>
    </div>
  );
}

export default Outfit;
