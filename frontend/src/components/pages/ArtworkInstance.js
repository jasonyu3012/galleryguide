// React imports
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// Library imports
import axios from 'axios';
import Button from 'react-bootstrap/Button';
// Local imports
import { ARTWORKS_NUM_IDS } from './Artworks';
import './Artworks.css';


const ArtworkInstance = () => {
  const artworkId = useParams().artworkId;
  const [artworkData, setArtworkData] = useState({});
  const [artistInfo, setArtistInfo] = useState({});
  const [galleryInfo, setGalleryInfo] = useState({});

  // Run only once due to second arg
  useEffect(() => {
    console.log("page loaded")
    axios.get(`https://galleryguide.me/api/artworks/${ artworkId }`)
    .then(response => {
      const artworkData = response.data;
      console.log("artwork data: ", artworkData);
      setArtworkData(artworkData);
    })
    .catch((error) => {
      console.log("axios error: ", error);
    })

    // Get gallery and artist information
    if (artworkData) {
      axios.get(`https://galleryguide.me/api/galleries/${ artworkData.gallery_id }`)
      .then(response => {
        setGalleryInfo(response.data);
        console.log("gallery data: ", galleryInfo);
      })
      .catch((error) => {
        console.log("axios error while getting gallery info: ", error);
      })
      axios.get(`https://galleryguide.me/api/artists/${ artworkData.artist_id }`)
      .then(response => {
        setArtistInfo(response.data);
        console.log("artist data: ", artistInfo);
      })
      .catch((error) => {
        console.log("axios error while getting artist info: ", error);
      })
    }
  }, [])

  // Check that we got a valid ID request
  if (artworkId < 1 || artworkId > ARTWORKS_NUM_IDS) {
    return (
      <div>
        <h1>Oops...!</h1>
        {/* Tara's note: &#41; is the html code for a closing parenthesis, ) */}
        <p>How did you get here? We don't have an artwork with identification #{ artworkId }. Let us know if you think this is our error. :&#41;</p>
      </div>
    );
  }
 
  // Tara's note: there's a lot more potential data we can add in Phase 3 to make this look prettier!
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

      <Link to={'/artworks'}>
        <Button>&#60;</Button> Back to main artworks page
      </Link>
    </div>
  )
};

export default ArtworkInstance;
