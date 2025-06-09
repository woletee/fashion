// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Wardrobe from './components/Wardrobe';
import Outfit from './components/Outfit';
import Discover from './components/Discover';
import Upload from './components/Upload';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/outfit" element={<Outfit />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>

        <nav className="bottom-nav">
          <NavLink to="/" className="nav-icon">🏠 Home</NavLink>
          <NavLink to="/wardrobe" className="nav-icon">👗 Wardrobe</NavLink>
          <NavLink to="/outfit" className="nav-icon">👕 Outfit</NavLink>
          <NavLink to="/discover" className="nav-icon">🔍 Discover</NavLink>
          <NavLink to="/upload" className="nav-icon">📤 Upload</NavLink>
        </nav>
      </div>
    </Router>
  );
}

export default App;