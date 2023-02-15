import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

import './App.css';
// Import pages
import About from './components/pages/About';
import Home from './components/pages/Home';
import Navigation from './components/Navigation';
import Artworks from './components/pages/Artworks';
import Artists from './components/pages/Artists';
import Galleries from './components/pages/Galleries';

function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        {/* for the global navbar*/}
        <Navigation />
        {/* for all of the internal pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/artworks" element={<Artworks />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/galleries" element={<Galleries />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
