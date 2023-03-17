// React imports
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// Library imports
import axios from 'axios';
import Button from 'react-bootstrap/Button';
// Local imports
import { ARTISTS_NUM_IDS } from './ArtistsDynamic';
import './Artworks.css';


const ArtistInstance = () => {
  const artistId = useParams().artistId;
  const [artworkData, setArtworkData] = useState({});
  const [artistInfo, setArtistInfo] = useState({});
  const [galleryInfo, setGalleryInfo] = useState({});

  // Run only once due to second arg
  useEffect(() => {
    console.log("page loaded")
    axios.get(`https://galleryguide.me/api/artists/${ artistId }`)
    .then(response => {
      const artistInfo = response.data;
      console.log("artist data: ", artistInfo);
      setArtistInfo(artistInfo);
    })
    .catch((error) => {
      console.log("axios error: ", error);
    })

    // Get gallery and artwork information
    if (artistInfo) {
      axios.get(`https://galleryguide.me/api/artists/${ artistInfo.gallery_id }`)
      .then(response => {
        setGalleryInfo(response.data);
        console.log("gallery data: ", galleryInfo);
      })
      .catch((error) => {
        console.log("axios error while getting gallery info: ", error);
      })
      axios.get(`https://galleryguide.me/api/artworks/${ artworkData.artwork_id }`)
      .then(response => {
        setArtworkData(response.data);
        console.log("artwork data: ", artworkData);
      })
      .catch((error) => {
        console.log("axios error while getting artwork info: ", error);
      })
    }
  }, [])

  // Check that we got a valid ID request
  if (artistId < 1 || artistId > ARTISTS_NUM_IDS) {
    return (
      <div>
        <h1>Oops...!</h1>
        {/* Tara's note: &#41; is the html code for a closing parenthesis, ) */}
        <p>How did you get here? We don't have an artist with identification #{ artistId }. Let us know if you think this is our error. :&#41;</p>
      </div>
    );
  }
 
  // Tara's note: there's a lot more potential data we can add in Phase 3 to make this look prettier!
  //needs to be changed to be relevant to artists
  return (
    <div>
      <div class="art-instance-image-description-wrapper">
        <img class="art-instance-img" src={ artworkData.image } alt="Artwork visual representation"/>
        <div class="art-instance-description">
          <h1>{ artworkData.title }</h1>
          <h3>{ artistInfo.name }, { artworkData.date }</h3>
          <em>{ artworkData.medium }</em>
          <br/>
          <br/>
          <p>{galleryInfo ? `Artwork hosted at ${galleryInfo.name} in ${galleryInfo.region}` : null}</p>
          <p>{ artworkData.image_rights }</p>
        </div>
      </div>

      {/* TODO #? Add connections to other instances */}

      <Link to={'/artists'}>
        <Button>&#60;</Button> Back to main artworks page
      </Link>
    </div>
  )
};

export default ArtistInstance;
