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
import ArtworkInstance from './components/pages/ArtworkInstance';

import Artists from './components/pages/Artists';
import Galleries from './components/pages/Galleries';

import ExampleArtistInstance from './components/pages/ArtistInstances/ExampleArtistInstance';
import VincentvanGogh from './components/pages/ArtistInstances/VincentvanGogh';
import MaryCassatt from './components/pages/ArtistInstances/MaryCassatt';
import GrantWood from './components/pages/ArtistInstances/GrantWood';

import ExampleGalleryInstance from './components/pages/GalleryInstances/ExampleGalleryInstance';
import METMuseum from './components/pages/GalleryInstances/METMuseum';
import ArtInstituteofChicago from './components/pages/GalleryInstances/ArtInstituteofChicago';
import NationalGalleryofArt from './components/pages/GalleryInstances/NationalGalleryofArt';

function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        {/* placement for the global navbar below (items to show up on every page) */}
        <Navigation />
        {/* placement for all of the internal pages below */}
        <Routes>
          <Route path="/" element={ <Home/> }/>
          <Route path="/about" element={ <About/> }/>
          <Route path="/artworks" element={ <Artworks/> }/>
          <Route path="/artworks/:artworkId" element={ <ArtworkInstance/> }/>
          <Route path="/artists" element={<Artists />} />
          <Route path="/galleries" element={<Galleries />} />

          <Route path="/artists/ExampleArtistInstance" element={<ExampleArtistInstance />} />
          <Route path="/artists/VincentvanGogh" element={<VincentvanGogh />} />
          <Route path="/artists/MaryCassatt" element={<MaryCassatt />} />
          <Route path="/artists/GrantWood" element={<GrantWood />} />

          <Route path="/galleries/ExampleGalleryInstance" element={<ExampleGalleryInstance />} />
          <Route path="/galleries/METMuseum" element={<METMuseum />} />
          <Route path="/galleries/NationalGalleryofArt" element={<NationalGalleryofArt />} />
          <Route path="/galleries/ArtInstituteofChicago" element={<ArtInstituteofChicago />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
