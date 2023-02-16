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

import ExampleArtistInstance from './components/pages/ArtistInstances/ExampleArtistInstance';
import VincentvanGogh from './components/pages/ArtistInstances/VincintvanGogh';
import MaryCassat from './components/pages/ArtistInstances/MaryCassat';
import GrantWood from './components/pages/ArtistInstances/GrantWood';
import ExampleArtworkInstance from './components/pages/ArtworkInstances/ExampleArtworkInstance';
import ExampleGalleryInstance from './components/pages/GalleryInstances/ExampleGalleryInstance';

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

          <Route path="/artists/ExampleArtistInstance" element={<ExampleArtistInstance />} />
          <Route path="/artists/VincentvanGogh" element={<VincentvanGogh />} />
          <Route path="/artists/MaryCassat" element={<MaryCassat />} />
          <Route path="/artists/GrantWood" element={<GrantWood />} />

          <Route path="/artworks/ExampleArtworkInstance" element={<ExampleArtworkInstance />} />
          <Route path="/galleries/ExampleGalleryInstance" element={<ExampleGalleryInstance />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
