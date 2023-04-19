// React imports
import React, { useRef, useState, useEffect } from "react";
// Library imports
import axios from "axios";
import * as d3 from 'd3';
import ArtworkPieChart from "../siteVisualizations/ArtworkPieChart";
import ArtworkHistogram from "../siteVisualizations/ArtworkHistogram";
import ArtistDotPlot from "../siteVisualizations/ArtistDotPlot";
// Jerry, I commented out the line below as the file no longer exists or was not added to git to track.
// Please check with Kaveri that we can reuse visualizations across the provider and site visualizations. -Tara
// import { ThumbnailZoom } from "../OcclusionVisualization";


const SiteVisualizations = () => {
  const [galleryData, setGalleryData] = useState(undefined);
  const [artworkData, setArtworkData] = useState(undefined);
  const [artistData, setArtistData] = useState(undefined);

  useEffect (() => {
    // Get gallery data
    axios.get('https://galleryguide.me/api/galleries')
    .then(response => {
      console.log(response.data.galleries)
      setGalleryData(response.data.galleries)
    })
    .catch((error) => {
      console.log("axios error while getting gallery info: ", error);
    })
  
    // Get artist data
    axios.get('https://galleryguide.me/api/artists')
    .then(response => {
      console.log(response.data.artists)
      setArtistData(response.data.artists)
    })
    .catch((error) => {
      console.log("axios error while getting artist info: ", error);
    })


    // Get artwork data
    axios.get('https://galleryguide.me/api/artworks')
    .then(response => {
      console.log(response.data.artworks)
      setArtworkData(response.data.artworks)
    })
    .catch((error) => {
      console.log("axios error while getting artwork info: ", error);
    })
  }, [])

  return (typeof galleryData !== 'undefined' && typeof artworkData !== 'undefined' && typeof artistData !== 'undefined') ? (
    <div>
      <h1>Site Visualizations</h1>
      <div>
        <h2>Artwork Distribution by Gallery</h2>
        <ArtworkPieChart data={galleryData}/>
      </div>
      <div>
        <h3>Artwork Distribution by Gallery</h3>
        <ArtworkHistogram data={artworkData}/>
      </div>
      <div>
        <h4>Artwork Distribution by Gallery</h4>
        <ArtistDotPlot data={artistData}/>
      </div>
    </div>
  ) : <></>;
}

export default SiteVisualizations;