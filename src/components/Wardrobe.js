import React, { useEffect, useState } from 'react';

function Wardrobe() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://wardrobestudio.net/wardrobe/items')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error('Error loading wardrobe:', err));
  }, []);

  return (
    <div className="screen">
      <h2>Wardrobe</h2>
      <div className="filters">
        <button>All</button>
        <button>Tops</button>
        <button>Bottoms</button>
        <button>Shoes</button>
      </div>
      <div className="wardrobe-grid">
        {items.map((item) => (
          <div key={item.id} className="clothing-item">
            <img src={`https://wardrobestudio.net/${item.image_url}`} alt={item.name} width="120" />
            <p>{item.name} ({item.category})</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wardrobe;
