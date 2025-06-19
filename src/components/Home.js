import React from 'react';

function Home() {
  return (
    <div className="screen">
      <h2>Today's Weather</h2>
      <p>27°c / 28°c 🌤️</p>
      <div className="upload-prompt">
        <p>Add 10 items and get outfits for tomorrow!</p>
        <button>+ Add Item</button>
      </div>
    </div>
  );
}

export default Home;
