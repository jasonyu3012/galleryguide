import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes, 
  Redirect
} from 'react-router-dom';
// Local imports
import './App.css';

// Import pages
import About from './components/pages/About';
import Home from './components/pages/Home';
import Navigation from './components/Navigation';

import Artworks from './components/pages/Artworks';
import ArtworkInstance from './components/pages/ArtworkInstance';

import Artists from './components/pages/Artists';
import ArtistInstance from './components/pages/ArtistInstance';

import Galleries from './components/pages/Galleries';
import GalleryInstance from './components/pages/GalleryInstance';

import NotFoundPage from './components/pages/NotFoundPage';

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

          <Route path="/artists" element={ <Artists/> }/>
          <Route path="/artists/:artistId" element={ <ArtistInstance/> }/>

          <Route path="/galleries" element={ <Galleries/>} />
          <Route path="/galleries/:galleryId" element={ <GalleryInstance/> }/>
        </Routes>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
