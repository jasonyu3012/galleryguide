// React imports
import React, { useRef, useState, useEffect } from "react";
// Library imports
import axios from "axios";
import * as d3 from 'd3';
import ArtworkPieChart from "../siteVisualizations/ArtworkPieChart";
// Jerry, I commented out the line below as the file no longer exists or was not added to git to track.
// Please check with Kaveri that we can reuse visualizations across the provider and site visualizations. -Tara
// import { ThumbnailZoom } from "../OcclusionVisualization";


const SiteVisualizations = () => {
  const [galleryData, setGalleryData] = useState(undefined);

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
  }, [])

  return (typeof galleryData !== 'undefined') ? (
    <div>
      <h1>Site Visualizations</h1>
      <div>
        <h2>Artwork Distribution by Gallery</h2>
        <ArtworkPieChart data={galleryData}/>
      </div>
    </div>
  ) : <></>;
}

export default SiteVisualizations;