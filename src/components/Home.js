import React from 'react';

function Home() {
  return (
    <div className="screen">
      <h2>Today's Weather</h2>
      <p>55°F / 45°F 🌤️</p>
      <div className="upload-prompt">
        <p>Add 30 items and get outfits for tomorrow!</p>
        <button>+ Add Item</button>
      </div>
    </div>
  );
}

export default Home;
