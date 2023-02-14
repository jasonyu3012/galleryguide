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

function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
